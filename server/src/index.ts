import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnections } from "typeorm";
import { RegisterResolver } from "./resolvers/user/Registration";

const main = async () => {
  // build the schema

  const port = 4005;

  await createConnections();

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  // create the apollo server
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log("🚀 " + " " + `server started on http://localhost:${port}`);
    console.log(
      "💻 " + " " + ` graphql playground: http://localhost:${port}/graphql`
    );
  });
};

main();
