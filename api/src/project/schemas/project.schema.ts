import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

import { Organization } from "~/organization/schemas/organization.schema";
import { generateId } from "~/utils";

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({
    default: () => generateId("prj"),
  })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  deleted: boolean;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: "Organization",
    required: true,
  })
  organization: Organization;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
