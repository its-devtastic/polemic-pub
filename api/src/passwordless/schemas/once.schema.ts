import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

import { generatePrefixedId } from "~/utils";
import { User } from "~/user/schemas/user.schema";

export type OnceDocument = Once & Document;

@Schema({
  timestamps: true,
})
export class Once {
  @Prop({
    default: () => generatePrefixedId("once"),
  })
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  token: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  })
  user: User;
}

export const OnceSchema = SchemaFactory.createForClass(Once);
