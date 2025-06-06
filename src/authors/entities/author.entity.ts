import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    yearOfBirth: number;

    @Column()
    nationality: string;
}
