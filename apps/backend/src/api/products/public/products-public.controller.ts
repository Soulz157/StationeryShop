import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductsPublicService } from "./products-public.service";
import { GetAllProductsPublicDto } from "./dto/products.public.dto";
import { ResponseFailedDto } from "src/libs/dto";

@Controller("public/products")
@ApiTags("products-public")
export class ProductsPublicController {
  constructor(private readonly productsPublicService: ProductsPublicService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of products",
    type: [GetAllProductsPublicDto],
  })
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  async getAllProductsPublic() {
    return this.productsPublicService.getAllProductService();
  }
}
