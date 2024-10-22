import {IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsString()
    categoryName: string;

    @IsString()
    brand: string;
    
    @IsNumber()
    stock: number;

    @IsNumber()
    price: number;

    @IsString()
    description: string;
}

export class UpdateProductDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    image: string;

    @IsString()
    categoryName: string;

    @IsString()
    brand: string;

    @IsNumber()
    stock: number;

    @IsNumber()
    price: number;

    @IsString()
    description: string;
}