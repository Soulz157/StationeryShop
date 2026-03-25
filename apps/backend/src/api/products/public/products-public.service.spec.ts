import { Test, TestingModule } from '@nestjs/testing';
import { ProductsPublicService } from './products-public.service';

describe('ProductsPublicService', () => {
  let service: ProductsPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsPublicService],
    }).compile();

    service = module.get<ProductsPublicService>(ProductsPublicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
