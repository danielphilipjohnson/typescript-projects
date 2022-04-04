import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

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
};
export default queryTwitterResolvers;
