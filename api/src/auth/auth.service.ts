import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "~/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async getJwtForUser(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
