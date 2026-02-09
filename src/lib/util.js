/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

/**
 * removeLastTrailingSlash
 */

export function removeLastTrailingSlash(url) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export function removeExtraSpaces(text) {
  if (typeof text !== 'string') return;
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * sortByKey
 * @description Sort the given array by the object key
 */

export function sortByKey(array = [], key, type = 'asc') {
  function compare(a, b) {
    let keyA = a[key];
    let keyB = b[key];

    if (typeof keyA === 'string') {
      keyA = keyA.toLowerCase();
    }

    if (typeof keyB === 'string') {
      keyB = keyB.toLowerCase();
    }

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  }

  let newArray = [...array];

  if (typeof key !== 'string') return newArray;

  newArray = newArray.sort(compare);

  if (type === 'desc') {
    return newArray.reverse();
  }

  return newArray;
}

/**
 * getUrlParamsFromString
 */

export function getUrlParamsFromString(string) {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    throw new Error(`Failed to get URL params from string: ${e.message}`);
  }

  const params = new URLSearchParams(url.search);

  return Array.from(params.keys()).map((key) => {
    return {
      key,
      value: params.get(key),
    };
  });
}

/**
 * extractYouTubeVideoId
 * @description Extract YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeVideoId(url) {
  if (typeof url !== 'string') return null;

  // Match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * processContentWithEmbeds
 * @description Process HTML content and convert YouTube URLs to responsive iframe embeds
 */
export function processContentWithEmbeds(content) {
  if (typeof content !== 'string') return content;

  // Pattern to match figure elements containing YouTube URLs as plain text
  // This handles WordPress blocks that show YouTube URLs instead of embeds
  const figurePattern =
    /<figure[^>]*>(\s*<div[^>]*>)?(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})[^<]*)(<\/div>)?(\s*<\/figure>)/gi;

  let processed = content.replace(figurePattern, (match, preDiv, url, videoId) => {
    if (!videoId) return match;

    return `<figure class="video-embed">
      <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          title="YouTube video"
        ></iframe>
      </div>
      <figcaption><a href="${url}" rel="noopener" target="_blank">View on YouTube</a></figcaption>
    </figure>`;
  });

  // Also handle bare YouTube URLs that might appear in paragraphs or divs
  const bareUrlPattern =
    /(<(?:p|div)[^>]*>)\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})[^\s<]*)\s*(<\/(?:p|div)>)/gi;

  processed = processed.replace(bareUrlPattern, (match, openTag, url, videoId, closeTag) => {
    if (!videoId) return match;

    return `<figure class="video-embed">
      <div class="video-embed-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          title="YouTube video"
        ></iframe>
      </div>
      <figcaption><a href="${url}" rel="noopener" target="_blank">View on YouTube</a></figcaption>
    </figure>`;
  });

  return processed;
}
