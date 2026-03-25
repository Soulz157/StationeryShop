import { Module } from '@nestjs/common';
import { ProductsPublicController } from './public/products-public.controller';
import { ProductsPublicService } from './public/products-public.service';
import { ProductsAuthorizedController } from './authorized/products-authorized.controller';
import { ProductsAuthorizedService } from './authorized/products-authorized.service';
import { ProductsAdminController } from './admin/products-admin.controller';
import { ProductsAdminService } from './admin/products-admin.service';

@Module({
  controllers: [ProductsPublicController, ProductsAuthorizedController, ProductsAdminController],
  providers: [ProductsPublicService, ProductsAuthorizedService, ProductsAdminService]
})
export class ProductsModule {}
