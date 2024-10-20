import { Type } from "class-transformer";
import { IsEmail, IsOptional, isString, IsString, ValidateNested } from "class-validator";

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
    image: string;

    @IsString()
    @IsOptional()
    password: string;

    @ValidateNested()
    @Type(() => UpdateAddressDto)
    @IsOptional()
    address?: UpdateAddressDto;
}

export class UpdateAddressDto {
    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
    lastname?: string;

    @IsEmail()
    @IsOptional()
    emailadd?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    street?: string;

    @IsString()
    @IsOptional()
    zipCode?: string;
}