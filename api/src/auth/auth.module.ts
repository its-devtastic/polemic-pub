import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "~/user/user.module";
import { PasswordlessModule } from "~/passwordless/passwordless.module";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    PasswordlessModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
