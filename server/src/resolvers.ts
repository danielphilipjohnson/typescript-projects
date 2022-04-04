import Db, { DbTweet, DbUser } from './db';

import tweetTwitterResolver from './resolvers/Tweet';
import userTwitterResolver from './resolvers/User';
import { Resolvers } from './resolvers-types.generated';
import queryTwitterResolvers from './resolvers/Query';
import mutationTwitterResolver from './resolvers/Mutation';


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
    Mutation: mutationTwitterResolver,
    User: userTwitterResolver,
  };

  return resolvers;
}
