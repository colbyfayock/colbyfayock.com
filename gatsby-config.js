module.exports = {
    siteMetadata: {
        title: 'colbyfayock.com',
    },
    plugins: [
        'gatsby-plugin-netlify-cms',
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
                path: `${__dirname}/src/_pages`,
                name: 'markdown-pages',
            },
        },
        'gatsby-transformer-remark'
    ],
};
