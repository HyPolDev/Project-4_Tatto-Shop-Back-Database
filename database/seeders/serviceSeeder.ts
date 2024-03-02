
import { Service } from "../../back/models/Service";
import { AppDataSource } from "../db";


// generar servicios (hardcodeados - los 5 ejemplos del enunciado)
const serviceSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();

        // servicio 1 del enunciado
        const service1 = new Service();
        service1.serviceName = "Tatuajes personalizados"
        service1.description = "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos."
        await service1.save();

        // servicio 2 del enunciado
        const service2 = new Service();
        service2.serviceName = "Tatuajes del catálogo"
        service2.description = "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas."
        await service2.save();

        // servicio 3 del enunciado
        const service3 = new Service();
        service3.serviceName = "Restauración y rejuvenecimiento de trabajos"
        service3.description = "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad."
        await service3.save();

        // servicio 4 del enunciado
        const service4 = new Service();
        service4.serviceName = "Colocación de piercings y dilatadores"
        service4.description = "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
        await service4.save();

        // servicio 5 del enunciado
        const service5 = new Service();
        service5.serviceName = "Venta de piercings y otros artículos"
        service5.description = "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único."
        await service5.save();

        console.log("Saved Seeded Services");

    } catch (error) {
        console.log(error);

    } finally {
        if (AppDataSource) {
            await AppDataSource.destroy();
        }
    }
}

serviceSeedDatabase();
