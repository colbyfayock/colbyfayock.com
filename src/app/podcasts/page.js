import { getAllPodcasts } from 'lib/podcasts';
import { getSiteMetadata } from 'lib/site';

import TemplateArchive from 'templates/archive';

export const revalidate = 60;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();

  return {
    title: 'All Podcasts',
    description: `Podcasts at ${metadata.title}`,
    openGraph: {
      url: `${metadata.url}/podcasts`,
    },
    alternates: {
      canonical: '/podcasts',
    },
  };
}

export default async function PodcastsPage() {
  const { podcasts } = await getAllPodcasts();
  const metadata = await getSiteMetadata();

  const title = 'All Podcasts';
  const label = 'Podcasts';
  const slug = 'podcasts';

  return (
    <TemplateArchive
      title={title}
      label={label}
      posts={podcasts}
      slug={slug}
      metadata={{
        title,
        description: `Podcasts at ${metadata.title}`,
      }}
    />
  );
}
