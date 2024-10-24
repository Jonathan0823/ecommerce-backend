import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
    constructor(private prismaService: PrismaService) {}

    async getCategories() {
        try {
            return await this.prismaService.category.findMany();
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'This is a custom error message',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async createCategory(dto: CreateCategoryDto) {
        try {
            return await this.prismaService.category.create({
                data: {
                    ...dto,
                },
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to fetch categories',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCategory(id: string){
        try{
            return await this.prismaService.category.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to delete category',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCategory(dto: UpdateCategoryDto){
        try{
            return await this.prismaService.category.update({
                where: {
                    id: dto.id,
                },
                data: {
                    name: dto.name,
                },
            });
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to update category',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
