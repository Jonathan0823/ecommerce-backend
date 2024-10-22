import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  providers: [OrdersService, PrismaService, JwtService],
  controllers: [OrdersController]
})
export class OrdersModule {}
