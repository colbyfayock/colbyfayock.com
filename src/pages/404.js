import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';

import img_vader from '../assets/images/vader.jpg';

const helmet_settings = {
    title: 'Nooooooo... 404! - Colby Fayock',
    meta: [
        {
            name: 'description',
            content: 'Hm... this (probably) is not the page you are looking for',
        },
        {
            property: 'og:title',
            content: 'Nooooooo... 404! - Colby Fayock',
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

const NotFoundPage = ({location}) => {

    return (
        <Layout location={location}>
            <article className="row flat-bottom" itemscope itemType="http://schema.org/BlogPosting">

                <Helmet {...helmet_settings} />

                <header className="align-center push-bottom-four">

                    <h1 className="h1 flat-bottom" itemProp="headline">
                        Uh oh, <strong>404!!</strong>
                    </h1>

                    <p className="push-top-one">
                        Try checking the URL or head back to the <Link to="/">homepage</Link>.
                    </p>

                </header>

                <section className="align-center" itemProp="articleBody">

                    <img src={img_vader} alt="Darth Vader screaming Noooooo!" />

                </section>

            </article>
        </Layout>
    );

}

export default NotFoundPage;