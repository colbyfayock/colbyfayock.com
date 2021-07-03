const twitterTweetIntent = 'https://twitter.com/intent/tweet';

/**
 * createTweetAction
 */

export function createTweetAction({ message = [] } = {}) {
  message = message.map((m) => encodeURIComponent(m));
  message = message.join('%0A');
  return `${twitterTweetIntent}?text=${message}`;
}

/**
 * openTweet
 */

export function openTweet({ message }) {
  window.open(message, 'share-twitter', 'width=550, height=235');
}
