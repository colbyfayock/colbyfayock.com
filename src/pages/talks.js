import usePageMetadata from 'hooks/use-page-metadata';

import { getAllTalks } from 'lib/talks';

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

  return {
    props: {
      talks: talks.map((talk) => {
        console.log('talk', talk);
        return {
          ...talk,
          excerpt:
            talk.events.length > 0 && `<ul><li>${talk.events.map(({ title }) => title).join('</li><li>')}</li></ul>`,
        };
      }),
    },
  };
}
