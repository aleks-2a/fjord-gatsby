if (process.env.GATSBY_ACTIVE_ENV) {
  require("dotenv").config({
    path: `.env.${process.env.GATSBY_ACTIVE_ENV}`,
  })
} else {
  require("dotenv").config({
    path: `.env.local`,
  })
}
const siteMetadata = require('./site-metadata.json');

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
				`gatsby-plugin-image`,
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
          resolve: "gatsby-plugin-sass",
          // options: {
          //   useResolveUrlLoader: {
          //     options: {
          //       sourceMap: true, //default is false
          //       debug: true,
          //     },
          //   },
          // },
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
