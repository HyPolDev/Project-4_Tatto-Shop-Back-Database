import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";
import { User } from "./User";

@Entity('appointments')
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'appointment_date' })
    appointmentDate!: Date

    @Column({ name: 'user_id' })
    userId!: string

    @Column({ name: 'service_id' })
    serviceId!: string

    //User < Appointments
    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    //Service < Appointments
    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({ name: 'service_id' })
    service!: Service;
}