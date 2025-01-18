import jwt ,{JwtPayload} from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
const JWT_Secret=process.env.JWT_Secret || 'random';

declare global{
    namespace Express{
        interface Request{
            userId?: string
        }
    }
}

export function userMiddleware(req : Request,res : Response,next : NextFunction){
    try {
        const authHeader = req.headers.authorization as string;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
              .status(401)
              .json({ message: "Authorization header is missing or invalid." });
        }
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,JWT_Secret) as JwtPayload;
        if(decoded){
            req.userId=decoded.id;
            next();
        }
        else{
            res.json(403).json({message : 'Invalid Token.'})
        }
    } catch (error : any) {
        res.status(403).json({ message: "Invalid Token." });
    }
}