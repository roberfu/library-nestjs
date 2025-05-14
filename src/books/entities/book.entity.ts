import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    title: string;

    @Column('text')
    genre: string;

}
