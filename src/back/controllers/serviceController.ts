import { Request, Response } from "express"
import { Service } from "../models/Service";
import { User } from "../models/User";

export const postServices = async (req: Request, res: Response) => {
    try {
        const { service_name, description } = req.body

        const newService = await Service.create({
            serviceName: service_name,
            description: description
        }).save()

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Service cannot be created",
            error: error
        })
    }
}

export const getServices = async (req: Request, res: Response) => {
    try {

        const services = await Service.find({
            select: {
                id: true,
                serviceName: true,
                description: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Services retrieved successfuly",
            data: services
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Services cannot be retrieved",
            error: error
        })
    }
}

export const putServiceId = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;
        const { service_name, description } = req.body;

        // validar datos
        const service = await User.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        const updatedService = await Service.update(
            {
                id: parseInt(serviceId)
            },
            {
                serviceName: service_name,
                description: description
            }
        )

        res.status(200).json({
            success: true,
            message: "Service updated successfuly",
            data: updatedService
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Service cannot be updated",
            error: error
        })

    }

}
export const deleteServiceId = async (req: Request, res: Response) => {
    try {
        const serviceId = req.params.id;

        // validar datos
        const service = await Service.findOneBy({
            id: parseInt(serviceId)
        })

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            })
        }

        // actualizar DB
        await Service.remove(service)
        res.status(200).json({
            success: true,
            message: "Service deleted successfuly"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Service cannot be deleted",
            error: error
        })
    }
}