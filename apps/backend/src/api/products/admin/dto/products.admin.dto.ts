import z from 'zod'
import { createZodDto } from 'nestjs-zod'

export const CreateProductsDtoSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อสินค้า'),
  description: z.string().min(1, 'กรุณากรอกรายละเอียดสินค้า').optional(),
  imgUrl: z.string().min(1, 'กรุณากรอกรูปภาพสินค้า').optional(),
  price: z.coerce.number().min(1, 'กรุณากรอกราคาสินค้า'),
  stock: z.coerce.number().min(1, 'กรุณากรอกจำนวนสินค้า'),
  category: z.string().min(1, 'กรุณากรอกหมวดหมู่สินค้า'),
  brand: z.string().optional(),
  tags: z
    .preprocess(val => {
      if (!val) return undefined

      if (typeof val === 'string') {
        try {
          return JSON.parse(val)
        } catch (e) {
          return [val]
        }
      }

      return val
    }, z.array(z.string()))
    .optional(),
})

export const CreateCategoryDtoSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อหมวดหมู่'),
})

export const UpdateProductsDtoSchema = z.object({
  id: z.string().min(1, 'กรุณากรอกรหัสสินค้า'),
  name: z.string().min(1, 'กรุณากรอกชื่อสินค้า').optional(),
  description: z.string().min(1, 'กรุณากรอกรายละเอียดสินค้า').optional(),
  imgUrl: z.string().min(1, 'กรุณากรอกรูปภาพสินค้า').optional(),
  price: z.coerce.number().min(1, 'กรุณากรอกราคาสินค้า').optional(),
  stock: z.coerce.number().min(1, 'กรุณากรอกจำนวนสินค้า').optional(),
  category: z.string().min(1, 'กรุณากรอกหมวดหมู่สินค้า'),
  brand: z.string().optional(),
  rating: z.number().optional(),
  isActive: z.boolean().optional(),
  tags: z
    .preprocess(val => {
      if (!val) return undefined

      if (typeof val === 'string') {
        try {
          return JSON.parse(val)
        } catch (e) {
          return [val]
        }
      }

      return val
    }, z.array(z.string()))
    .optional(),
})

export class CreateProductsDto extends createZodDto(CreateProductsDtoSchema) {}
export class CreateCategoryDto extends createZodDto(CreateCategoryDtoSchema) {}
export class UpdateProductsDto extends createZodDto(UpdateProductsDtoSchema) {}
