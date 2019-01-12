import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { description: "this is a hello world example" })
  async hello() {
    return await "Hello World";
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
