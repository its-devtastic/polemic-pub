import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/[a-zA-Z\d_]+/, {
    message: "Only alphanumeric and underscores are allowed.",
  })
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
