import { Controller, Get } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';

@Controller({
  path: 'product-categories',
  version: '5',
})
export class ProductCategoriesController {
  constructor(private productCategoriesService: ProductCategoriesService) {}

  @Get()
  getAll() {
    return this.productCategoriesService.getAll();
  }
}
