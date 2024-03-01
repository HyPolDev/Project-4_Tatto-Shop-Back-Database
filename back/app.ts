import express, { Application } from "express"
import 'dotenv/config'
import { createRoles, deleteRolesById, getRoles, updateRolesById } from "./controllers/roleController"
import { login, register } from "./controllers/authController"
import { deleteUserById, getUserById, getUsers, updateUserById } from "./controllers/userController"
import { auth } from "./middleware/auth"
import { isAdmin } from "./middleware/isAdmin"
import { isSelfOrAdmin } from "./middleware/isSelfOrAdmin"

export const app: Application = express()

//lo de abajo lo que hace es parsearlo y pasarlo a objeto
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get("/healthy", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
    })
})

app.get("/roles", getRoles)
app.post("/roles", createRoles)
app.put("/roles/:id", updateRolesById)
app.delete("/roles/:id", deleteRolesById)

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

app.get("/api/users", auth, isAdmin, getUsers)
app.get("/api/users/:id", isSelfOrAdmin, getUserById)
app.put("/api/users/:id", isSelfOrAdmin, updateUserById)
app.delete("/api/users/:id", isSelfOrAdmin, deleteUserById)