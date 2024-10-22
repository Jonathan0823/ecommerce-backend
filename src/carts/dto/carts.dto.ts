import { IsString, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
    @IsString()
    productId: string;
  
    @IsInt()
    @Min(1)
    quantity: number;
  }