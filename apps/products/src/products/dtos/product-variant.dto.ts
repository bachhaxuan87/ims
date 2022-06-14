import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductVariantDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  options: number[];

  @ApiProperty({ description: 'The price currency', example: 'IDR' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Price of the variant', example: 15000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product stock', example: 15000 })
  @IsNumber()
  @IsOptional()
  stock: number;

  @ApiProperty({
    description:
      'SKU is the unique identifier for each product variation. SKU values cannot be duplicated in a shop.',
    example: 'SKU123',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Indicate the weight of the product',
    example: 0.1,
  })
  @IsNumber()
  @IsOptional()
  weight: number;
}



