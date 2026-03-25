import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { createStandardResponseSchema } from "src/libs/dto";

export const LoginRequestSchema = z.object({
  email: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .min(1, "อีเมลต้องไม่ว่างเปล่า"),
  password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
});

export const LoginResponseSchema = createStandardResponseSchema(
  z.object({
    message: z.string(),
    accessToken: z.string(),
  }),
);

export const RegisterRequestSchema = z
  .object({
    email: z
      .string({ required_error: "กรุณากรอกอีเมล" })
      .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" })
      .min(1, "อีเมลต้องไม่ว่างเปล่า"),
    password: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmpassword: z.string().min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    firstName: z.string().min(1, "ชื่อต้องไม่ว่างเปล่า"),
    lastName: z.string().min(1, "นามสกุลต้องไม่ว่างเปล่า"),
    role: z.enum(["USER", "ADMIN"]).default("USER"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmpassword"],
  });

export const RegisterResponseSchema = createStandardResponseSchema(
  z.object({
    message: z.string(),
  }),
);

export class LoginRequestDto extends createZodDto(LoginRequestSchema) {}
export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}
export class RegisterRequestDto extends createZodDto(RegisterRequestSchema) {}
export class RegisterResponseDto extends createZodDto(RegisterResponseSchema) {}
