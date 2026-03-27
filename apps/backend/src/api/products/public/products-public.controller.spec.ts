import { Test, TestingModule } from '@nestjs/testing'
import { ProductsPublicController } from './products-public.controller'

describe('ProductsPublicController', () => {
  let controller: ProductsPublicController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsPublicController],
    }).compile()

    controller = module.get<ProductsPublicController>(ProductsPublicController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
