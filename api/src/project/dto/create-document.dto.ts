import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  readonly uri: string;
  @IsString()
  readonly content: string;
}
