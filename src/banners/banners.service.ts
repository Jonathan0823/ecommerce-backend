import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BannerDto } from './dto/banner.dto';

@Injectable()
export class BannersService {
    constructor(private prismaService: PrismaService) {}

    async getBanners() {
        return await this.prismaService.banner.findMany();
    }

    async createBanner(dto: BannerDto) {
        return await this.prismaService.banner.create({
            data: {
                ...dto,
            },
        });
    }

    async editBanner(id: number, dto: BannerDto) {
        return await this.prismaService.banner.update({
            where: {
                id: id,
            },
            data: {
                ...dto,
            },
        });
    }
}
