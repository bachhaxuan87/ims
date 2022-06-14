import Product from '@app/share/entities/product.entity';
import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ContextService } from '../../auth/context.service';
import { ProductCategoriesService } from '../product-categories.service';
import { ProductsService } from '../products.service';
import {
  createTestingModule,
  mockManager,
  mockRepository,
} from './module.factory';
import { productDto } from './sample-data';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return product', async () => {
      const id = 1;
      const result = {};
      jest
        .spyOn(mockRepository, 'findOneBy')
        .mockImplementation(async () => result);

      const product = await service.getById(1);

      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(product).toBe(result);
    });

    it("should throw Error with message 'Product not found' when product does not exists", async () => {
      jest
        .spyOn(mockRepository, 'findOneBy')
        .mockImplementation(async () => null);

      await expect(service.getById(1)).rejects.toThrowError(
        'Product not found',
      );
    });
  });

  describe('create', () => {
    it('should return product', async () => {
      const result = {};
      jest
        .spyOn(mockRepository, 'create')
        .mockImplementation(async () => result);

      const product = await service.create(productDto);

      expect(product).toBe(result);
    });

    it('should rollback if save fail', async () => {
      jest.spyOn(mockManager, 'save').mockImplementation(async () => {
        throw new Error('');
      });

      await expect(service.create(productDto)).rejects.toThrowError(
        'INTERNAL_SERVER_ERROR',
      );
    });
  });

  describe('update', () => {
    it('should return product', async () => {
      const id = 1;
      const result = {};
      jest
        .spyOn(mockRepository, 'preload')
        .mockImplementation(async () => result);

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);

      const product = await service.update(id, productDto);

      expect(product).toBe(result);
    });

    it("should throw Error with message 'Product not found' when product does not exists", async () => {
      jest
        .spyOn(mockRepository, 'preload')
        .mockImplementation(async () => null);

      await expect(service.update(1, productDto)).rejects.toThrowError(
        'Product not found',
      );
    });
  });

  describe('delete', () => {
    it('should return product', async () => {
      const id = 1;
      const result = {};
      jest
        .spyOn(mockRepository, 'findOneBy')
        .mockImplementation(async () => result);
      jest
        .spyOn(mockRepository, 'softRemove')
        .mockImplementation(async () => result);
      const product = await service.delete(id);

      expect(product).toBe(result);
    });

    it("should throw Error with message 'Product not found' when product does not exists", async () => {
      jest
        .spyOn(mockRepository, 'findOneBy')
        .mockImplementation(async () => null);

      await expect(service.delete(1)).rejects.toThrowError('Product not found');
    });
  });

  describe('search', () => {
    it('should return all products', async () => {
      const result = [];
      jest
        .spyOn(mockRepository, 'getMany')
        .mockImplementation(async () => result);
      const product = await service.search('', 1, 2);

      expect(product).toBe(result);
    });

    it('should search by text condition', async () => {
      const result = [];
      jest
        .spyOn(mockRepository, 'getMany')
        .mockImplementation(async () => result);
      const product = await service.search('fas', 1, 2);

      expect(mockRepository.where).toHaveBeenCalledTimes(1);
      expect(mockRepository.orWhere).toHaveBeenCalledTimes(2);

      expect(product).toBe(result);
    });
  });
});
