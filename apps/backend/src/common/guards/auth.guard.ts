import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '@penshop/database'
import { JwtService } from '@nestjs/jwt'
import { getJwtToken } from 'src/utils'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = getJwtToken(request.headers.authorization ?? '')
    if (!token) {
      throw new UnauthorizedException('กรุณาเข้าสู่ระบบ')
    }
    const checkToken = await this.prisma.userToken.count({
      where: {
        token: token,
      },
    })

    if (checkToken > 0) throw new UnauthorizedException('กรุณาเข้าสู่ระบบ')

    try {
      const payload = await this.jwtService.verifyAsync(token)
      request.users = payload
      request.users.accessToken = token
    } catch {
      throw new UnauthorizedException('กรุณาเข้าสู่ระบบ')
    }
    return true
  }
}
