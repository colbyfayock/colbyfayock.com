import { fetchAPI } from 'lib/api';

export async function getAllPodcasts() {
  const query = `
    query AllPodcasts {
      podcasts(first: 100) {
        edges {
          node {
            id
            title
            slug
            date
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  const podcasts =
    data?.podcasts?.edges?.map(({ node }) => {
      const podcast = { ...node };
      if (podcast.featuredImage?.node) {
        podcast.featuredImage = podcast.featuredImage.node;
      }
      return podcast;
    }) || [];

  return { podcasts };
}

export async function getPodcastBySlug(slug) {
  const query = `
    query PodcastBySlug($slug: ID!) {
      podcast(id: $slug, idType: SLUG) {
        id
        title
        slug
        content
        date
        featuredImage {
          node {
            altText
            sourceUrl
            caption
          }
        }
        podcast {
          datePublished
        }
      }
    }
  `;

  const data = await fetchAPI(query, { slug });

  if (!data?.podcast) {
    return { podcast: undefined };
  }

  const podcast = { ...data.podcast };
  if (podcast.featuredImage?.node) {
    podcast.featuredImage = podcast.featuredImage.node;
  }
  podcast.datePublished = podcast.podcast?.datePublished;
  delete podcast.podcast;

  return { podcast };
}
