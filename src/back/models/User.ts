import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Appointment } from "./Appointment"

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "name" })
    name!: string

    @Column({ name: "password", select: false })
    password!: string

    @Column({ name: "email" })
    email!: string

    @Column({ name: "created_at" })
    createdAt!: Date

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments!: Appointment[];
}
