import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateBookDto {

    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    genre: string;
}
