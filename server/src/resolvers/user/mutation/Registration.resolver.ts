import { Resolver, Mutation, Arg, UseMiddleware, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../../entities/User";
import { RegisterInput } from "../../user/mutation/types/register/RegisterInput";
import { isAuth } from "../../../middleware/isAuth";
import { sendEmail } from "../../../util/sendEmail";
import { createConfirmationUrl } from "../../../util/createConfirmationUrl";

@Resolver()
export default class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return "hello this is a test";
  }

  @Mutation(() => User)
  /* this is mutation function that when it is called will send data back to database */
  async Registration(@Arg("userData")
  {
    firstName,
    lastName,
    age,
    email,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
