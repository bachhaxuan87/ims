import ProductCategory from '@app/share/entities/product-category.entity';
import Product from '@app/share/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ContextService } from '../../auth/context.service';
import { ProductsService } from '../products.service';

export const mockRepository = {
  findOneBy: jest.fn(),
  preload: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  softRemove: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnThis(),
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  take: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orWhere: jest.fn().mockReturnThis(),
  getMany: jest.fn() 
};

export const mockContextService = {
  findOneBy: jest.fn(),
  preload: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  softRemove: jest.fn(),
};

export const mockRabitMQ = {
  emit: jest.fn(),
};

export const mockProductCategoryRepository = {
  create: jest.fn(),
};

export const mockManager = {
  save: jest.fn(),
};

export const mockQueryRunner = {
  connect: jest.fn(),
  startTransaction: jest.fn(),
  manager: mockManager,
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
  release: jest.fn(),
};

export const mockDataSource = {
  createQueryRunner: () => mockQueryRunner,
};

export async function createTestingModule() {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProductsService,
      {
        provide: getRepositoryToken(Product),
        useValue: mockRepository,
      },
      {
        provide: getRepositoryToken(ProductCategory),
        useValue: mockProductCategoryRepository,
      },
      {
        provide: 'INVENTORY_SERVICE',
        useValue: mockRabitMQ,
      },
      {
        provide: ContextService,
        useValue: mockContextService,
      },
      {
        provide: DataSource,
        useValue: mockDataSource,
      },
    ],
  }).compile();

  return module;
}
