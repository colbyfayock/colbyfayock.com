import React from 'react'
import Link from 'gatsby-link'

const social_links = [
    {
        title: 'Twitter',
        url: 'http://twitter.com/colbyfayock',
        icon: 'fa-twitter',
    },
    {
        title: 'Dribbble',
        url: 'http://dribbble.com/colbyfayock',
        icon: 'fa-dribbble',
    },
    {
        title: 'GitHub',
        url: 'http://github.com/colbyfayock',
        icon: 'fa-github',
    },
    {
        title: 'CodePen',
        url: 'http://codepen.io/colbyfayock',
        icon: 'fa-codepen',
    },
    {
        title: 'Email',
        url: 'mailto:hello@fay.io',
        icon: 'fa-envelope-o',
    },
]


const HeaderSocial = () => {

    return (
        <ul class="nav-social social-icons">
            {
                social_links.map((item) => {
                    return (
                        <li class={`nav-social-${item.title.toLowerCase()}`}>
                            <a href={item.url}>
                                <i class={`fa ${item.icon}`} aria-hidden="true"></i>
                                <span class="ir">{ item.title }</span>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    );

}

const Header = () => {
    return (
        <nav id="nav" class="container cf" role="navigation">

            <div class="content">

                <div class="row">
                    <div class="nav-logo">
                        <h1 class="h1">
                            <Link to="/">
                                Colby Fayock
                            </Link>
                            <span class="tagline">
                                A UX Designer &amp; Front-end Developer Blog
                            </span>
                        </h1>
                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Header
