import React from 'react';

import FaTwitter from 'react-icons/lib/fa/twitter';
import FaDribbble from 'react-icons/lib/fa/dribbble';
import FaGithub from 'react-icons/lib/fa/github';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';

const SocialIconsList = ({links}) => {

    if ( !Array.isArray(links) ) return null;

    const link_items = links.map((item, index) => {
        return (
            <li key={`SocialIconsList-${index}`} className={`social-icons-${item.title.toLowerCase()}`}>
                <a href={item.url}>
                    { item.icon }
                    <span className="ir">{ item.title }</span>
                </a>
            </li>
        );
    });

    return (
        <div>
            { link_items }
        </div>
    )

}

const SocialIcons = () => {

    const social_links = [
        {
            title: 'Twitter',
            url: 'http://twitter.com/colbyfayock',
            icon: <FaTwitter />,
        },
        {
            title: 'Instagram',
            url: 'https://www.instagram.com/colbyfayock/',
            icon: <FaInstagram />,
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
            title: 'Email',
            url: 'mailto:hello@colbyfayock.com',
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