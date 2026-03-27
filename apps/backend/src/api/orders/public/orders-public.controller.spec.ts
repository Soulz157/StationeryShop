import { Test, TestingModule } from '@nestjs/testing'
import { OrdersPublicController } from './orders-public.controller'

describe('OrdersPublicController', () => {
  let controller: OrdersPublicController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersPublicController],
    }).compile()

    controller = module.get<OrdersPublicController>(OrdersPublicController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
