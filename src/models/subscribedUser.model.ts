import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SubscribedUser {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('text')
    email: string
}