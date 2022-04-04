import { isDefined } from '@full-stack-ts/shared';
import * as React from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightBar from './RightBar';
import Timeline from './Timeline';

import { gql } from '@apollo/client';
import { useGetCurrentUserQuery } from './generated/graphql';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      handle
      avatarUrl
      createdAt
      stats {
        tweetCount
        followingCount
        followerCount
      }
      favorites {
        tweet {
          id
        }
      }
    }
    suggestions {
      name
      handle
      avatarUrl
      reason
    }
  }
`;

const CURRENT_USER = {
  name: 'Daniel Philip Johnson',
  handle: 'danielp_johnson',
  avatarUrl: 'http://localhost:3000/static/profile-pic.jpeg',
  coverUrl: 'http://localhost:3000/static/banner.jpeg',
  createdAt: '2022-03-23T03:55:59.612Z',
  updatedAt: '2022-03-23T03:55:59.612Z',
  id: 'user-15a37948-7712-4e0b-a554-2fef33f31697',
  favorites: [
    {
      userId: 'user-15a37948-7712-4e0b-a554-2fef33f31697',
      tweet: {
        userId: 'user-895b3d36-8bdf-4c29-be10-7a5e7ff3287f',
        message:
          '@clancyalice I just deployed my new graphql website to netlify. It looks great!',
        createdAt: '2022-03-23T03:55:59.614Z',
        updatedAt: '2022-03-23T03:55:59.614Z',
        id: 'tweet-0db3e976-92cc-4846-9b96-e2a03da0b4e2',
      },
      createdAt: '2022-03-23T03:55:59.615Z',
      updatedAt: '2022-03-23T03:55:59.615Z',
      id: 'favorite-e4859379-b5ce-49d3-978c-a54b3de4ea7e',
    },
  ],
};

const TRENDS = [
  {
    topic: 'TypeScript',
    tweetCount: 12345,
    title: 'TypeScript',
    description: 'Using TypeScript with React',
    imageUrl: 'http://localhost:3000/static/ts-logo.png',
  },
];

const SUGGESTIONS = [
  {
    name: 'TypeScript Project',
    handle: 'TypeScript',
    avatarUrl: 'http://localhost:3000/static/ts-logo.png',
    reason: 'Because you follow @MichaelLNorth',
  },
];

const App: React.FC = () => {

  const { loading, error, data } = useGetCurrentUserQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data.</p>;
  
  const { currentUser, suggestions = [] } = data;
  const { favorites: rawFavorites } = CURRENT_USER;
  const favorites = (rawFavorites || [])
    .map((f) => f.tweet?.id)
    .filter(isDefined);

  return (
    <div>
      <LeftSidebar currentUser={currentUser} />
      <Header currentUser={currentUser} />

      <div id="container" className="wrapper nav-closed">
        <Timeline
          currentUserId={currentUser.id}
          currentUserFavorites={favorites}
        />
        <RightBar trends={TRENDS} suggestions={suggestions}/>
      </div>
    </div>
  );
};
export default App;
