import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductDto } from './dtos';
import SearchProductDto from './dtos/search-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller({
  path: 'products',
  version: '5',
})
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: ProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: ProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  search(@Query() query: SearchProductDto) {
    return this.productService.search(query.search, +query.page, +query.limit);
  }
}
