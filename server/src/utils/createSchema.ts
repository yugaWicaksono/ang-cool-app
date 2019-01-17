import { buildSchema } from "type-graphql";

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + "/../resolvers/**/*.resolver.ts"],
    authChecker: ({ context: { req } }) => {
      console.log(req.session.userId);
      return !!req.session.userId; // if undefined return false, if set return true
    }
  });
