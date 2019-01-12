import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnections } from "typeorm";

@Resolver()
class HelloResolver {
  @Query(() => String, { description: "this is a hello world example" })
  async hello() {
    return await "Hello World";
  }
}

@Resolver()
class GoodbyeResolver {
  @Query(() => String, { description: "this is a hello goodbye example" })
  async goodbye() {
    return await "Goodbye";
  }
}

@Resolver()
class WelcomeResolver {
  @Query(() => String, { nullable: true })
  async welcome() {
    return await "Welcome";
  }
}

const main = async () => {
  // build the schema

  const port = 4005;

  await createConnections();

  const schema = await buildSchema({
    resolvers: [HelloResolver, GoodbyeResolver, WelcomeResolver]
  });

  // create the apollo server
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `server started on http://localhost:${port}`,
      `graphql playground: http://localhost:${port}/graphql`
    );
  });
};

main();
