import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {withPrefix, attribute} from '../utils';
  import "@fontsource/gothic-a1";
  import '../sass/main.scss';

import { getSrc } from "gatsby-plugin-image";

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.seo.title', null) ? (_.get(this.props, 'pageContext.frontmatter.seo.title', null)) : _.get(this.props, 'pageContext.frontmatter.title', null) + ' | ' + _.get(this.props, 'pageContext.site.siteMetadata.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.seo.description', null) || ''} />
                    {_.get(this.props, 'pageContext.frontmatter.seo.robots', null) && (
                    <meta name="robots" content={_.join(_.get(this.props, 'pageContext.frontmatter.seo.robots', null), ',')}/>
                    )}
                    {_.map(_.get(this.props, 'pageContext.frontmatter.seo.extra', null), (meta, meta_idx) => {
                        let key_name = _.get(meta, 'keyName', null) || 'name';
                        return (
                          _.get(meta, 'relativeUrl', null) ? (
                            process.env.GATSBY_SITE_URL && ((() => {
                                let placeholderImage = null;
                                if(_.get(meta, 'name', null) === 'og:image' && _.get(meta, 'value', null) === 1){
                                  placeholderImage = _.get(this.props, 'pageContext.og_image', null) ? _.get(this.props.pageContext.og_image.childImageSharp, 'gatsbyImageData', null) : null;
                                }
                                if(_.get(meta, 'name', null) === 'twitter:image'  && _.get(meta, 'value', null) === 1){
                                  placeholderImage = _.get(this.props, 'pageContext.twitter_image', null) ? _.get(this.props.pageContext.twitter_image.childImageSharp, 'gatsbyImageData', null) : null;
                                }
                                if(placeholderImage){
                                  let image = getSrc(placeholderImage);
                                  let domain = process.env.GATSBY_SITE_URL;
                                  let rel_url = image;
                                  let full_url = domain + rel_url;
                                  return (
                                    <meta key={meta_idx} {...(attribute(key_name, _.get(meta, 'name', null)))} content={full_url}/>
                                  );
                                }
                            })())
                          ) :
                            <meta key={meta_idx + '.1'} {...(attribute(key_name, _.get(meta, 'name', null)))} content={_.get(meta, 'value', null)}/>
                        )
                    })}
                    {_.get(this.props, 'pageContext.site.siteMetadata.favicon', null) && (
                    <link rel="icon" href={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.favicon', null))}/>
                    )}
                    <body className={'palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette', null)} />
                </Helmet>
                <div id="page" className="site">
                  {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}
