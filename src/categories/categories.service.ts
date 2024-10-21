import { Injectable } from '@nestjs/common';
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
            throw new Error(error);
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
            throw new Error(error);
        }
    }
}
