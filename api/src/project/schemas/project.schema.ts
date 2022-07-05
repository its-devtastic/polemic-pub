import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

import { generatePrefixedId } from "~/utils";
import { User } from "~/user/schemas/user.schema";

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({
    default: () => generatePrefixedId("prj"),
  })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  deleted: boolean;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  })
  user: User;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
