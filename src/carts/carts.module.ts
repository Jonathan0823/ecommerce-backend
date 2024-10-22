import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CartsController } from './carts.controller';

@Module({
  providers: [CartsService, PrismaService, JwtService],
  controllers: [CartsController],
})
export class CartsModule {}
