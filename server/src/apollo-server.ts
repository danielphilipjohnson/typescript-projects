import * as express from 'express';
import { Server } from 'http';

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GRAPHQL_SCHEMA_PATH } from './constants';

const schema = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()],
});

import Db from './db';

export async function createApolloServer(
  db: Db,
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const resolvers = {
    Query: {
      currentUser: () => {
        return {
          id: '123',
          name: 'John Doe',
          handle: 'johndoe',
          coverUrl: '',
          avatarUrl: '',
          createdAt: '',
          updatedAt: '',
        };
      },
      suggestions: () => {
        return [];
      },
    },
  };

  const SCHEMA = addResolversToSchema({
    schema,
    resolvers: resolvers,
  });

  const server = new ApolloServer({
    schema: SCHEMA,
    context: () => ({ db }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  return server;
}
