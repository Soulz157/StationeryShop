import { Test, TestingModule } from '@nestjs/testing';
import { OrdersAuthorizedController } from './orders-authorized.controller';

describe('OrdersAuthorizedController', () => {
  let controller: OrdersAuthorizedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersAuthorizedController],
    }).compile();

    controller = module.get<OrdersAuthorizedController>(OrdersAuthorizedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
