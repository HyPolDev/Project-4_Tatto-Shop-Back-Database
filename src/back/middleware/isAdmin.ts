import { NextFunction, Request, Response } from "express"

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.tokenData.roleName == "user") {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        console.log(req.tokenData.roleName)

        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not valid"
        })
    }
}