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
