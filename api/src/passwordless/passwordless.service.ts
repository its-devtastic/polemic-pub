import { PaginateModel } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import dayjs from "dayjs";

import { generateKey } from "~/utils";
import { User } from "~/user/schemas/user.schema";
import { UserService } from "~/user/user.service";
import { Once, OnceDocument } from "./schemas/once.schema";
import { EmailService } from "~/email/email.service";

@Injectable()
export class PasswordlessService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private emailService: EmailService,
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

    const token = await this.onceModel.create({
      token: await this.generateToken(),
      user,
    });

    await this.emailService.send({
      recipients: [user.email],
      subject: "Your PolemicPub login code",
      html: `<p>Your login code:</p><p><code>${token.token}</code></p><p>It will expire in 10 minutes.</p>`,
      plain: `Your login code:
      
      ${token.token}
      
      It will expire in 10 minutes.
      `,
    });
  }

  async getUserForToken(token: string): Promise<User> {
    const once = await this.onceModel
      .findOne({
        token,
      })
      .populate("user");

    if (dayjs().diff(once.createdAt, "minutes") > 10) {
      throw new BadRequestException("Token has expired");
    }

    return once.user;
  }
}
