import { ApiProperty } from "@nestjs/swagger";
import { ProductsEntity } from "src/api/products/entities/products.entity";

export class CartEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  products!: ProductsEntity[];

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
