import { IsEmail, IsOptional, isString, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}