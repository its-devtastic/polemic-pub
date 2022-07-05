import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

import { AppController } from "~/app.controller";
import { AppService } from "~/app.service";
import { AuthModule } from "~/auth/auth.module";
import { UserModule } from "~/user/user.module";
import { ProjectModule } from "~/project/project.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
      {
        connectionFactory: (connection) => {
          connection.plugin(mongoosePaginate);
          mongoosePaginate.paginate.options = {
            limit: 10,
            customLabels: {
              docs: "data",
              totalDocs: "total",
              totalPages: "pages",
              page: "current",
              pagingCounter: false,
              hasNextPage: false,
              hasPrevPage: false,
            },
          };

          return connection;
        },
      }
    ),
    AuthModule,
    UserModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
