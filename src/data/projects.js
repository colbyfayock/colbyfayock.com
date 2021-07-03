import { gql } from '@apollo/client';

export const QUERY_ALL_PROJECTS = gql`
  query AllProjects {
    projects(first: 100) {
      edges {
        node {
          content
          id
          project {
            projectUrl
          }
          slug
          title
        }
      }
    }
  }
`;

export const QUERY_PROJECT_BY_SLUG = gql`
  query ProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      content
      id
      project {
        projectUrl
      }
      slug
      title
    }
  }
`;
