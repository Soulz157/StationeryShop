import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService, PrismaEnums } from "@penshop/database";
import { AppException } from "@penshop/common";
import * as argon2 from "argon2";
import { LoginRequestDto, RegisterRequestDto } from "./dto/auth.public.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthPublicService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerService(users: RegisterRequestDto) {
    const { email, password, firstName, lastName, role } = users;
    const hash = await argon2.hash(password);

    const haveUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (haveUser) {
      throw new AppException({
        statusCode: 400,
        message: "มีผู้ใช้งานนี้ในระบบแล้ว",
        type: "ERROR",
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        firstName,
        lastName,
        role: (role as PrismaEnums.Role) ?? PrismaEnums.Role.USER,
      },
    });

    if (!user) {
      throw new AppException({
        statusCode: 400,
        message: "เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้",
        type: "ERROR",
      });
    }

    return {
      message: "สร้างบัญชีผู้ใช้สำเร็จ",
    };
  }

  async loginService(users: LoginRequestDto) {
    const { email, password } = users;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบผู้ใช้งานนี้ในระบบ",
        type: "ERROR",
      });
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new AppException({
        statusCode: 400,
        message: "รหัสผ่านไม่ถูกต้อง",
        type: "ERROR",
      });
    }

    const accessToken = this.jwtService.sign<Auth.UserPayload>(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        role: user.role as PrismaEnums.Role,
      },
      {
        expiresIn: "7d",
      },
    );

    return {
      message: "ดึงข้อมูลสำเร็จ",
      data: {
        accessToken,
      },
    };
  }
}
