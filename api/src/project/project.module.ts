import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Project, ProjectSchema } from "./schemas/project.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [MongooseModule],
})
export class ProjectModule {}
