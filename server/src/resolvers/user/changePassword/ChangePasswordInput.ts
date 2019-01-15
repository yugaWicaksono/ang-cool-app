import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../../resolvers/shared/Passwordnput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
