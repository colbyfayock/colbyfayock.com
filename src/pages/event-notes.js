import usePageMetadata from 'hooks/use-page-metadata';

import { getAllEventNotes } from 'lib/event-notes';

import TemplateArchive from 'templates/archive';

export default function EventNotes({ posts }) {
  const title = 'Event Notes';
  const label = 'Notes';
  const slug = 'event-notes';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  const notes = posts
    .filter((post) => post.eventType !== 'private')
    .map((post) => {
      return {
        ...post,
        excerpt: post.talk?.title,
      };
    });

  return <TemplateArchive title={title} label={label} posts={notes} slug={slug} metadata={metadata} />;
}

export async function getStaticProps() {
  const { eventNotes } = await getAllEventNotes();
  return {
    props: {
      posts: eventNotes,
    },
  };
}
