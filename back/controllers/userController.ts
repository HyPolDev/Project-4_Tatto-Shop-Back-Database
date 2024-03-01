import { Request, Response } from "express"
import { User } from "../models/User"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find(
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                }
            }
        )

        res.status(200).json({
            succes: true,
            message: "user can be retrieved",
            data: users
        })
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: "users cant be retrieved"
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id

        const user = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "user not found",
            })
        }

        res.status(200).json({
            succes: true,
            message: "user retrieved",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "user could be retrieved",
            error: error
        })

    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id
        const name = req.body.name

        const user = await User.findOne({
            where: {
                id: parseInt(userId)
            }
        })

        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "user not found",
            })
        }

        const userUpdated = await User.update({
            id: parseInt(userId)
        }, {
            name: name
        }
        )

        res.status(200).json({
            succes: true,
            message: "user updated correctly",
            data: user
        })
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: "user could be retrieved",
            error: error
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id

        const userToRemove = await User.findOneBy({
            id: parseInt(userId)
        })

        if (!userToRemove) {
            return res.status(404).json({
                succes: false,
                message: "user not found",
            })
        }

        const userDeleted = await User.remove(userToRemove)

        res.status(200).json({
            succes: true,
            message: "user removed succesfuly",
            data: userDeleted
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "user could be retrieved",
            error: error
        })
    }
}