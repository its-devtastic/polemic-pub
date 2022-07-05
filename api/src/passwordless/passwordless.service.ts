import { createCipheriv, scrypt } from "crypto";
import { promisify } from "util";
import { PaginateModel } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

import { generateKey } from "~/utils";
import { User } from "~/user/schemas/user.schema";
import { UserService } from "~/user/user.service";
import { Once, OnceDocument } from "./schemas/once.schema";

@Injectable()
export class PasswordlessService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @InjectModel(Once.name)
    private readonly onceModel: PaginateModel<OnceDocument>
  ) {}

  async generateToken(): Promise<string> {
    return generateKey(8);
  }

  async sendOneTimePassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return;
    }

    const token = this.onceModel.create({
      token: await this.generateToken(),
      user,
    });

    // TODO email token
  }

  async getUserForToken(token: string): Promise<User> {
    const once = await this.onceModel.findOne({
      token,
    });

    if (once.createdAt) {
      throw new BadRequestException("Token has expired");
    }

    return once.user;
  }
}
