import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @Get('category')
    async getProductsByCategories(@Query('categories') categories: string) {
      const categoryList = categories.split(',');
      return await this.productsService.getProductsByCategories(categoryList);
    }

    @UseGuards(AdminGuard)
    @Post("create")
    async createProduct(@Body() CreateProductDto) {
        return await this.productsService.createProduct(CreateProductDto);
    }

    @UseGuards(AdminGuard)
    @Delete("delete")
    async deleteProduct(@Body("id") id: string) {
        return await this.productsService.deleteProduct(id);
    }

    @UseGuards(AdminGuard)
    @Patch("update")
    async updateProduct(@Body() UpdateProductDto) {
        return await this.productsService.updateProduct(UpdateProductDto);
    }
}
