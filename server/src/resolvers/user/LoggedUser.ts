import { Resolver, Ctx, Query, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { UserContext } from "../../types/UserContext";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class LoggedUserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async loggedUser(@Ctx() ctx: UserContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    return User.findOne(ctx.req.session!.userId);
  }
}
