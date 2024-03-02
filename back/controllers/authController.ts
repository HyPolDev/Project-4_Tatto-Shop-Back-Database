import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { User } from "../models/User";

export const register = async (req: Request, res: Response) => {

    try {
        const email = req.body.email;
        const password = req.body.password
        const name = req.body.name

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Format email invalid"
                }
            )
        }

        if (password.length < 3 || password.length > 20) {
            return res.status(400).json({
                succes: false,
                message: "Password between 3 and 20 characters"
            })
        }

        const passwordEncrypted = bcrypt.hashSync(password, 8)


        const newUser = await User.create({
            name: name,
            email: email,
            password: passwordEncrypted,
            role: { id: 1 }
        }).save()

        return res.status(201).json({
            succes: true,
            message: "User created succesfully"
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "User couldn't be registered",
            error: error
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            res.status(400).json({
                succes: false,
                message: "Credentials needed"
            })
        }

        const user: any = await User.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                id: true,
                password: true,
                role: {
                    id: true,
                    name: true
                }
            }
        })

        if (!user) {
            res.status(500).json({
                succes: false,
                message: "User not found",
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                succes: false,
                message: "User could not be loged in",

            })
        }

        //create token
        const token = jwt.sign({
            userId: user.id,
            roleName: user.role.name
        },
            `${process.env.JWT_SECRET}`,
            {
                expiresIn: "24h"
            }
        )

        res.status(200).json({
            succes: true,
            message: "User logged",
            data: user,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "User couldn't be logged in",
            error: error
        })
    }
}