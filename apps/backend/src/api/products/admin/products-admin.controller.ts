import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ProductsAdminService } from './products-admin.service'
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Users } from 'src/common/decorators/user.decorator'
import {
  CreateProductsDto,
  CreateCategoryDto,
  UpdateProductsDto,
} from './dto/products.admin.dto'
import { ResponseFailedDto } from 'src/libs/dto'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger'
import { multerOptions } from 'src/configs/multer.config'
import { FileInterceptor } from '@nestjs/platform-express'
import { Roles } from 'src/common/decorators/role.decorator'
import { RolesGuard } from 'src/common/guards/role.guard'

@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/products')
@ApiTags('products-admin')
@ApiBearerAuth()
@Roles('ADMIN')
export class ProductsAdminController {
  constructor(private readonly productsAdminService: ProductsAdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createProductController(
    @Users() user: Auth.UserPayload,
    @Body() args: CreateProductsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const productData = {
      ...args,
      imgUrl: file ? `/uploads/products/${file.filename}` : '',
    }
    return this.productsAdminService.createProductService(user, productData)
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ type: ResponseFailedDto })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateProductController(
    @Users() user: Auth.UserPayload,
    @Body() args: UpdateProductsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const productData = {
      ...args,
      imgUrl: file ? `/uploads/products/${file.filename}` : '',
    }
    console.log(productData)
    return this.productsAdminService.updateProductService(user, productData)
  }

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() args: CreateCategoryDto) {
    return this.productsAdminService.createCategoryService(args)
  }
}
