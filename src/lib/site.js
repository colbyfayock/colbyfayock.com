import { fetchAPI } from './api';

export async function getSiteMetadata() {
  const query = `
    query SiteMetadata {
      generalSettings {
        title
        description
        language
      }
    }
  `;

  try {
    const data = await fetchAPI(query);
    const { generalSettings } = data || {};
    let { title, description, language } = generalSettings || {};

    const settings = {
      title,
      siteTitle: title,
      description,
      url: process.env.WORDPRESS_SITE_URL || process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com',
    };

    if (!language || language === '') {
      settings.language = 'en';
    } else {
      settings.language = language.split('_')[0];
    }

    settings.title = title;

    return settings;
  } catch (e) {
    console.log(`[site][getSiteMetadata] Failed to query site data: ${e.message}`);
    // Return default metadata if API fails
    return {
      title: 'Colby Fayock',
      siteTitle: 'Colby Fayock',
      description: "Colby Fayock's website",
      url: process.env.NEXT_PUBLIC_HOME_URL || 'https://colbyfayock.com',
      language: 'en',
    };
  }
}
