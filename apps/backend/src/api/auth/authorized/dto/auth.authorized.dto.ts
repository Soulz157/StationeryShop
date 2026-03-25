import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { createStandardResponseSchema } from "src/libs/dto";

export const GetMeResponseSchema = createStandardResponseSchema(
  z.object({
    id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    role: z.string(),
  }),
);

export const LogoutResponseSchema = createStandardResponseSchema(
  z
    .object({
      message: z.string(),
    })
    .nullable(),
);

export const EditRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  address: z.string(),
  phone: z.string(),
});

export class GetMeResponseDto extends createZodDto(GetMeResponseSchema) {}
export class LogoutResponseDto extends createZodDto(LogoutResponseSchema) {}
export class EditRequestDto extends createZodDto(EditRequestSchema) {}
