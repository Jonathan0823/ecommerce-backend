import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaservice: PrismaService) {}

  async getSingleProduct(id: string) {
    return await this.prismaservice.product.findUnique({
      where: {
        id: id,
      },
    });
  }
  
  async getTotalProductsCount() {
    return this.prismaservice.product.count();
  }

  async getProducts(limit: number, page: number) {
    const take = limit || 10; 
    const skip = page ? (page - 1) * take : 0; 
    return this.prismaservice.product.findMany({
      take,
      skip,
    });
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

  async getProductsByCategories(categories: string[]) {
    return await this.prismaservice.product.findMany({
      where: {
        categoryName: {
          in: categories,
        },
      },
    });
  }

  async searchProducts(key: string) {
    return this.prismaservice.product.findMany({
      where: {
        OR: [
          { name: { contains: key, mode: 'insensitive' } },
          { brand: { contains: key, mode: 'insensitive' } },
        ],
      },
    });
  }
}
