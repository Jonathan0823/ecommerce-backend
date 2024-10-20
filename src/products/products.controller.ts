import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @Post("create")
    async createProduct(@Body() CreateProductDto) {
        return await this.productsService.createProduct(CreateProductDto);
    }
}
