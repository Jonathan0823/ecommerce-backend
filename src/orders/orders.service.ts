import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}

    async getAllOrders() {
        return this.prismaService.order.findMany({
          include: {
            orderItems: {
              include: {
                product: true, // Include product details if needed
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
    
        // Create the order
        const order = await this.prismaService.order.create({
          data: {
            userId,
            total,
            status: 'pending', // Set initial status
          },
        });
    
        // Create order items
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
}
