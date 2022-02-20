/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 //Sourcemap not working via gatsby-config.js - workaround (https://github.com/gatsbyjs/gatsby/issues/32214#issuecomment-877418950)
 exports.onCreateWebpackConfig = ({ stage, actions }) => {
   if (stage === "develop"){
     actions.setWebpackConfig({
       devtool: `cheap-module-source-map`
     });
   }
 };
