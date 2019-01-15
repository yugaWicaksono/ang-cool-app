import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnections } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { RegisterResolver } from "./resolvers/user/Registration";
import { LoginResolver } from "./resolvers/user/Login";
import { LoggedUserResolver } from "./resolvers/user/LoggedUser";

const main = async () => {
  // build the schema

  const port = 4005;

  await createConnections();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, LoggedUserResolver],
    authChecker: ({ context: { req } }) => {
      console.log(req.session.userId);
      return !!req.session.userId; // if undefined return false, if set return true
    }
  });

  // create the apollo server
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    engine: {
      apiKey: process.env.ENGINE_API_KEY
    },
    introspection: true,
    context: ({ req }: any) => ({ req })
  });

  // redis store setup
  const RedisStore = connectRedis(session);

  // creating the express server with redis connection
  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:4200",
      allowedHeaders: ["Content-Type", "Authorization"]
    }),
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "sid",
      secret: "uew37fu3gfg2fbeyf2u3hf",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, //process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 4 // --> prior 4 hours(msec,sec,minute,hours,days)
      }
    } as any)
  );

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    const startTime = new Date();

    console.log(
      "==================================================================== \n" +
        "🚀 " +
        " " +
        `server started ${startTime} on http://localhost:${port}\n` +
        "💻 " +
        " " +
        ` graphql playground: http://localhost:${port}/graphql\n` +
        "====================================================================="
    );
  });
};

main();
