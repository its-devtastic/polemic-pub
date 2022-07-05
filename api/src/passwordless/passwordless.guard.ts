import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

import { PasswordlessService } from "~/passwordless/passwordless.service";

@Injectable()
export class PasswordlessGuard implements CanActivate {
  constructor(private passwordlessService: PasswordlessService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.body.token;

    if (!token) {
      throw new UnauthorizedException("Missing token in body.");
    }

    const user = await this.passwordlessService.getUserForToken(token);

    if (!user) {
      throw new UnauthorizedException("Invalid token.");
    }

    req.user = user;

    return true;
  }
}
