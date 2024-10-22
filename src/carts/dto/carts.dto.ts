import { IsString, IsInt, Min } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @Min(1)
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
    @IsString()
    @Min(1)
    productId: string;
  
    @IsInt()
    @Min(1)
    quantity: number;
  }