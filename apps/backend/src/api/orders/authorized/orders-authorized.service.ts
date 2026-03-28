import { Injectable } from '@nestjs/common'
import { PrismaService } from '@penshop/database'
import { CreateOrderDto } from './dto/orders.authorized.dto/orders.authorized.dto'

@Injectable()
export class OrdersAuthorizedService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderService(args: CreateOrderDto) {
    const { items, ...rest } = args
  }
}
