import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [CartsService, PrismaService, JwtService],
    controllers: [CartsService]
  })
export class CartsModule {}
