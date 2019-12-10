module.exports = {
    siteMetadata: {
        title: 'colbyfayock.com',
    },
    plugins: [
        'gatsby-plugin-resolve-src',
        'gatsby-plugin-sass',
        'gatsby-plugin-postcss',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/_posts`,
                name: 'markdown-pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/_talks`,
                name: 'markdown-pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/_pages`,
                name: 'markdown-pages',
            },
        },
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-plugin-google-marketing-platform',
            options: {
                dataLayer: {
                    gaPropertyId: 'UA-28076707-1',
                    gaOptimizeId: 'GTM-MF4ZKBR'
                },
                tagmanager: {
                    id: 'GTM-NJ75NM',
                    params: {
                        gtm_cookies_win: 'x'
                    }
                },
                analytics: {
                    id: 'UA-28076707-1',
                },
                optimize: {
                    id: 'GTM-MF4ZKBR',
                },
                includeInDevelopment: false,
            },
        }
    ],
};