import Db, { DbTweet, DbUser } from './db';

import tweetTwitterResolver from './resolvers/Tweet';
import userTwitterResolver from './resolvers/User';
import { Resolvers } from './resolvers-types.generated';
import queryTwitterResolvers from './resolvers/Query';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

export function createResolvers(): Resolvers<TwitterResolverContext> {
  const resolvers = {
    Query: queryTwitterResolvers,
    Tweet: tweetTwitterResolver,
    User: userTwitterResolver,
  };

  return resolvers;
}
