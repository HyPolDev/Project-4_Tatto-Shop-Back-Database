import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "name" })
    name!: string

    @Column({ name: "password" })
    password!: string

    @Column({ name: "email" })
    email!: string

    @Column({ name: "created_at" })
    createdAt!: Date

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;
}
