import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

import { generateKey } from "~/utils";
import { IVFile } from "~/types";
import { User } from "~/user/schemas/user.schema";

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({
    default: () => generateKey(10),
  })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Array })
  documents: IVFile[];

  @Prop({ type: mongoose.Schema.Types.Array })
  bibliography: IVFile[];

  @Prop({ type: mongoose.Schema.Types.Mixed })
  config: Record<string, any>;

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
