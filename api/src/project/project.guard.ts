import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ORG_HEADER_KEY, PRJ_HEADER_KEY } from "~/constants";
import {
  Organization,
  OrganizationDocument,
} from "~/organization/schemas/organization.schema";
import { Project, ProjectDocument } from "./schemas/project.schema";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: PaginateModel<ProjectDocument>,
    @InjectModel(Organization.name)
    private readonly organizationModel: PaginateModel<OrganizationDocument>
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const orgId = req.header(ORG_HEADER_KEY);
    const prjId = req.header(PRJ_HEADER_KEY);

    if (!prjId) {
      throw new ForbiddenException("Missing header `Appcom-Project`");
    }

    const prj = await this.projectModel.exists({
      _id: req.header(PRJ_HEADER_KEY),
      organization: orgId,
    });

    return Boolean(prj);
  }
}
