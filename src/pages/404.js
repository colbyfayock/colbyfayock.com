import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import img_vader from '../assets/images/vader.jpg';

const helmet_settings = {
    title: 'Nooooooo... 404!',
    meta: [
        {
            name: 'description',
            content: 'Hm... this (probably) is not the page you are looking for',
        },
        {
            property: 'og:title',
            content: 'Nooooooo... 404!',
        },
        {
            property: 'og:description',
            content: 'Hm... this (probably) is not the page you are looking for',
        },
    ],
    bodyAttributes: {
        class: 'page-404',
    }
}

const NotFoundPage = () => {

    return (
        <article className="row flat-bottom" role="article" itemscope itemtype="http://schema.org/BlogPosting">

            <header className="align-center push-bottom-four">

                <h1 className="h1 flat-bottom" itemprop="headline">
                    Uh oh, <strong>404!!</strong>
                </h1>

                <p className="push-top-one">
                    Try checking the URL or head back to the <Link to="/">homepage</Link>.
                </p>

            </header>

            <section className="align-center" itemprop="articleBody">

                <img src={img_vader} />

            </section>

        </article>
    );

}

export default NotFoundPage;