import { Injectable } from "@nestjs/common";
import { PrismaService } from "@penshop/database";
import { AppException } from "@penshop/common";

@Injectable()
export class ProductsPublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProductService() {
    const products = await this.prisma.product.findMany();

    if (!products) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบสินค้า",
        type: "ERROR",
      });
    }

    return {
      statusCode: 200,
      message: "ดึงข้อมูลสำเร็จ",
      data: products,
    };
  }
}
