import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { tweetTransform } from "../transforms"

const queryTwitterResolvers: QueryResolvers<TwitterResolverContext> = {
  currentUser: () => {
    return {
      id: '123',
      name: 'Daniel Philip Johnson',
      handle: 'danielp_johnson',
      coverUrl: 'http://localhost:3000/static/banner.jpeg',
      avatarUrl: 'http://localhost:3000/static/profile-pic.jpeg',
      createdAt: '',
      updatedAt: '',
    };
  },
  suggestions: () => {
    return [
      {
        name: 'TypeScript Project',
        handle: 'TypeScript',
        avatarUrl: 'http://localhost:3000/static/ts-logo.png',
        reason: 'Because you follow@Frontend_Love',
      },
      {
        name: 'Prismic',
        handle: 'prismic',
        avatarUrl: 'http://localhost:3000/static/prisimic-logo.webp',
        reason: 'Because you follow @Frontend_Love',
      },
    ];
  },
  tweets: (
    _,
    __,
    { db, dbTweetToFavoriteCountMap, dbUserCache, dbTweetCache }
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
    });
    return db.getAllTweets().map((t) => {
      dbTweetCache[t.id] = t;
      return tweetTransform(t);
    });
  },
};
export default queryTwitterResolvers;
