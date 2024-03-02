
import { Appointment } from "../../back/models/Appointment";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";


// Variables (double check number of users and services)
let num_users = 20;
let num_services = 5; // seed hardcodeada - cambiar a mano si se añaden más  servicios (para ajustar "generateFakeAppointments" en el seeder)
let num_appointments = 10;

// generar citas (hardcodeadas)
const generateFakeAppointments = () => {
    const appointment = new Appointment();
    appointment.appointmentDate = faker.date.future();

    let randomUser = Math.floor(Math.random() * num_users + 1)
    appointment.userId = randomUser.toString();

    let randomService = Math.floor(Math.random() * num_services + 1)
    appointment.serviceId = randomService.toString();

    return appointment;
}



const appointmentSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const fakeAppointments = Array.from({ length: num_appointments }, generateFakeAppointments);
        await Appointment.save(fakeAppointments);

        console.log("Saved Faked Appointments");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

appointmentSeedDatabase();
