import { Resolver, Mutation, Arg } from "type-graphql";
import { sendEmail } from "../../../utils/sendEmail";
import { forgotPasswordConfirm } from "../../../utils/forgotPasswordConfirm";
import { User } from "../../../entities/User";

@Resolver()
export default class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    sendEmail(email, await forgotPasswordConfirm(user.id)).catch(Error);

    return true;
  }
}
