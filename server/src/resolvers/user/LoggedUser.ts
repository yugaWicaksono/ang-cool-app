import { Resolver, Ctx, Query } from "type-graphql";
import { User } from "../../entities/User";
import { UserContext } from "../../types/UserContext";

@Resolver()
export class LoggedUserResolver {
  @Query(() => User, { nullable: true })
  async LoggedUser(@Ctx() ctx: UserContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return;
    }
    return User.findOne(ctx.req.session!.userId);
  }
}
