import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { UserController } from './user/user.controller';
import { ProductsController } from './products/products.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { ProductsService } from './products/products.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { CartsService } from './carts/carts.service';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ProductsModule, CategoriesModule, OrdersModule, CartsModule],
  controllers: [AppController, CategoriesController, UserController, ProductsController, OrdersController, CartsController],
  providers: [AppService, PrismaService, CategoriesService, JwtService, UserService, , OrdersService, CartsService, ProductsService],
})
export class AppModule {}
