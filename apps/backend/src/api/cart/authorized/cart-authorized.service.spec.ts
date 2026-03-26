import { Test, TestingModule } from "@nestjs/testing";
import { CartAuthorizedService } from "./cart-authorized.service";

describe("CartAuthorizedService", () => {
  let service: CartAuthorizedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartAuthorizedService],
    }).compile();

    service = module.get<CartAuthorizedService>(CartAuthorizedService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
