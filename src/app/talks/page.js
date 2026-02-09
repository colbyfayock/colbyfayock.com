import { getAllTalks } from 'lib/talks';
import { getSiteMetadata } from 'lib/site';

import TemplateArchive from 'templates/archive';

export const revalidate = 900;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: 'All Talks',
    description: `Talks and presentations by ${metadata.title}`,
    openGraph: {
      url: `${metadata.url}/talks`,
    },
    alternates: {
      canonical: '/talks',
    },
  };
}

export default async function TalksPage() {
  const { talks } = await getAllTalks();
  const metadata = await getSiteMetadata();

  const title = 'All Talks';
  const label = 'Talks';
  const slug = 'talks';

  // Sort by number of events (most popular first) and map to PostCard-compatible format
  const sortedTalks = [...talks]
    .sort((a, b) => b.events.length - a.events.length)
    .map((talk) => ({
      ...talk,
      excerpt: `${talk.events.length} Event${talk.events.length !== 1 ? 's' : ''}`,
    }));

  return (
    <TemplateArchive
      title={title}
      label={label}
      posts={sortedTalks}
      slug={slug}
      postOptions={{ linkField: 'uri', hideMetadata: true }}
      metadata={{
        title,
        description: `Talks and presentations by ${metadata.title}`,
      }}
    />
  );
}
