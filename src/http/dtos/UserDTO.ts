import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { User } from "@/database/entities/User";

export class createUserDTO {
  id?: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  // @IsEmail()
  @IsString()
  @IsUnique(User, "email")
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(6)
  // @Matches('password')
  // password_confirmation: string;
}

export class updateUserDTO {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  // @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role_id: number;

  @IsOptional()
  wa: string;

  @IsOptional()
  posko_id: string;

  @IsOptional()
  @IsString()
  // @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  // @MinLength(6)
  // @Matches('password')
  password_confirmation: string;
}

