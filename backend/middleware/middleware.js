import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");
        if(!token) return res.status(403).json({message: "Forbidden user."});

        const decodedInfo = jwt.verify(token, JWT_SECRET);
        if(!decodedInfo) return res.status(403).json({message: "Forbidden user."});
        console.log("decoded",decodedInfo);
        
        req.userId = decodedInfo?.id;
        next();
    } catch(error) {
        next(error);
    }
}