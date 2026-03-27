import { Test, TestingModule } from '@nestjs/testing'
import { ProductsAuthorizedService } from './products-authorized.service'

describe('ProductsAuthorizedService', () => {
  let service: ProductsAuthorizedService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsAuthorizedService],
    }).compile()

    service = module.get<ProductsAuthorizedService>(ProductsAuthorizedService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
