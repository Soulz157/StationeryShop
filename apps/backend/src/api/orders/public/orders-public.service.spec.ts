import { Test, TestingModule } from "@nestjs/testing";
import { OrdersPublicService } from "./orders-public.service";

describe("OrdersPublicService", () => {
  let service: OrdersPublicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersPublicService],
    }).compile();

    service = module.get<OrdersPublicService>(OrdersPublicService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
