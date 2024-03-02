
import { Role } from "../../back/models/Role";
import { User } from "../../back/models/User";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";

let num_users = 20;

// generar usuarios falsos(con Faker)
const generateFakeUsers = () => {
    const user = new User();
    user.name = faker.person.firstName();
    user.email = faker.internet.email();
    user.password = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456

    return user;
}



const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        const superadmin = new User();
        superadmin.name = "Super";
        superadmin.email = "super@super.com";
        superadmin.password = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456
        superadmin.role = new Role();
        superadmin.role.id = 3;
        superadmin.save();

        const admin = new User();
        admin.name = "Admin";
        admin.email = "admin@admin.com";
        admin.password = "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO"; // 123456
        admin.role = new Role();
        admin.role.id = 2;
        admin.save();

        // fake users (with role_id = 1 by default)
        const fakeUsers = Array.from({ length: num_users - 2 }, generateFakeUsers);
        await User.save(fakeUsers);

        console.log("Saved Seeded Users");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

userSeedDatabase()
