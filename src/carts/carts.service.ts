import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from './dto/carts.dto';

@Injectable()
export class CartsService {
  constructor(private prismaService: PrismaService) {}

  async getCartItemsByUserId(userId: string) {
    return await this.prismaService.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async addItemToCart(userId: string, addCartItemDto: AddCartItemDto) {
    const { productId, quantity } = addCartItemDto;

    let cart = await this.prismaService.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      cart = await this.prismaService.cart.create({
        data: {
          userId,
        },
      });
    }

    const existingCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    if (existingCartItem) {
      return this.prismaService.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      return this.prismaService.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }
  async updateCartItemQuantity(
    userId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { productId, quantity } = updateCartItemDto;

    const cart = await this.prismaService.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    const existingCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!existingCartItem) {
      throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.cartItem.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity,
      },
    });
  }

  async removeItemFromCart(userId: string, productId: string) {
    const cart = await this.prismaService.cart.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }

    const existingCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!existingCartItem) {
      throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
    }

    return this.prismaService.cartItem.delete({
      where: {
        id: existingCartItem.id,
      },
    });
  }
}
