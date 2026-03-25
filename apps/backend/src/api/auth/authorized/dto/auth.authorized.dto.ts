import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { createStandardResponseSchema } from "src/libs/dto";
import { Role } from "@penshop/database/dist/generated/client/enums";

export const GetMeResponseSchema = createStandardResponseSchema(
  z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    phone: z.string(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
).strict();

export const LogoutResponseSchema = createStandardResponseSchema(
  z
    .object({
      message: z.string(),
    })
    .nullable(),
);

export const EditRequestSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
    phone: z.string().optional(),
  })
  .strict();

export class GetMeResponseDto extends createZodDto(GetMeResponseSchema) {}
export class LogoutResponseDto extends createZodDto(LogoutResponseSchema) {}
export class EditRequestDto extends createZodDto(EditRequestSchema) {}
