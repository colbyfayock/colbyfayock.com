import usePageMetadata from 'hooks/use-page-metadata';

import { getAllPodcasts } from 'lib/podcasts';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts }) {
  const title = 'All Podcasts';
  const label = 'Podcasts';
  const slug = 'podcasts';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} label={label} posts={posts} slug={slug} metadata={metadata} />;
}

export async function getStaticProps() {
  const { podcasts } = await getAllPodcasts();
  return {
    props: {
      posts: podcasts,
    },
  };
}
