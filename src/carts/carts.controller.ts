import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddCartItemDto, UpdateCartItemDto } from './dto/carts.dto';

@Controller('carts')
export class CartsController {
  constructor(private cartService: CartsService) {}

  @UseGuards(JwtGuard)
  @Get(':userId/items')
  async getCartItems(@Param('userId') userId: string) {
    return this.cartService.getCartItemsByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Post(':userId/items')
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() addCartItemDto: AddCartItemDto,
  ) {
    return this.cartService.addItemToCart(userId, addCartItemDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':userId/items')
  async updateCartItemQuantity(
    @Param('userId') userId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItemQuantity(userId, updateCartItemDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':userId/items/:productId')
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeItemFromCart(userId, productId);
  }

  @UseGuards(JwtGuard)
  @Delete(':userId/items')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
