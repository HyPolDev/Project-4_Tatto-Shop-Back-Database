
import { Role } from "../../back/models/Role";
import { AppDataSource } from "../db";


// Roles hardcodeados, solo hay 3 tipos. 
//En el modelo, user_id es por defecto "1" (user)

const roleSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const roleUser = new Role();
        roleUser.name = "user"
        await roleUser.save();

        const roleAdmin = new Role();
        roleAdmin.name = "admin"
        await roleAdmin.save();

        const roleSuper = new Role();
        roleSuper.name = "superadmin"
        await roleSuper.save();

        console.log("Saved Seeded Roles");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

roleSeedDatabase()
