import { Resolver, Mutation, Ctx } from "type-graphql";
import { UserContext } from "src/types/UserContext";

@Resolver()
export default class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: UserContext): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }
        ctx.res.clearCookie("sid");
        return res(true);
      })
    );
  }
}
