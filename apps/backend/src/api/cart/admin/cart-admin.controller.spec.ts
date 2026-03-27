import { Test, TestingModule } from '@nestjs/testing'
import { CartAdminController } from './cart-admin.controller'

describe('CartAdminController', () => {
  let controller: CartAdminController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartAdminController],
    }).compile()

    controller = module.get<CartAdminController>(CartAdminController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
