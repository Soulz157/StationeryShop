import { z } from "zod/v4";
import { createZodDto } from "nestjs-zod";

export const GetAllProductsPublicDtoSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  priceMin: z.coerce.number().optional(),
  priceMax: z.coerce.number().optional(),
  inStock: z.coerce.boolean().optional(),
  sortBy: z.enum(["featured", "price-low", "price-high", "name"]).optional(),
});

export class GetAllProductsPublicDto extends createZodDto(
  GetAllProductsPublicDtoSchema,
) {}
