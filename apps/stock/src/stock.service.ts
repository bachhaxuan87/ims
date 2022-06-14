import ProductVariant from '@app/share/entities/product-variant.entity';
import Product from '@app/share/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async updateStock(data: any) {
    console.log(data);
    const a = await this.productsRepository
      .createQueryBuilder()
      .update(ProductVariant)
      .where({ id: '829bcc41-96a0-4771-bce1-2064ba7086ca' })
      .set({ stock: () => 'stock - 1' })
      .execute();

    return a;
  }
}
