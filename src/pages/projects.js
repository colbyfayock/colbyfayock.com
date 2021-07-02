import usePageMetadata from 'hooks/use-page-metadata';

import { getAllProjects } from 'lib/projects';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts }) {
  const title = 'All Projects';
  const label = 'Projects';
  const slug = 'projects';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} label={label} posts={posts} slug={slug} metadata={metadata} />;
}

export async function getStaticProps() {
  const { projects } = await getAllProjects();
  return {
    props: {
      posts: projects,
    },
  };
}
