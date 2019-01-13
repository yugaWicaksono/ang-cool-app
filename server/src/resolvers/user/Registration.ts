import { Resolver, Mutation, Arg, UseMiddleware, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class RegisterResolver {
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

    return user;
  }
}
