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

app.post("/api/auth/register", register)
app.post("/api/auth/login", login)

// will get commented after seeder is added
app.get("/roles", auth, isAdmin, getRoles)
app.post("/roles", auth, isAdmin, createRoles)
app.put("/roles/:id", auth, isAdmin, updateRolesById)
app.delete("/roles/:id", deleteRolesById)


app.get("/api/users", auth, isAdmin, getUsers)
app.get("/api/users/:id", auth, isSelfOrAdmin, getUserById)
app.put("/api/users/:id", auth, isSelfOrAdmin, updateUserById)
app.delete("/api/users/:id", auth, isSelfOrAdmin, deleteUserById)