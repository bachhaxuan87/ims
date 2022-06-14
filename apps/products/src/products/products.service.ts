import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductDto } from './dtos';
import { v4 as uuid } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
import { ContextService } from '../auth/context.service';
import Product from '@app/share/entities/product.entity';
import ProductCategory from '@app/share/entities/product-category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
    @Inject('INVENTORY_SERVICE') private client: ClientProxy,
    private context: ContextService,
    private dataSource: DataSource,
  ) {}

  search(text: string, page: number, limit: number) {
    let query = this.productsRepository
      .createQueryBuilder('Product')
      .leftJoinAndSelect('Product.variants', 'variants')
      .skip((page - 1) * limit)
      .take(limit);

    if (text) {
      query = query
        .where('product_name ilike :name', { name: `%${text}%` })
        .orWhere('product_category ilike :name', { name: `%${text}%` })
        .orWhere('description ilike :name', { name: `%${text}%` });
    }
    return query.getMany();
  }

  async getById(id: number) {
    let product = await this.productsRepository.findOneBy({
      id,
      company_id: this.context.company_id,
    });

    if (product) return product;
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  async create(product: ProductDto) {
    product.variants.forEach((variant) => {
      variant.id = variant.id || uuid();
    });
    const newProduct = await this.productsRepository.create({
      company_id: this.context.company_id,
      ...product,
    });
    const newProductCategory = await this.productCategoriesRepository.create({
      category_name: product.product_category,
    });

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(newProduct);
      await queryRunner.manager.save(newProductCategory);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }

    await this.client.emit('product-created', newProduct);

    return newProduct;
  }

  async update(id: number, product: ProductDto) {
    product.variants.forEach((variant) => {
      variant.id = variant.id || uuid();
    });

    let updatedProduct = await this.productsRepository.preload({
      id,
      company_id: this.context.company_id,
      ...product,
    });
    if (!updatedProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    updatedProduct = await this.productsRepository.save(updatedProduct);

    await this.client.emit('product-updated', updatedProduct);

    return updatedProduct;
  }

  async delete(id: number) {
    const product = await this.productsRepository.findOneBy({
      id,
      company_id: this.context.company_id,
    });
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    const deletedProduct = await this.productsRepository.softRemove(product);

    await this.client.emit('product-deleted', deletedProduct);

    return deletedProduct;
  }
}
