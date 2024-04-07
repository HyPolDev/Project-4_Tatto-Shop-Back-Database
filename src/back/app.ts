import express, { Application } from "express"
import 'dotenv/config'
import cors from 'cors'
import { createRoles, deleteRolesById, getRoles, updateRolesById } from "./controllers/roleController"
import { login, register } from "./controllers/authController"
import { deleteUserById, getUserByEmail, getUserById, getUsers, updateUserById, updateUserRole } from "./controllers/userController"
import { auth } from "./middleware/auth"
import { isAdmin } from "./middleware/isAdmin"
import { isSelfOrAdmin } from "./middleware/isSelfOrAdmin"
import { deleteServiceId, getServices, postServices, putServiceId } from "./controllers/serviceController"
import { deleteAppointmentId, getAppointmentId, getAppointments, postAppointments, putAppointmentId } from "./controllers/appointmentController"

export const app: Application = express()

app.use(express.json())
app.use(cors())

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
app.delete("/roles/:id", auth, isAdmin, deleteRolesById)

// USER
app.get("/api/users", auth, isAdmin, getUsers)  //get all users
app.get("/api/users/:id", auth, isSelfOrAdmin, getUserById) //get user by id
app.get("/api/users/:email", auth, isAdmin, getUserByEmail)//get by email lh:4000/api/users?email=a@a.a
app.put("/api/users/:id", auth, isSelfOrAdmin, updateUserById) //update user
app.delete("/api/users/:id", auth, isSelfOrAdmin, deleteUserById)
app.put("/api/users/:id/:role", auth, isAdmin, updateUserRole)

//Services
app.post("/api/services", auth, isAdmin, postServices)
app.get("/api/services", getServices)
app.put("/api/services/:id", auth, isAdmin, putServiceId)
app.delete("/api/services/:id", auth, isAdmin, deleteServiceId)

//Appointments
app.post("/api/appointments", auth, postAppointments)
app.get("/api/appointments", auth, getAppointments) //
app.get("/api/appointments/:id", auth, getAppointmentId)
app.put("/api/appointments/:id", auth, putAppointmentId)
app.delete("/api/appointments/:id", auth, deleteAppointmentId) 
