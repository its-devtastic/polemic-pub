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
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as R from "ramda";

import { JwtAuthGuard } from "~/auth/jwt-auth.guard";
import { Project, ProjectDocument } from "../schemas/project.schema";
import { CreateDocumentDto } from "../dto/create-document.dto";
import { UpdateDocumentDto } from "../dto/update-document.dto";

@Controller("projects/:id/documents")
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: PaginateModel<ProjectDocument>
  ) {}

  @Post()
  async create(
    @Req() req,
    @Param("id") projectId,
    @Body() createDocumentDto: CreateDocumentDto
  ) {
    const doc = await this.projectModel.findOne({
      _id: projectId,
      user: req.user,
    });

    if (!doc) {
      throw new NotFoundException();
    }

    if (doc.documents.some(R.whereEq({ uri: createDocumentDto.uri }))) {
      throw new BadRequestException("A document with this URI already exists.");
    }

    doc.documents.push(createDocumentDto);

    doc.save();

    return createDocumentDto;
  }

  @Get()
  async findAll(@Req() req, @Param("id") projectId) {
    const doc = await this.projectModel.findOne(
      {
        _id: projectId,
        user: req.user,
        deleted: false,
      },
      ["documents"]
    );

    if (!doc) {
      throw new NotFoundException();
    }

    return doc.documents;
  }

  @Get(":uri")
  async findOne(
    @Req() req,
    @Param("id") projectId: string,
    @Param("uri") uri: string
  ) {
    const doc = await this.projectModel.findOne(
      {
        _id: projectId,
        user: req.user,
        deleted: false,
      },
      ["documents"]
    );

    if (!doc) {
      throw new NotFoundException();
    }

    return doc.documents.find(R.whereEq({ uri }));
  }

  @Patch(":uri")
  async update(
    @Req() req,
    @Param("id") projectId: string,
    @Param("uri") uri: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    const doc = await this.projectModel.findOne(
      {
        _id: projectId,
        user: req.user,
        deleted: false,
      },
      ["documents"]
    );

    if (!doc) {
      throw new NotFoundException();
    }

    // Index of document in documents array
    const index = doc.documents.findIndex(R.whereEq({ uri }));

    if (index === -1) {
      throw new NotFoundException();
    }

    if (
      updateDocumentDto.uri !== uri &&
      doc.documents.some(R.whereEq({ uri: updateDocumentDto.uri }))
    ) {
      throw new BadRequestException("A document with this URI already exists.");
    }

    // Merge updated properties into document
    doc.documents = R.adjust(
      index,
      R.mergeLeft(updateDocumentDto),
      doc.documents
    );

    doc.save();

    return doc.documents[index];
  }

  @Delete(":uri")
  async remove(
    @Req() req,
    @Param("id") projectId: string,
    @Param("uri") uri: string
  ) {
    const doc = await this.projectModel.findOne({
      _id: projectId,
      user: req.user,
    });

    if (!doc) {
      throw new NotFoundException();
    }

    doc.documents = R.reject(R.whereEq({ uri }), doc.documents);

    doc.save();
  }
}
