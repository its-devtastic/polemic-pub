import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "~/user/user.module";
import { PasswordlessService } from "./passwordless.service";
import { Once, OnceSchema } from "./schemas/once.schema";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Once.name,
        schema: OnceSchema,
      },
    ]),
  ],
  providers: [PasswordlessService],
  exports: [PasswordlessService, MongooseModule],
})
export class PasswordlessModule {}
