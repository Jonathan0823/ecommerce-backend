import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CategoriesController } from './categories/categories.controller';
import { UserController } from './user/user.controller';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';
import { CartsController } from './carts/carts.controller';
import { CategoriesService } from './categories/categories.service';
import { UserService } from './user/user.service';
import { OrdersService } from './orders/orders.service';
import { CartsService } from './carts/carts.service';
import { ProductsService } from './products/products.service';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { BannersController } from './banners/banners.controller';
import { BannersModule } from './banners/banners.module';
import { BannersService } from './banners/banners.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    CartsModule,
    BannersModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    UserController,
    ProductsController,
    OrdersController,
    CartsController,
    BannersController,
  ],
  providers: [
    AppService,
    ProductsService,
    PrismaService,
    CategoriesService,
    JwtService,
    UserService,
    OrdersService,
    CartsService,
    BannersService,
  ],
})
export class AppModule {}
