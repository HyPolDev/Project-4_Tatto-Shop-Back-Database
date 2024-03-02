import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";


@Entity('services')
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'service_name' })
    serviceName!: string

    @Column({ name: 'description' })
    description!: string

    //Service > Appointments
    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments!: Appointment[];

}