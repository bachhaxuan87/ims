import ProductVariant from '@app/share/entities/product-variant.entity';
import Product from '@app/share/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async updateStock(data: {
    items: [{ product_id: number; variant_id: string; quantity: number }];
  }) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // we may need to check min_order and max_order configuration on product
      data.items.map((item) =>
        queryRunner.manager
          .createQueryBuilder()
          .update(ProductVariant)
          .where({ id: item.variant_id })
          .set({ stock: () => `stock - ${item.quantity}` })
          .execute(),
      );

      data.items.map((item) =>
        queryRunner.manager
          .createQueryBuilder()
          .update(ProductVariant)
          .where({ id: item.variant_id })
          .set({ quantity: () => `quantity + ${item.quantity}` })
          .execute(),
      );

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
