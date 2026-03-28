import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OrdersAuthorizedService } from './orders-authorized.service'
import { CreateOrderDto } from './dto/orders.authorized.dto/orders.authorized.dto'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { RolesGuard } from 'src/common/guards/role.guard'
import { Roles } from 'src/common/decorators/role.decorator'

@UseGuards(AuthGuard, RolesGuard)
@Controller('authorized/orders')
@ApiTags('orders-authorized')
@Roles('USER')
export class OrdersAuthorizedController {
  constructor(
    private readonly ordersAuthorizedService: OrdersAuthorizedService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrderController(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersAuthorizedService.createOrderService(createOrderDto)
  }
}
