import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../../entities/User";
import { UserContext } from "../../../types/UserContext";

@Resolver()
export default class LoginResolver {
  @Mutation(() => User, { nullable: true })
  /* this is mutation function that when it is called will send data back to database */
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: UserContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    if (!user.confirmed) {
      //TODO: something to handle error
      return null;
    }

    // adding the ! will make sure that the input is valid
    ctx.req.session!.userId = user.id;

    return user;
  }
}
