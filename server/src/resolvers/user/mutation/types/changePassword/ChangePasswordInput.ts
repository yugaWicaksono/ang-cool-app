import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../../../shared/Passwordnput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
