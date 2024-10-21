import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [CategoriesService, PrismaService, JwtService],
    controllers: [CategoriesController]
  })
export class CategoriesModule {}
