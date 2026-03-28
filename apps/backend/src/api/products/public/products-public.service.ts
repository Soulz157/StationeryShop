import { Injectable } from '@nestjs/common'
import { PrismaService } from '@penshop/database'
import { AppException } from '@penshop/common'
import { CheckStockDto } from './dto/products.public.dto'

@Injectable()
export class ProductsPublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProductService() {
    const products = await this.prisma.product.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      include: {
        category: true,
      },
    })

    if (!products) {
      throw new AppException({
        statusCode: 404,
        message: 'ไม่พบสินค้า',
        type: 'ERROR',
      })
    }

    return {
      statusCode: 200,
      message: 'ดึงข้อมูลสำเร็จ',
      data: {
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          imgUrl: product.imgUrl,
          price: product.price,
          stock: product.stock,
          category: product.category.name,
          brand: product.brand,
          rating: product.rating,
          isActive: product.isActive,
          tags: product.tags,
        })),
      },
    }
  }

  async checkStockService(items: CheckStockDto[]) {
    const ids = items.map(i => i.productId)

    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    })

    return items.map(item => {
      const product = products.find(p => p.id === item.productId)

      if (!product) {
        return {
          statusCode: 404,
          message: 'ไม่พบสินค้า',
          data: {
            productId: item.productId,
            available: false,
            currentStock: 0,
            requestedQty: item.quantity,
          },
          type: 'ERROR',
        }
      }

      return {
        statusCode: 200,
        message: 'ดึงข้อมูลสำเร็จ ' + item.productId,
        data: {
          productId: item.productId,
          available: product.stock >= item.quantity,
          currentStock: product.stock,
          requestedQty: item.quantity,
        },
      }
    })
  }
}
