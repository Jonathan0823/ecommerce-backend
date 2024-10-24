import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}

    async getAllOrders() {
        return this.prismaService.order.findMany({
          include: {
            user: true,
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        });
      }
    
      async getOrdersByUserId(userId: string) {
        return this.prismaService.order.findMany({
          where: { userId },
          include: {
            orderItems: {
              include: {
                product: true, // Include product details if needed
              },
            },
          },
        });
      }

      async createOrder(userId: string, createOrderDto: CreateOrderDto) {
        const { items, total } = createOrderDto;
    
        const order = await this.prismaService.order.create({
          data: {
            userId,
            total,
          },
        });
    
        for (const item of items) {
          await this.prismaService.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          });
        }
    
        return order;
      }

      async updateOrderStatus(orderId: string, status: string) {
    
        const order = await this.prismaService.order.findUnique({
          where: { id: orderId },
        });
    
        if (!order) {
          throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
        }
    
        return this.prismaService.order.update({
          where: { id: orderId },
          data: { 
            status: status
           },
        });
      }
}
