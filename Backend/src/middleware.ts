import jwt ,{JwtPayload} from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { JWT_Secret } from "./config";

declare global{
    namespace Express{
        interface Request{
            userId?: string
        }
    }
}

export function userMiddleware(req : Request,res : Response,next : NextFunction){
    try {
        const authHeader :any | string = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
              .status(401)
              .json({ message: "Authorization header is missing or invalid." });
        }
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,JWT_Secret) as JwtPayload;
        req.userId=decoded.id;
        next();
    } catch (error : any) {
        res.status(401).json({ message: "Invalid Credentials." });
    }
}

