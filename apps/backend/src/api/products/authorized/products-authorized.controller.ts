import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ProductsAuthorizedService } from './products-authorized.service'

@Controller('authorized/products')
@ApiTags('products-authorized')
export class ProductsAuthorizedController {
  constructor(
    private readonly productsAuthorizedService: ProductsAuthorizedService,
  ) {}
}
