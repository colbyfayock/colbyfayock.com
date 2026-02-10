import { getAllProjects } from 'lib/projects';
import { getSiteMetadata } from 'lib/site';

import TemplateArchive from 'templates/archive';

export const revalidate = 60;

export async function generateMetadata() {
  const metadata = await getSiteMetadata();
  return {
    title: 'All Projects',
    description: `Projects at ${metadata.title}`,
  };
}

export default async function ProjectsPage() {
  const { projects } = await getAllProjects();
  const metadata = await getSiteMetadata();

  const title = 'All Projects';
  const label = 'Projects';
  const slug = 'projects';

  return (
    <TemplateArchive
      title={title}
      label={label}
      posts={projects}
      slug={slug}
      metadata={{
        title,
        description: `Projects at ${metadata.title}`,
      }}
    />
  );
}
