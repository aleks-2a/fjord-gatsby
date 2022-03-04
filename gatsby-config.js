const siteMetadata = require('./site-metadata.json')

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
				`gatsby-plugin-sharp`,
				{
					resolve: `gatsby-transformer-remark`,
					options: {
						plugins: [
							{
								resolve: `gatsby-remark-images`,
								options: {
									maxWidth: 1920
								},
							},
						],
					},
				},
				`gatsby-transformer-sharp`,
				{
					resolve: `gatsby-source-filesystem`,
					options: {
						name: `images`,
						path: `${__dirname}/src/images`,
					}
				},
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            }
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {}
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        }
    ]
};
