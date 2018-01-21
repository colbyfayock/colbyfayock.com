import React from 'react';

import FaTwitter from 'react-icons/lib/fa/twitter';
import FaDribbble from 'react-icons/lib/fa/dribbble';
import FaGithub from 'react-icons/lib/fa/github';
import FaCodepen from 'react-icons/lib/fa/codepen';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';

const SocialIconsList = ({links}) => {

    if ( !Array.isArray(links) ) return null;

    return links.map((item, index) => {
        return (
            <li key={`SocialIconsList-${index}`} className={`social-icons-${item.title.toLowerCase()}`}>
                <a href={item.url}>
                    { item.icon }
                    <span className="ir">{ item.title }</span>
                </a>
            </li>
        );
    });

}

const SocialIcons = () => {

    const social_links = [
        {
            title: 'Twitter',
            url: 'http://twitter.com/colbyfayock',
            icon: <FaTwitter />,
        },
        {
            title: 'Dribbble',
            url: 'http://dribbble.com/colbyfayock',
            icon: <FaDribbble />,
        },
        {
            title: 'GitHub',
            url: 'http://github.com/colbyfayock',
            icon: <FaGithub />,
        },
        {
            title: 'CodePen',
            url: 'http://codepen.io/colbyfayock',
            icon: <FaCodepen />,
        },
        {
            title: 'Email',
            url: 'mailto:hello@fay.io',
            icon: <FaEnvelopeO />,
        },
    ];

    return (
        <ul className="social-icons">
            <SocialIconsList links={social_links} />
        </ul>
    );

}

export default SocialIcons;