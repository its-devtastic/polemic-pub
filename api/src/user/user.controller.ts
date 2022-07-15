import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { PaginateModel } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { JwtAuthGuard } from "~/auth/jwt-auth.guard";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Controller("users")
export class UserController {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<UserDocument>
  ) {}

  @Post()
  async create(@Req() req, @Body() createUserDto: CreateUserDto) {
    if (await this.userModel.exists({ email: req.body.email })) {
      throw new BadRequestException(
        "An account with this email address already exists"
      );
    }

    if (await this.userModel.exists({ username: req.body.username })) {
      throw new BadRequestException(
        "An account with this username address already exists"
      );
    }

    return await this.userModel.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async findCurrent(@Req() req) {
    const doc = await this.userModel.findOne({
      _id: req.user._id,
      deleted: false,
    });

    if (!doc) {
      throw new NotFoundException();
    }

    return doc;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("me")
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const doc = await this.userModel.findOneAndUpdate(
      {
        _id: req.user._id,
        deleted: false,
      },
      updateUserDto,

      { new: true }
    );

    if (!doc) {
      throw new NotFoundException();
    }

    return doc;
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  async remove(@Req() req) {
    await this.userModel.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      { deleted: true }
    );
  }
}
