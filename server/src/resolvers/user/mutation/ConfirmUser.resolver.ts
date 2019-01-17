import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../../entities/User";
import { redis } from "../../../redis";
import { confirmPrefix } from "../../../constants/redisPrefixes";

@Resolver()
export default class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(confirmPrefix + token);
    if (!userId) {
      return false;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return false;
    }

    user.confirmed = await true;

    await user.save();
    await redis.del(token);

    return true;
  }
}
