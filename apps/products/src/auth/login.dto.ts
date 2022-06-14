import { IsEmail, IsNumberString, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}