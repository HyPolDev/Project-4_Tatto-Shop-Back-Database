import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { TokenData } from "../types/index.types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token needed"
        })
    }

    try {

        //if verify true => asign decoded else => error
        const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`)

        req.tokenData = decodedToken as TokenData

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not valid token"
        })
    }
}