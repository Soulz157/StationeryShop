import { Test, TestingModule } from '@nestjs/testing'
import { CartAdminService } from './cart-admin.service'

describe('CartAdminService', () => {
  let service: CartAdminService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartAdminService],
    }).compile()

    service = module.get<CartAdminService>(CartAdminService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
