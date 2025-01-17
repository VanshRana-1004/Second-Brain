import mongoose from "mongoose";
import {Schema,model} from "mongoose";
import {ObjectId} from "mongoose";


const userSchema = new Schema({
    "username": { type: String, unique :true},
    "password": { type: String }
});
export const userModel = model('User',userSchema);

const contentSchema=new Schema({
    title: String,
    link: String,
    description : String,
    tags: [],
    date: String,
    userId:{type:mongoose.Types.ObjectId, ref: 'User', required:true}
})
export const contentModel=model('Content',contentSchema);

const tagsSchema=new Schema({
    tag : String,
    contentId:[{type: mongoose.Types.ObjectId,ref:'Content'}],
})
export const tagsModel=model('Tags',tagsSchema);

const linkSchema=new Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    enabled:{type:Boolean}
})
export const linkModel=model('Link',linkSchema);