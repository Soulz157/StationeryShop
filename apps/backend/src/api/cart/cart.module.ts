import { Module } from '@nestjs/common';
import { CartPublicController } from './public/cart-public.controller';
import { CartPublicService } from './public/cart-public.service';
import { CartAuthorizedController } from './authorized/cart-authorized.controller';
import { CartAuthorizedService } from './authorized/cart-authorized.service';
import { CartAdminController } from './admin/cart-admin.controller';
import { CartAdminService } from './admin/cart-admin.service';

@Module({
  controllers: [CartPublicController, CartAuthorizedController, CartAdminController],
  providers: [CartPublicService, CartAuthorizedService, CartAdminService]
})
export class CartModule {}
