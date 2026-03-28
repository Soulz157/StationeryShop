import z from 'zod'
import { createZodDto } from 'nestjs-zod'

export const CreateOrderDtoSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, 'กรุณากรอกรหัสสินค้า'),
      quantity: z.number().min(1, 'กรุณากรอกจำนวนสินค้า'),
    }),
  ),
  shippingAddress: z.string().min(1, 'กรุณากรอกที่อยู่จัดส่ง'),
  paymentMethod: z.string().min(1, 'กรุณากรอกวิธีการชำระเงิน'),
})

export class CreateOrderDto extends createZodDto(CreateOrderDtoSchema) {}
