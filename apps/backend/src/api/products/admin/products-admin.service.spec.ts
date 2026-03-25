import { Test, TestingModule } from '@nestjs/testing';
import { ProductsAdminService } from './products-admin.service';

describe('ProductsAdminService', () => {
  let service: ProductsAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsAdminService],
    }).compile();

    service = module.get<ProductsAdminService>(ProductsAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
