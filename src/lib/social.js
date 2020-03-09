const twitterTweetIntent = 'https://twitter.com/intent/tweet';

export function createTweetAction({ message = [], } = {}) {
  message = message.map(m => encodeURIComponent(m));
  message = message.join('%0A')
  return `${twitterTweetIntent}?text=${message}`;
}

export function openTweet({ message }) {
  window.open(message, 'share-twitter', 'width=550, height=235');
}