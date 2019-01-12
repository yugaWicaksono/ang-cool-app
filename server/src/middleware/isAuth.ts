import { MiddlewareFn } from "type-graphql";
import { UserContext } from "src/types/UserContext";

export const isAuth: MiddlewareFn<UserContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("You are not authorized, please login");
  }

  return next();
};
