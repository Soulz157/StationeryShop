import { Module } from '@nestjs/common'
import { OrdersPublicController } from './public/orders-public.controller'
import { OrdersPublicService } from './public/orders-public.service'
import { OrdersAuthorizedController } from './authorized/orders-authorized.controller'
import { OrdersAuthorizedService } from './authorized/orders-authorized.service'
import { OrdersAdminController } from './admin/orders-admin.controller'
import { OrdersAdminService } from './admin/orders-admin.service'

@Module({
  controllers: [
    OrdersPublicController,
    OrdersAuthorizedController,
    OrdersAdminController,
  ],
  providers: [OrdersPublicService, OrdersAuthorizedService, OrdersAdminService],
})
export class OrdersModule {}
