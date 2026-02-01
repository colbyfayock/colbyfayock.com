import { gql } from '@apollo/client';

export const AUTHOR_FIELDS = gql`
  fragment AuthorFields on User {
    avatar {
      height
      url
      width
    }
    id
    name
    slug
  }
`;

export const CATEGORY_FIELDS = gql`
  fragment CategoryFields on Category {
    categoryId
    id
    name
    slug
  }
`;

export const MEDIA_ITEM_FIELDS = gql`
  fragment MediaItemFields on MediaItem {
    altText
    caption
    sourceUrl
    srcSet
    sizes
    id
  }
`;

export const QUERY_ALL_POSTS = gql`
  query AllPosts {
    posts(first: 100) {
      edges {
        node {
          author {
            node {
              ...AuthorFields
            }
          }
          id
          categories {
            edges {
              node {
                ...CategoryFields
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              ...MediaItemFields
            }
          }
          modified
          postId
          title
          slug
        }
      }
    }
  }
  ${AUTHOR_FIELDS}
  ${CATEGORY_FIELDS}
  ${MEDIA_ITEM_FIELDS}
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      author {
        node {
          ...AuthorFields
        }
      }
      id
      categories {
        edges {
          node {
            ...CategoryFields
          }
        }
      }
      content
      date
      excerpt
      featuredImage {
        node {
          ...MediaItemFields
        }
      }
      modified
      postId
      title
      slug
    }
  }
  ${AUTHOR_FIELDS}
  ${CATEGORY_FIELDS}
  ${MEDIA_ITEM_FIELDS}
`;

export const QUERY_POSTS_BY_CATEGORY_ID = gql`
  query PostsByCategoryId($categoryId: Int!) {
    posts(where: { categoryId: $categoryId }) {
      edges {
        node {
          author {
            node {
              ...AuthorFields
            }
          }
          id
          categories {
            edges {
              node {
                ...CategoryFields
              }
            }
          }
          content
          date
          excerpt
          featuredImage {
            node {
              ...MediaItemFields
            }
          }
          modified
          postId
          title
          slug
        }
      }
    }
  }
  ${AUTHOR_FIELDS}
  ${CATEGORY_FIELDS}
  ${MEDIA_ITEM_FIELDS}
`;

export const QUERY_POSTS_BY_AUTHOR_SLUG = gql`
  query PostByAuthorSlug($slug: String!) {
    posts(where: { authorName: $slug }) {
      edges {
        node {
          categories {
            edges {
              node {
                ...CategoryFields
              }
            }
          }
          date
          excerpt
          featuredImage {
            node {
              ...MediaItemFields
            }
          }
          id
          modified
          postId
          slug
          title
        }
      }
    }
  }
  ${CATEGORY_FIELDS}
  ${MEDIA_ITEM_FIELDS}
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query PostSEOBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;

export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`;
