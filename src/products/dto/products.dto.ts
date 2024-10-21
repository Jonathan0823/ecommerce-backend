import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    image: string[];

    @IsString()
    thumbnail: string;

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