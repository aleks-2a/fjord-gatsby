import React from 'react';
import _ from 'lodash';

import Branding from './Branding';
import Navigation from './Navigation';

import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from 'gatsby-background-image';

const Header = (props) => {
	const { defaultPlaceholderImage } = useStaticQuery(
	  graphql`
	    query {
	      defaultPlaceholderImage: file(relativePath: { eq: "header-bg.jpg" }) {
	        childImageSharp {
	          gatsbyImageData(
	            width: 1920
	            placeholder: BLURRED
	            formats: [AUTO, WEBP, AVIF]
	          )
	        }
	      }
	    }
	  `
	);
	const defaultImage = getImage(defaultPlaceholderImage);
	const defaultBgImage = convertToBgImage(defaultImage);
	//page image
	const placeholderImage = _.get(props.pageContext, 'featuredImage', null) ? _.get(props.pageContext.featuredImage.childImageSharp, 'gatsbyImageData', null) : null;
	// console.log('placeholderImage',placeholderImage)
	// console.log('-->', _.get(props.pageContext.featuredImage.childImageSharp, 'gatsbyImageData', null))
	const image = getImage(placeholderImage);
	const bgImage = convertToBgImage(image);
	return (
      <header id="masthead" className="site-header">
        {_.get(props.pageContext, 'featuredImage', null) ? (
        // <div id="header-bg" className="site-header-bg" style={toStyleObj('background-image:url(\'' + withPrefix(_.get(this.props, 'image', null)) + '\')')}/>
				<div id="header-bg" className="site-header-bg">
					<BackgroundImage
			      Tag="div"
						style={{width: '100%', height: '100%'}}
			      // Spread bgImage into BackgroundImage:
			      {...bgImage}
			      preserveStackingContext
						backgroundColor={`#212121`}
						/>
				</div>
        ) : (_.get(props, 'site.siteMetadata.header.background_img', null) && (
        // <div id="header-bg" className="site-header-bg" style={toStyleObj('background-image:url(\'' + withPrefix(_.get(this.props, 'site.siteMetadata.header.background_img', null)) + '\')')}/>
				<div id="header-bg" className="site-header-bg">
					<BackgroundImage
			      Tag="div"
						style={{width: '100%', height: '100%'}}
			      // Spread bgImage into BackgroundImage:
			      {...defaultBgImage}
			      preserveStackingContext
						backgroundColor={`#212121`}
						/>
				</div>
        ))}
        <div className="site-header-scroll">
          <div className="site-header-inside">
            <div className="site-header-vertical">
              <Branding {...props} />
              <Navigation {...props} />
            </div>
          </div>
        </div>
      </header>
  );
}

export default Header
