import { v4 } from "uuid";
import { redis } from "../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

export const forgotPasswordConfirm = async (userId: number) => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, "ex", 60 * 60 * 24); // "ex" is expire moment , 60*60*24 is a day
  return `http://localhost:4200/user/change-password/${token}`;
};
