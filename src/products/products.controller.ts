import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @UseGuards(AdminGuard)
    @Post("create")
    async createProduct(@Body() CreateProductDto) {
        return await this.productsService.createProduct(CreateProductDto);
    }
}
