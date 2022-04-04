import * as express from 'express';
import { Server } from 'http';

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GRAPHQL_SCHEMA_PATH } from './constants';
import { createResolvers, TwitterResolverContext } from './resolvers';

const schema = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

import Db from './db';

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const SCHEMA = addResolversToSchema({
    schema,
    resolvers: createResolvers(),
  });


  const server = new ApolloServer({
    schema: SCHEMA,
    context: () =>
      ({
        db,
        dbTweetCache: {},
        dbTweetToFavoriteCountMap: {},
        dbUserCache: {},
      } as TwitterResolverContext),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  return server;
}
