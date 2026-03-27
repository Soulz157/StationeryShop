import { Test, TestingModule } from '@nestjs/testing'
import { CartAuthorizedController } from './cart-authorized.controller'

describe('CartAuthorizedController', () => {
  let controller: CartAuthorizedController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartAuthorizedController],
    }).compile()

    controller = module.get<CartAuthorizedController>(CartAuthorizedController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
