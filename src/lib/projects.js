import { fetchAPI } from 'lib/api';

export async function getAllProjects() {
  const query = `
    query AllProjects {
      projects(first: 100) {
        edges {
          node {
            id
            title
            slug
            content
            date
            featuredImage {
              node {
                altText
                caption
                sourceUrl
              }
            }
            project {
              projectUrl
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const projects =
    data?.projects?.edges?.map(({ node }) => {
      const project = { ...node };
      if (project.featuredImage?.node) {
        project.featuredImage = project.featuredImage.node;
      }
      project.projectUrl = node.project?.projectUrl;
      return project;
    }) || [];

  return { projects };
}
