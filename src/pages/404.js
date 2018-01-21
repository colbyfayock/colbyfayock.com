import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

const helmet_settings = {
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

                <img src="http://fay.io/content/uploads/2016/05/vader.jpg" />

            </section>

        </article>
    );

}

export default NotFoundPage;