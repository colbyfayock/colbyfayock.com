import React from 'react';

const RedbubbleLogo = () => {
  return (
    <svg enableBackground="new 0 0 16 16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <filter id="a" filterUnits="userSpaceOnUse" height="16" width="16" x="0" y="0">
        <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/>
      </filter>
      <mask id="b" height="16" maskUnits="userSpaceOnUse" width="16" x="0" y="0">
        <g filter="url(#a)">
          <path d="m16 16h-16v-16h16z" fill="#fff"/>
        </g>
      </mask>
      <path d="m11.1 10.9h-2.1c-.1 0-.2-.1-.2-.2v-5.4c0-.1.1-.2.2-.2h2c1.5 0 1.8.9 1.8 1.6 0 .4-.1.8-.3 1 .5.2.8.7.8 1.5-.1 1-.9 1.7-2.2 1.7m-3.1 0h-4.4c-.1 0-.2-.1-.2-.2v-5.4c0-.1.1-.2.2-.2h2.1c1.3 0 2.1.7 2.1 1.9 0 .8-.4 1.4-1 1.6l1.5 1.9.1.1c-.2.2-.3.3-.4.3m0-10.9c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8" mask="url(#b)"/>
    </svg>
  )
}

export default RedbubbleLogo;