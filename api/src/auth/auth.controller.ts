import {
  Controller,
  Request,
  Post,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";

import { PasswordlessGuard } from "~/passwordless/passwordless.guard";
import { PasswordlessService } from "~/passwordless/passwordless.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private passwordlessService: PasswordlessService
  ) {}

  @UseGuards(PasswordlessGuard)
  @Post("auth/jwt")
  async exchangeOnce(@Request() req) {
    return this.authService.getJwtForUser(req.user);
  }

  @Post("auth/once")
  async requestOnce(@Request() req) {
    if (!req.body.email) {
      throw new BadRequestException("Missing email in body");
    }
    return this.passwordlessService.sendOneTimePassword(req.body.email);
  }
}
