import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
    constructor(private prismaservice: PrismaService) {}

    async getProducts() {
        return await this.prismaservice.product.findMany();
    }

    async createProduct(dto: CreateProductDto) {
        try {
            return await this.prismaservice.product.create({
                data: {
                    ...dto,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id: string) {
        return await this.prismaservice.product.delete({
            where: {
                id: id,
            },
        });
    }

    async updateProduct(dto: UpdateProductDto) {
        return await this.prismaservice.product.update({
            where: {
                id: dto.id,
            },
            data: {
                ...dto,
            },
        });
    }
}
