import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProductsService, PrismaService, JwtService],
  controllers: [ProductsController]
})
export class ProductsModule {}
