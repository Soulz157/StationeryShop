import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@penshop/database";
import { OrdersModule } from "./api/orders/orders.module";

// import { HttpModule } from "@nestjs/axios";
import { CartModule } from "./api/cart/cart.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    OrdersModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
