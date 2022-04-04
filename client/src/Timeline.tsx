import * as React from 'react';
import ComposePanel from './ComposePanel';
import Tweet from './Tweet';
import { gql } from "@apollo/client"
import { useGetTimelineTweetsQuery } from "./generated/graphql"

export const GET_TIMELINE_TWEETS = gql`
  query GetTimelineTweets {
    tweets {
      id
      body
      stats {
        favoriteCount
        retweetCount
        commentCount
      }
      createdAt
      author {
        name
        handle
        avatarUrl
      }
    }
  }
`

export interface TimelineProps {
  currentUserId: string;
  currentUserFavorites: string[];
}

const TWEETS = [
  {
    author: {
      name: 'Brion Micky',
      handle: 'brionmicky',
      avatarUrl: 'http://localhost:3000/static/brionmicky.jpg',
      coverUrl: 'http://localhost:3000/static/background.jpg',
      createdAt: '2022-03-23T03:55:59.613Z',
      updatedAt: '2022-03-23T03:55:59.613Z',
      id: 'user-16ee50d0-e43c-4e95-8ae7-b02d086785f5',
    },
    body: 'Firebase – Full Course for Beginners https://www.youtube.com/embed/fgdpvwEWJ9M',
    createdAt: '2022-03-23T03:55:59.613Z',
    updatedAt: '2022-03-23T03:55:59.613Z',
    id: 'tweet-97fa3005-a0ec-4e42-8f53-9b3cec7c8316',
    stats: { commentCount: 123, retweetCount: 456, favoriteCount: 789 },
  },
  {
    author: {
      name: 'Ellice Mosley',
      handle: 'ellicemosley',
      avatarUrl: 'http://localhost:3000/static/ellicemosley.jpg',
      coverUrl: 'http://localhost:3000/static/background.jpg',
      createdAt: '2022-03-23T03:55:59.612Z',
      updatedAt: '2022-03-23T03:55:59.612Z',
      id: 'user-895b3d36-8bdf-4c29-be10-7a5e7ff3287f',
    },
    body: "CNCF Kubernetes and Cloud Native Associate Certification Course (KCNA) https://www.youtube.com/embed/AplluksKvzI",
    createdAt: '2022-03-23T03:55:59.613Z',
    updatedAt: '2022-03-23T03:55:59.613Z',
    id: 'tweet-ccf7f922-f668-4da1-93a7-07adce2f0d80',
    stats: { commentCount: 123, retweetCount: 456, favoriteCount: 789 },
  },
];

const Timeline: React.FC<TimelineProps> = ({
  currentUserFavorites,
  currentUserId,
}) => {

  const { loading, error, data } = useGetTimelineTweetsQuery()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!data) return <p>No data!</p>
  const { tweets } = data
  if (!tweets) return <p>No tweets!</p>

  return (
    <div id="timeline">
      <ComposePanel currentUser={{ id: currentUserId }} />
      {tweets.map((t:any) => {
        const author = t.author;
        if (!author) throw new Error(`Tweet ${t.id} has no author!`);
        const isFavorited = currentUserFavorites.includes(t.id);

        const { stats, id } = t;
        const {
          commentCount = 0,
          favoriteCount = 0,
          retweetCount = 0,
        } = stats || {};
        const tweet = {
          id,
          isFavorited,
          author,
          commentCount,
          favoriteCount,
          retweetCount,
          createdAt: new Date(t.createdAt),
          message: t.body,
        };
        return <Tweet tweet={tweet} currentUserId={currentUserId} key={t.id} />;
      })}

      <footer>
        <i className="fab fa-twitter"></i>
        <button>Load More</button>
      </footer>
    </div>
  );
};

export default Timeline;
