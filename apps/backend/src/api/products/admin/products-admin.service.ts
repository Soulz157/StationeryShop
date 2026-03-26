import { Injectable } from "@nestjs/common";
import { PrismaService } from "@penshop/database";
import {
  CreateCategoryDto,
  CreateProductsDto,
  UpdateProductsDto,
} from "./dto/products.admin.dto";
import { AppException } from "@penshop/common";

@Injectable()
export class ProductsAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createProductService(args: CreateProductsDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        name: args.category,
      },
    });

    if (!category) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบหมวดหมู่สินค้า",
        type: "ERROR",
      });
    }

    const product = await this.prisma.product.create({
      data: {
        name: args.name,
        description: args.description,
        imgUrl: args.imgUrl ?? "",
        price: args.price,
        stock: args.stock,
        category: {
          connect: {
            id: category.id,
          },
        },
        brand: args.brand ?? "",
        tags: [...(args.tags ?? [])],
      },
    });

    if (!product) {
      throw new AppException({
        statusCode: 400,
        message: "เกิดข้อผิดพลาดในการสร้างสินค้า",
        type: "ERROR",
      });
    }

    return {
      statusCode: 201,
      message: "สร้างสินค้าสำเร็จ",
      data: {},
    };
  }

  async createCategoryService(args: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        name: args.name,
      },
    });

    if (!category) {
      throw new AppException({
        statusCode: 400,
        message: "เกิดข้อผิดพลาดในการสร้างหมวดหมู่สินค้า",
        type: "ERROR",
      });
    }

    return {
      statusCode: 201,
      message: "สร้างหมวดหมู่สินค้าสำเร็จ",
      data: {},
    };
  }

  async updateProductService(agrs: UpdateProductsDto) {}

  async deleteProductService(id: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct || existingProduct.deletedAt !== null) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบสินค้า หรือสินค้านี้ถูกลบไปแล้ว",
        type: "ERROR",
      });
    }
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    if (!product) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบสินค้า",
        type: "ERROR",
      });
    }

    return {
      statusCode: 200,
      message: "ลบสินค้าสำเร็จ",
      data: {},
    };
  }
}
