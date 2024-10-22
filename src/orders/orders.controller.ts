import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtGuard)
  @Get('user/:userId')
  async getOrdersByUserId(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Post('user/:userId')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Param('userId') userId: string,
  ) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }
}
