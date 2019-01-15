import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entities/User";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { redis } from "../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import bcrypt from "bcryptjs";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User)
  async changePassword(@Arg("data")
  {
    token,
    password
  }: ChangePasswordInput): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    user.password = await bcrypt.hash(password, 12);
    await user.save();
    await redis.del(forgotPasswordPrefix + token);

    return user;
  }
}
