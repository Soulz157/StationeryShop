import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService, PrismaEnums } from "@penshop/database";
import { EditRequestDto } from "./dto/auth.authorized.dto";
import { AppException } from "@penshop/common";

@Injectable()
export class AuthAuthorizedService {
  constructor(private readonly prisma: PrismaService) {}

  async getMeService(users: UserPayload.Request) {
    const { id } = users;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบผู้ใช้งานนี้ในระบบ",
        type: "ERROR",
      });
    }

    return {
      message: "ดึงข้อมูลสำเร็จ",
      data: {
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email,
        role: user.role,
      },
    };
  }

  async editService(usersId: string, args: EditRequestDto) {
    const { firstName, lastName, role, address, phone } = args;
    const user = await this.prisma.user.update({
      where: {
        id: usersId,
      },
      data: {
        firstName,
        lastName,
        role: role as PrismaEnums.Role,
        address,
        phone,
      },
    });

    if (!user) {
      throw new AppException({
        statusCode: 400,
        message: "ไม่สามารถอัปเดตข้อมูลได้ หรือไม่พบผู้ใช้งาน",
        type: "ERROR",
      });
    }

    return {
      statusCode: 200,
      message: "แก้ไขข้อมูลสำเร็จ",
      data: user,
    };
  }

  async logoutService(users: UserPayload.Request) {
    await this.prisma.userToken.create({
      data: {
        userId: users.id,
        token: users.accessToken!,
      },
    });

    return {
      message: "ออกจากระบบสำเร็จ",
    };
  }

  async deleteMeService(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.deletedAt !== null) {
      throw new AppException({
        statusCode: 404,
        message: "ไม่พบผู้ใช้งาน หรือบัญชีถูกลบไปแล้ว",
        type: "ERROR",
      });
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    return {
      statusCode: 200,
      message: "ลบบัญชีผู้ใช้สำเร็จ",
    };
  }
}
