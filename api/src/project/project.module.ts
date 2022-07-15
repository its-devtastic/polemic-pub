import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProjectService } from "./project.service";
import { Project, ProjectSchema } from "./schemas/project.schema";
import { ProjectController } from "./controllers/project.controller";
import { DocumentController } from "./controllers/document.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectController, DocumentController],
  providers: [ProjectService],
  exports: [MongooseModule],
})
export class ProjectModule {}
