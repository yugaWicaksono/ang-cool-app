import { v4 } from "uuid";
import { redis } from "../redis";
import { confirmPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(confirmPrefix + token, userId, "ex", 60 * 60 * 24); // "ex" is expire moment , 60*60*24 is a day
  return `http://localhost:4200/user/confirm/${token}`;
};
