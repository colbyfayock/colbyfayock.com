import { useStaticQuery, graphql } from 'gatsby';

export default function useNodes() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: {
          fields: [frontmatter___date],
          order: DESC
        }
      )
      {
        edges {
          node {
            excerpt
            frontmatter {
              template
              title
              date(formatString: "DD MMMM, YYYY")
              category
              video
              video_embed
              slides
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { allMarkdownRemark = {} } = data || {};
  const { edges: nodes = [] } = allMarkdownRemark;

  return nodes;
}