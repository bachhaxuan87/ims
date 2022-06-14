import ProductCategory from '@app/share/entities/product-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContextService } from '../auth/context.service';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
    private context: ContextService,
  ) {}

  async getAll() {
    return this.productCategoriesRepository.find({
      where: {
        company_id: this.context.company_id,
      },
    });
  }
}
