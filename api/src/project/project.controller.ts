import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ORG_HEADER_KEY } from "~/constants";
import { JwtAuthGuard } from "~/auth/jwt-auth.guard";
import { OrganizationGuard } from "~/organization/organization.guard";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project, ProjectDocument } from "./schemas/project.schema";

@Controller("projects")
@UseGuards(OrganizationGuard)
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: PaginateModel<ProjectDocument>
  ) {}

  @Post()
  async create(@Req() req, @Body() createProjectDto: CreateProjectDto) {
    return await this.projectModel.create({
      organization: req.header(ORG_HEADER_KEY),
      ...createProjectDto,
    });
  }

  @Get()
  async findAll(@Req() req, @Query() query) {
    return await this.projectModel.paginate(
      {
        name: RegExp(query.name ?? "", "i"),
        organization: req.header(ORG_HEADER_KEY),
        deleted: false,
      },
      { page: query.page, sort: query.sort }
    );
  }

  @Get(":id")
  async findOne(@Req() req, @Param("id") _id: string) {
    const doc = await this.projectModel.findOne({
      _id,
      organization: req.header(ORG_HEADER_KEY),
      deleted: false,
    });

    if (!doc) {
      throw new NotFoundException();
    }

    return doc;
  }

  @Patch(":id")
  async update(
    @Req() req,
    @Param("id") _id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    const doc = await this.projectModel.findOneAndUpdate(
      {
        _id,
        organization: req.header(ORG_HEADER_KEY),
        deleted: false,
      },
      updateProjectDto,

      { new: true }
    );

    if (!doc) {
      throw new NotFoundException();
    }

    return doc;
  }

  @Delete(":id")
  async remove(@Req() req, @Param("id") _id: string) {
    await this.projectModel.findOneAndUpdate(
      {
        _id,
        organization: req.header(ORG_HEADER_KEY),
      },
      { deleted: true }
    );
  }
}
