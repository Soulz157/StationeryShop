import { ApiProperty } from "@nestjs/swagger";

export class OrdersEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
