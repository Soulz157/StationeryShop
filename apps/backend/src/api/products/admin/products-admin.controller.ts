import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ProductsAdminService } from "./products-admin.service";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "src/common/decorators/user.decorator";
import { CreateProductsDto, CreateCategoryDto } from "./dto/products.admin.dto";
import { ResponseFailedDto } from "src/libs/dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiTags("products-admin")
@Controller("admins/products")
@ApiBearerAuth()
export class ProductsAdminController {
  constructor(private readonly productsAdminService: ProductsAdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  async createProductController(@Body() args: CreateProductsDto) {
    return this.productsAdminService.createProductService(args);
  }

  @Post("categories")
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() args: CreateCategoryDto) {
    return this.productsAdminService.createCategoryService(args);
  }
}
