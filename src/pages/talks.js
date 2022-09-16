import usePageMetadata from 'hooks/use-page-metadata';

import { getAllTalks } from 'lib/talks';
import { sortByKey } from 'lib/util';

import TemplateArchive from 'templates/archive';

import styles from 'styles/pages/Talks.module.scss';

export default function Talks({ talks }) {
  const title = 'All Talks';
  const label = 'Talks';
  const slug = 'talks';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return (
    <TemplateArchive
      pageClassName={styles.talks}
      title={title}
      label={label}
      posts={talks}
      slug={slug}
      metadata={metadata}
    />
  );
}

export async function getStaticProps() {
  const { talks } = await getAllTalks();

  let allTalks = talks.map((talk) => {
    const eventCount = talk.events?.length || 0;
    return {
      ...talk,
      eventCount,
      excerpt: `<p class="${styles.eventCount}">${eventCount} Events</p>`,
    };
  });

  allTalks = sortByKey(allTalks, 'title', 'desc');
  allTalks = sortByKey(allTalks, 'eventCount', 'desc');

  return {
    props: {
      talks: allTalks,
    },
  };
}
