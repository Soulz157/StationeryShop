import { Test, TestingModule } from "@nestjs/testing";
import { OrdersAuthorizedService } from "./orders-authorized.service";

describe("OrdersAuthorizedService", () => {
  let service: OrdersAuthorizedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersAuthorizedService],
    }).compile();

    service = module.get<OrdersAuthorizedService>(OrdersAuthorizedService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
