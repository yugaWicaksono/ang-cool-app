import { InputType, Field } from "type-graphql";
import { Length, IsNumber, IsEmail } from "class-validator";
import { IsEmailAlreadyExists } from "../../../../../err_messages/user/register/IsEmailAlreadyExists";
import { PasswordInput } from "../../../../../resolvers/shared/Passwordnput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 50)
  firstName: string;

  @Field()
  @Length(1, 50)
  lastName: string;

  @Field()
  @IsNumber()
  age: number;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({ message: "User with this email already exists" })
  email: string;
}
