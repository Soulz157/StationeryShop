import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "@penshop/database";
import { OrdersModule } from "./api/orders/orders.module";
import { CartModule } from "./api/cart/cart.module";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "./api/auth/auth.module";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import {
  AllExceptionsFilter,
  ResponseInterceptor,
  ZodValidationPipe as AppZodValidationPipe,
} from "@penshop/common";
import { ProductsModule } from "./api/products/products.module";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.register({
      timeout: 5000,
    }),
    PrismaModule,
    OrdersModule,
    CartModule,
    AuthModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: AppZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
