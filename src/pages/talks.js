import usePageMetadata from 'hooks/use-page-metadata';

import { getAllTalks } from 'lib/talks';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts }) {
  const title = 'All Talks';
  const label = 'Talks';
  const slug = 'talks';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} label={label} posts={posts} slug={slug} metadata={metadata} />;
}

export async function getStaticProps() {
  const { talks } = await getAllTalks();

  return {
    props: {
      posts: talks.filter((talk) => !talk.parent),
    },
  };
}
