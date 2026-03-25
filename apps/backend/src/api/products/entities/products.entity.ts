import { ApiProperty } from "@nestjs/swagger";

export class ProductsEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  stock!: number;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
