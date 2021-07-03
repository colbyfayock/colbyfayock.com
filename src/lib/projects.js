import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_PROJECTS, QUERY_PROJECT_BY_SLUG } from 'data/projects';

const PREFIX = '[Projects]';

/**
 * getProjectBySlug
 */

export async function getProjectBySlug(slug) {
  const apolloClient = getApolloClient();

  let projectData;

  try {
    projectData = await apolloClient.query({
      query: QUERY_PROJECT_BY_SLUG,
      variables: {
        slug,
      },
    });
  } catch (e) {
    console.log(`${PREFIX}[getProjectBySlug] Failed to query data: ${e.message}`);
    throw e;
  }

  const project = [projectData?.data.project].map(mapProjectData)[0];

  return {
    project,
  };
}

/**
 * getAllProjects
 */

export async function getAllProjects() {
  const apolloClient = getApolloClient();

  let projectData;

  try {
    projectData = await apolloClient.query({
      query: QUERY_ALL_PROJECTS,
    });
  } catch (e) {
    console.log(`${PREFIX}[getAllProjects] Failed to query data: ${e.message}`);
    throw e;
  }

  const projects = projectData?.data.projects.edges.map(({ node = {} }) => node);

  return {
    projects: Array.isArray(projects) && projects.map(mapProjectData),
  };
}

/**
 * mapProjectData
 */

export function mapProjectData(project = {}) {
  const data = {
    ...project,
    ...project.project,
  };

  return data;
}
