import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ProductsPublicService } from './products-public.service'
import {
  CheckStockDto,
  GetAllProductsPublicDto,
} from './dto/products.public.dto'
import { ResponseFailedDto } from 'src/libs/dto'

@Controller('public/products')
@ApiTags('products-public')
export class ProductsPublicController {
  constructor(private readonly productsPublicService: ProductsPublicService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of products',
    type: [GetAllProductsPublicDto],
  })
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  async getAllProductsPublic() {
    return this.productsPublicService.getAllProductService()
  }

  @Post('check-stock')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check stock' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of products',
    type: [CheckStockDto],
  })
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  async checkStockController(@Body() cartItems: CheckStockDto[]) {
    return this.productsPublicService.checkStockService(cartItems)
  }
}
