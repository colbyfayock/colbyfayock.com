export const QUERY_SITE_DATA = `
  {
    generalSettings {
      description,
      language,
      title
    }
  }
`;

export const QUERY_SEO_DATA = `
  {
    seo {
      webmaster {
        yandexVerify,
        msVerify,
        googleVerify,
        baiduVerify
      },
      social {
        youTube {
          url
        },
        wikipedia {
          url
        },
        twitter {
          username,
          cardType
        },
        pinterest {
          metaTag,
          url
        },
        mySpace {
          url
        },
        linkedIn {
          url
        },
        instagram {
          url
        },
        facebook {
          url,
          defaultImage {
            altText,
            sourceUrl,
            mediaDetails {
              height,
              width
            }
          }
        }
      }
    }
  }
`;
