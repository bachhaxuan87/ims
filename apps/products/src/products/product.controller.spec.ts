import { Test, TestingModule } from '@nestjs/testing';
import { productDto } from './product-service-test/sample-data';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

export const mockProductsService = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  search: jest.fn(),
};

describe('AppController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = app.get<ProductsController>(ProductsController);
  });

  describe('root', () => {
    it('should call service - create', async () => {
      jest
        .spyOn(mockProductsService, 'create')
        .mockImplementation(async () => productDto);

      const response = await controller.create(productDto);
      expect(mockProductsService.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(productDto);
    });

    it('should call service - update', async () => {
      jest
        .spyOn(mockProductsService, 'update')
        .mockImplementation(async () => productDto);

      const response = await controller.update(1, productDto);
      expect(mockProductsService.update).toHaveBeenCalledTimes(1);
      expect(response).toBe(productDto);
    });

    it('should call service - delete', async () => {
      jest
        .spyOn(mockProductsService, 'delete')
        .mockImplementation(async () => productDto);

      const response = await controller.delete(1);
      expect(mockProductsService.delete).toHaveBeenCalledTimes(1);
      expect(response).toBe(productDto);
    });

    it('should call service - delete', async () => {
      jest
        .spyOn(mockProductsService, 'getById')
        .mockImplementation(async () => productDto);

      const response = await controller.getById(1);
      expect(mockProductsService.getById).toHaveBeenCalledTimes(1);
      expect(response).toBe(productDto);
    });

    it('should call service - search', async () => {
      jest
        .spyOn(mockProductsService, 'search')
        .mockImplementation(async () => [productDto]);

      const response = await controller.search({
        search: '',
        page: 1,
        limit: 10,
      });
      expect(mockProductsService.search).toHaveBeenCalledTimes(1);
      expect(response).toStrictEqual([productDto]);
    });
  });
});
