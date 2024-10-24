import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name: string;
}

export class UpdateCategoryDto {
    @IsString()
    id: string;
    
    @IsString()
    name: string;
}