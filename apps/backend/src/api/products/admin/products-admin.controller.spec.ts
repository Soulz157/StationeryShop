import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminController } from './products-admin.controller';

describe('ProductsAdminController', () => {
  let controller: ProductsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsAdminController],
    }).compile();

    controller = module.get<ProductsAdminController>(ProductsAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
