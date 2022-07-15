import { IsOptional, IsString } from "class-validator";

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  readonly uri: string;
  @IsOptional()
  @IsString()
  readonly content: string;
}
