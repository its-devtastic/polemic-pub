import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { OrganizationModule } from "~/organization/organization.module";
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
    OrganizationModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [MongooseModule, OrganizationModule],
})
export class ProjectModule {}
