import { Request, Response } from "express"
import { User } from "../models/User"

export const getUsers = async (req: Request, res: Response) => {
    try {

        const limit = Number(req.query.limit) || 10

        const users = await User.find(
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
                take: limit as number
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
            message: "user couldn't be retrieved",
            error: error
        })

    }
}

export const getUserByEmail = async (req: Request, res: Response) => {
    try {
        const userEmail = req.query.email as string
        if (!userEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
                userEmail: userEmail
            });
        }

        const user = await User.find({
            where: {
                email: userEmail
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrieved successfuly",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User couldn't be retrieved",
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
            message: "user couldnt be retrieved",
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

export const updateUserRole = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const roleId = req.params.role;

        // validar datos
        const user = await User.findOneBy({
            id: parseInt(userId)
        })
        // const role = await User.findOne({
        //     where: {
        //         role: { id: parseInt(roleId) }
        //     }
        // })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // actualizar DB
        const updatedUserRole = await User.update(
            {
                id: parseInt(userId)
            },
            {
                role: { id: parseInt(roleId) }
                // role: { name: roleId}
            }
        )

        res.status(200).json({
            success: true,
            message: "User's Role updated successfuly",
            data: updatedUserRole
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User's role couldn't be updated",
            error: error
        })
    }
}