import { ApiProperty } from "@nestjs/swagger";
import { CartEntity } from "src/api/cart/entities/cart.entity";
import { OrdersEntity } from "src/api/orders/entities/orders.entity";
export class AuthEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty()
  cart!: CartEntity;

  @ApiProperty()
  orders!: OrdersEntity[];
}
