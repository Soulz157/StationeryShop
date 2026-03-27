import { Test, TestingModule } from '@nestjs/testing'
import { ProductsAuthorizedController } from './products-authorized.controller'

describe('ProductsAuthorizedController', () => {
  let controller: ProductsAuthorizedController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsAuthorizedController],
    }).compile()

    controller = module.get<ProductsAuthorizedController>(
      ProductsAuthorizedController,
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
