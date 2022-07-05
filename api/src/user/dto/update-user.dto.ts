import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDto {
  username: string;

  @IsEmail()
  email: string;
}
