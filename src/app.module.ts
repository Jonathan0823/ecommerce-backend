import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { CategoryController } from './categories/category.controller';
import { CategoryModule } from './categories/category.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ProductsModule, CategoryModule, CategoriesModule],
  controllers: [AppController, CategoryController, CategoriesController],
  providers: [AppService, PrismaService, CategoriesService],
})
export class AppModule {}
