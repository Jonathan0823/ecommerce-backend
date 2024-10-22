import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BannersService } from './banners.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('banners')
export class BannersController {
    constructor(private bannerService: BannersService) {}

    @Get()
    async getBanners() {
        return await this.bannerService.getBanners();
    }

    @Post('create')
    async createBanner(@Body() CreateBannerDto) {
        return await this.bannerService.createBanner(CreateBannerDto);
    }

    @UseGuards(AdminGuard)
    @Patch('edit/:id')
    async editBanner(@Param("id") id:string, @Body() EditBannerDto) {
        const idInt = parseInt(id); 
        return await this.bannerService.editBanner(idInt, EditBannerDto);
    }
}
