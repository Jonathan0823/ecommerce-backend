import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/categories.dto';

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
}
