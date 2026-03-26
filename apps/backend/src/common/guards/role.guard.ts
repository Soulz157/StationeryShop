import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.users;

    if (!user || !requiredRoles.includes(user.role)) {
      console.log(user);
      throw new ForbiddenException(
        "คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้ (Requires Admin Role)",
      );
    }

    return true;
  }
}
