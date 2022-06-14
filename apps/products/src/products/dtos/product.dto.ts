import { PRODUCT_TYPE } from '@app/share/enums/product-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';

class ProductOption {
  @ApiProperty({ description: 'Name of the option', example: 'color' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'Value of the option', example: 'green' })
  @IsString()
  public value: string;
}

export class ProductDto {
  @ApiProperty({ description: 'Name of the product', example: 'iphone13' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  public product_name: string;

  @ApiProperty({
    description: 'Indicate the appropriate category for each product',
    required: false,
    example: 'iphone',
  })
  @IsString()
  @IsOptional()
  public product_category: string;

  @ApiProperty({
    description: 'Physical product or digital product',
    enum: PRODUCT_TYPE,
    example: PRODUCT_TYPE.PHYSICAL,
  })
  @IsString()
  @IsEnum(PRODUCT_TYPE)
  public product_type: string;

  @ApiProperty({
    description: 'Description of the product',
    required: false,
    example:
      'All of the iPhone 13 models feature the same OLED Super Retina XDR display, which is flexible and extends right into the chassis of each device',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  public description: string;

  @ApiProperty({
    description: 'The URL(s) of the product image(s)',
    isArray: true,
    required: false,
    example: 'shorturl.at/lwyN1',
  })
  @IsString({ each: true })
  public images: string[];

  @ApiProperty({
    description:
      'Array of JSON objects describing the product options',
    isArray: true,
    required: true,
    example: [{"name": "color", "value": "red"}, {"name": "color", "value": "blue"}]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOption)
  public options: ProductOption[];

  @ApiProperty({
    description:
      'Array of JSON objects describing the product variants (colors, size, …)',
    isArray: true,
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  public variants!: ProductVariantDto[];
}
