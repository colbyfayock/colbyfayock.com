import React from 'react';
import { FaAt } from 'react-icons/fa';

import IconLike from 'components/IconLike';
import IconRetweet from 'components/IconRetweet';

const Webmentions = ({ mentions = [] }) => {
  if ( !Array.isArray(mentions) ) return null;
  return (
    <ul className="webmentions">
      { mentions.map((mention = {}) => {
        const { id, author = {}, url, likeOf, mentionOf, repostOf } = mention;
        const authorImageStyles = {
          backgroundImage: `url(${author?.photo})`
        }
        let icon = null;
        if ( likeOf ) {
          icon = <IconLike />;
        } else if ( repostOf ) {
          icon = <IconRetweet />;
        } else if ( mentionOf ) {
          icon = <FaAt />;
        }
        return (
          <li className="webmentions-mention" key={id}>
            <a href={url}>
              { icon }
              <span className="webmentions-mention-author-image" style={authorImageStyles}>
                <span className="visually-hide">{ author?.name }</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default Webmentions;