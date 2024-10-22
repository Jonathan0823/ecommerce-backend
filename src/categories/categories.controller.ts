import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {}

    @Get()
    async getCategories() {
        return await this.categoryService.getCategories();
    }

    @UseGuards(AdminGuard)
    @Post("create")
    async createCategory(@Body() CreateCategoryDto) {
        return await this.categoryService.createCategory(CreateCategoryDto);
    }

    @UseGuards(AdminGuard)
    @Delete("delete")
    async deleteCategory(@Body("id") id: string) {
        return await this.categoryService.deleteCategory(id);
    }
}
