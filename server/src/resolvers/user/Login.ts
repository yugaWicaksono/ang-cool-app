import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  /* this is mutation function that when it is called will send data back to database */
  async Login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: UserContext
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(
        "The information your provided is incorrect, please try again"
      );
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error(
        "The information your provided is incorrect, please try again"
      );
    }

    // adding the ! will make sure that the input is valid
    ctx.req.session!.userId = user.id;

    return user;
  }
}
