import Db from "./db"

import { Resolvers } from './resolvers-types.generated';
import queryTwitterResolvers from './resolvers/Query';

export interface TwitterResolverContext {
  db: Db
}

export function createResolvers(): Resolvers<TwitterResolverContext> {
  const resolvers = {
    Query: queryTwitterResolvers,
  };

  return resolvers;
}
