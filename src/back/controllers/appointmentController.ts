import { Request, Response } from "express"
import { Appointment } from "../models/Appointment"

export const postAppointments = async (req: Request, res: Response) => {
    try {
        const { appointment_date, user_id, service_id } = req.body

        const newAppointment = await Appointment.create({
            appointmentDate: appointment_date,
            userId: user_id,
            serviceId: service_id
        }).save()

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newAppointment
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment couldn't be created",
            error: error
        })
    }
}

export const getAppointments = async (req: Request, res: Response) => {
    try {

        const limit = Number(req.query.limit) || 3
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit

        const appointment = await Appointment.find({

            select: {
                id: true,
                appointmentDate: true,
                userId: true,
                serviceId: true
            },
            take: limit as number,
            skip: skip
        });

        res.status(200).json({
            success: true,
            message: "Appointments retrieved successfuly",
            data: appointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointments couldn't be retrieved",
            error: error
        })
    }
}
export const getAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id

        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Appointment retrieved successfuly",
            data: appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment couldn't be retrieved",
            error: error
        })
    }
}
export const putAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;
        const { appointment_date, user_id, service_id } = req.body;

        // validar datos
        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        const updatedAppointment = await Appointment.update(
            {
                id: parseInt(appointmentId)
            },
            {
                appointmentDate: appointment_date,
                userId: user_id,
                serviceId: service_id
            }
        )

        res.status(200).json({
            success: true,
            message: "Appointment updated successfuly",
            data: updatedAppointment
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment couldn't be updated",
            error: error
        })
    }
}
export const deleteAppointmentId = async (req: Request, res: Response) => {
    try {
        const appointmentId = req.params.id;

        // validar datos
        const appointment = await Appointment.findOneBy({
            id: parseInt(appointmentId)
        })

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }

        // actualizar DB
        await Appointment.remove(appointment)
        res.status(200).json({
            success: true,
            message: "Appointment deleted successfuly"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Appointment couldn't be deleted",
            error: error
        })
    }
}