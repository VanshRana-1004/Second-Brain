import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import z,{any} from "zod";
import {userModel,contentModel,tagsModel,linkModel} from "./db";

import { userMiddleware } from "./middleware";
import bcrypt from "bcrypt";
import cors from "cors";

import { random } from "./util";
import { Request, Response } from 'express';

const JWT_Secret=process.env.JWT_Secret || 'random';
const mongodbUrl=process.env.mongodbUrl || 'random';
const PORT = process.env.PORT;

const app=express();
app.use(express.json());
app.use(cors());


const requireInput=z.object({
    username:z.string().min(1),
    password:z.string().min(1)
})
app.post('/api/v1/signup',async (req : Request,res : Response)=>{   
    const parseData=requireInput.safeParse(req.body);
    if(parseData.success){
        const username=parseData.data.username;
        const password=parseData.data.password;
        const hashedPassword=await bcrypt.hash(password,5);
        try{
            await userModel.create({
                username:username,
                password:hashedPassword
            })
            res.status(200).json({
                "message":"user created successfully"
            })
        }catch(e){
            res.status(411).json({
                message:"fail",
                error:'username already taken.'
            })
        } 
    }
    else{
        res.status(401).json({
            "message":"Incorrect Format",
            "error":parseData.error
        })
    }
})

app.post('/api/v1/login',async (req : Request,res : Response)=>{
    const parseData=requireInput.safeParse(req.body);
    if(parseData.success){
        const username=parseData.data.username;
        const password=parseData.data.password;
        const response : any=await userModel.findOne({
            username:username
        })
        if(response){
            const isPasswordMatch=await bcrypt.compare(password,response.password);
            if(isPasswordMatch){
                const token=jwt.sign({
                    id:response._id
                },JWT_Secret);
                req.headers["authorization"]=token;
                res.status(200).json({
                    message : 'User Signed In Successfully',
                    token:token

                })
            }
            else{
                res.status(403).json({
                    message:'Incorrect credentials'
                })
            }  
        } 
        else{
            res.status(411).json({
                message:'user not found'
            })
        }
    }
    else{
        res.status(401).json({
            "message":"Incorrect Format",
            "error":parseData.error
        })
    }
})

app.get('/api/v1/brain/',async (req : Request,res : Response)=>{
    const hash=req.query.hash;
    const type=req.query.type;
    try{
        const link=await linkModel.findOne({hash});
        if(!link){
            res.status(403).json({message:"Invalid Link"});
            return;
        }
            const enable=linkModel.findOne({ hash: hash })
            if(!enable){
                res.status(403).json({
                    message :' Link is Disabled'
                })
            }
        const allContent=await contentModel.find({userId : link.userId}).populate("userId","username");
        if(type==='home'){
            res.status(200).json({
                content : allContent
            })
            return
        }
        else{
            const tagType=await tagsModel.findOne({tag:type});
            let filteredContent : {}[]= [];
            if (tagType) {
                filteredContent = allContent.filter(content =>
                    tagType.contentId.some(contentId => contentId.toString() === content._id.toString())
                );
            }
            res.status(200).json({
                content:filteredContent
            })
            return
        }
    }catch(e){
        res.status(500).json({ message: "Server Error" });
    }
})

const requireInputFields=z.object({
    link:z.string().min(1),
    title:z.string().min(1),
    description:z.string().min(1),
    tags:z.array(z.string()).optional(),
    date:z.string().min(1)
})

app.use(userMiddleware);

app.get('/api/v1/brain/share',async(req : Request,res : Response)=>{
    if(!req.userId){
        res.status(400).json({ message: "User ID is missing" });
        return;
    }
    try{
        const userId=req.userId;
        const link=await linkModel.findOne({userId:userId});
        const enable = link ? link.enabled : false;
        res.status(200).json({
            enable:enable
        })
    }
    catch(e){
        res.status(500).json({ message: "Server Error" });
    }
})

app.post("/api/v1/brain/share",async(req : Request,res : Response)=>{
    const enable=req.body.enable;
    if(enable){
        const userId=req.userId;
        if(!req.userId){
            res.status(400).json({ message: "User ID is missing" });
            return;
        }
        try{
            const existingLink=await linkModel.findOne({userId});
            if(existingLink){
                await linkModel.updateOne(
                    { userId: userId }, // Query to find the document
                    { $set: { enabled: true } } // Update operation to set `enable` to false
                )
                res.status(200).json({hash:existingLink.hash});
                return;
            }
            const hash : any=random(userId);
            await linkModel.create({userId,hash,enabled:true});
            res.status(200).json({hash});
            return 
        }catch(e){
            res.status(500).json({ message: "Server Error" });
            return 
        }
    } 
    else{
        try{
            const userId=req.userId;
            await linkModel.deleteOne({ userId: userId });
            res.status(200).json({hash:"No link to share"});
            return 
        }
        catch(e){
            res.status(500).json({message:'Server Error'});
            return 
        }
    }
})

app.post('/api/v1/content',async (req : Request,res : Response)=>{
    const parseData=requireInputFields.safeParse(req.body);
    if(parseData.success){
        const link= req.body.link;
        const title= req.body.title;
        const description = req.body.description;
        const alltags=req.body.allTags;
        const tags=[];
        const userId=req.userId;
        for(let i=0;i<alltags.length;i++){
            if(alltags[i].length>0) tags.push(alltags[i]);
        }
        const date=req.body.date;
        await contentModel.create({
            title: title,
            description : description,
            link: link,
            tags:tags,
            userId: req.userId,
            date: date
        })
        const contentId : any=await contentModel.findOne({title:title}).select('_id');
        if(contentId){
            for(let i=0;i<tags.length;i++){
                const response=await tagsModel.findOne({
                    tag: tags[i]
                }) 
                if(response){
                    response.contentId.push(contentId);
                    await response.save();
                }
                else{
                    await tagsModel.create({
                        tag:tags[i],
                        contentId:[contentId]
                    })
                }
            }
            res.status(200).json({
                message:'Content created Successfully'
            })
        }
        else{
            res.status(403).json({
                message :'Failed to create content.'
            })
        }
    }
    else{
        res.status(403).json({
            message:'Required fields are missing'
        })
    }
    
})

app.get('/api/v1/content',async (req : Request,res : Response)=>{
    const userId=req.userId;
    const type=req.query.type;
    try{
        const allContent=await contentModel.find({userId:userId}).populate("userId","username");
        if(type==='home'){
            res.status(200).json({
                content:allContent
            })
        }
        else{
            const tagType=await tagsModel.findOne({tag:type});
            let filteredContent : {}[]= [];
            if (tagType) {
                filteredContent = allContent.filter(content =>
                    tagType.contentId.some(contentId => contentId.toString() === content._id.toString())
                );
            }
            res.status(200).json({
                content:filteredContent
            })
        }
    }
    catch(e){
        res.status(500).json({message:'Server Error'})
    }
    
})

app.delete('/api/v1/content',async (req : Request,res : Response)=>{
    const contentId=req.body.contentId;
    const userId=req.userId;
    try{
        const response : any=await contentModel.findOne({_id:contentId}).select('tags');
        const tags = response?.tags || [];
        await contentModel.deleteMany({
            _id:contentId,
            userId:userId
        })
        for(let i=0;i<tags.length;i++){
            const tag : any=await tagsModel.findOne({tag:tags[i]});
            if(tag){
                tag.contentId = tag.contentId.filter((id: mongoose.Types.ObjectId) => !id.equals(contentId));
                if (tag.contentId.length === 0) {
                    await tag.deleteOne();
                } else {
                    await tag.save();
                }
            }
        }
        res.status(200).json({
            message:"Content Deleted"
        })
    }catch(e){
        res.status(500).json({message:'Server Error'})
    }
})

async function main(){
    try{
        await mongoose.connect(mongodbUrl);
        console.log("connected");
    }
    catch(e){
        console.log("fail");
        console.log(e)
    }    
    app.listen(PORT);
}
    

main();
