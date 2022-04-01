import Db from './db';

export async function seedDb(db: Db) {
  if (db.getAllTrends().length === 0) {
    await db.createHashtagTrend({ hashtag: 'betterplace', tweetCount: 9001 });
    await db.createTopicTrend(
      { topic: 'Make the world a better place?', tweetCount: 12345 },
      {
        description: 'How do you plan to make the world a better place?',
        imageUrl: 'http://localhost:3000/static/background.jpg',
        title: 'Better place',
      }
    );
    await db.createTopicTrend(
      { topic: 'What will', tweetCount: 999 },
      {
        description: "What will the future of education be?",
        imageUrl: 'http://localhost:3000/static/javascript-logo.webp',
        title: 'Future of education',
      }
    );
    await db.write();
  }
  if (db.getAllSuggestions().length === 0) {
    await db.createSuggestion({
      name: 'TypeScript Project',
      handle: 'TypeScript',
      avatarUrl: 'http://localhost:3000/static/ts-logo.png',
      reason: 'Because you follow@Frontend_Love',
    });
    await db.createSuggestion({
      name: 'Prismic',
      handle: 'prismic',
      avatarUrl: 'http://localhost:3000/static/prisimic-logo.webp',
      reason: 'Because you follow @Frontend_Love',
    });
    await db.createSuggestion({
      name: 'GitHub',
      handle: 'github',
      avatarUrl: 'http://localhost:3000/static/github-logo.jpeg',
      reason: 'Because you follow @Frontend_Love',
    });
    await db.createSuggestion({
      name: 'React',
      handle: 'react',
      avatarUrl: 'http://localhost:3000/static/react-logo.webp',
      reason: 'Because you follow @Frontend_Love',
    });
    await db.write();
  }
  if (db.getAllUsers().length === 0) {
    const [_student, iivarielijah, clancyalice, ellicemosley, brionmicky] = [
      await db.createUser({
        name: 'Daniel Philip Johnson',
        handle: 'danielp_johnson',
        avatarUrl: 'http://localhost:3000/static/profile-pic.jpeg',
        coverUrl: 'http://localhost:3000/static/banner.jpeg',
      }),
      await db.createUser({
        name: 'Iivari Elijah',
        handle: 'iivarielijah',
        avatarUrl: 'http://localhost:3000/static/iivarielijah.png',
        coverUrl: 'http://localhost:3000/static/background.jpg',
      }),
      await db.createUser({
        name: 'Clancy Alice',
        handle: 'clancyalice',
        avatarUrl: 'http://localhost:3000/static/clancyalice.png',
        coverUrl: 'http://localhost:3000/static/background.jpg',
      }),
      await db.createUser({
        name: 'Ellice Mosley',
        handle: 'ellicemosley',
        avatarUrl: 'http://localhost:3000/static/ellicemosley.jpg',
        coverUrl: 'http://localhost:3000/static/background.jpg',
      }),
      await db.createUser({
        name: 'Brion Micky',
        handle: 'brionmicky',
        avatarUrl: 'http://localhost:3000/static/brionmicky.jpg',
        coverUrl: 'http://localhost:3000/static/background.jpg',
      }),
    ];

    const [tweet1, tweet2, tweet3, tweet4] = [
      await db.createTweet({
        userId: brionmicky.id,
        message:
          'Firebase – Full Course for Beginners https://www.youtube.com/embed/fgdpvwEWJ9M',
      }),
      await db.createTweet({
        userId: ellicemosley.id,
        message:
          "CNCF Kubernetes and Cloud Native Associate Certification Course (KCNA) https://www.youtube.com/embed/AplluksKvzI",
      }),
      await db.createTweet({
        userId: clancyalice.id,
        message:
          "Microservices with FastAPI – https://www.youtube.com/embed/Cy9fAvsXGZA",
      }),
      await db.createTweet({
        userId: ellicemosley.id,
        message: `@${clancyalice.handle} Really enjoyed Go and AWS - Code and Deploy a Serverless API https://www.youtube.com/embed/zHcef4eHOc8`,
      }),
      await db.createTweet({
        userId: clancyalice.id,
        message: `Rust Programming Course for Beginners - Tutorial https://www.youtube.com/embed/MsocPEZBd-M`,
      }),
    ];
    await db.createFavorite({ userId: brionmicky.id, tweetId: tweet2.id });
    await db.createFavorite({ userId: brionmicky.id, tweetId: tweet4.id });
    await db.createFavorite({ userId: ellicemosley.id, tweetId: tweet2.id });
    await db.createFavorite({ userId: ellicemosley.id, tweetId: tweet4.id });
    await db.createFavorite({ userId: iivarielijah.id, tweetId: tweet1.id });
    await db.createFavorite({ userId: iivarielijah.id, tweetId: tweet3.id });
    await db.createFavorite({ userId: iivarielijah.id, tweetId: tweet4.id });
    await db.createFavorite({ userId: clancyalice.id, tweetId: tweet2.id });
    await db.createFavorite({ userId: clancyalice.id, tweetId: tweet4.id });
  }
}
