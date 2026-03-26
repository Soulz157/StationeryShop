import { Test, TestingModule } from "@nestjs/testing";
import { CartPublicController } from "./cart-public.controller";

describe("CartPublicController", () => {
  let controller: CartPublicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartPublicController],
    }).compile();

    controller = module.get<CartPublicController>(CartPublicController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
