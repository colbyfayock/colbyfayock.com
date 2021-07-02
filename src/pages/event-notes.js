import usePageMetadata from 'hooks/use-page-metadata';

import { getAllEventNotes } from 'lib/event-notes';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts }) {
  const title = 'All Event Notes';
  const label = 'Event Notes';
  const slug = 'event-notes';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} label={label} posts={posts} slug={slug} metadata={metadata} />;
}

export async function getStaticProps() {
  const { eventNotes } = await getAllEventNotes();
  return {
    props: {
      posts: eventNotes,
    },
  };
}
