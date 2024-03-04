import { NextFunction, Request, Response, query } from "express"

export const isSelfOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.tokenData.roleName !== "admin"
            && req.tokenData.userId !== parseInt(req.params.id)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Role not valid"
        })
    }
}