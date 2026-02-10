'use client';

import { useInView } from 'react-intersection-observer';

import { createTweetAction, openTweet } from 'lib/social';
import Button from 'components/Button';

export default function TwitterShareButton({ eventNote }) {
  const { ref } = useInView({
    triggerOnce: true,
  });

  const twitterAction = createTweetAction({
    message: eventNote.talk?.title
      ? [
          "Just checked out @colbyfayock's talk:",
          '',
          eventNote.talk.title,
          '',
          'Slides and resources below',
          '',
          typeof window !== 'undefined' ? window.location.href : '',
        ]
      : [
          `Just checked out @colbyfayock's at ${eventNote.title}`,
          '',
          'Slides and resources below',
          '',
          typeof window !== 'undefined' ? window.location.href : '',
        ],
  });

  function handleOnTwitterClick(e) {
    e.preventDefault();
    openTweet({
      message: twitterAction,
    });
  }

  return (
    <span ref={ref}>
      <Button onClick={handleOnTwitterClick}>Share a Tweet</Button>
    </span>
  );
}
