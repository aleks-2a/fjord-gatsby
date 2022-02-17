import React from 'react';
import _ from 'lodash';

import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

import { getImage, GatsbyImage } from "gatsby-plugin-image";

const Slideshow = ({slideshowDatas}) => {

    const properties = {
      duration: 5000,
      transitionDuration: 1000,
      easing:'ease',
      infinite: true,
      indicators: true,
      pauseOnHover: true,
      prevArrow: <div/>,
      nextArrow: <div/>
    };

    return (
      <div className="slide-container">
        {_.get(slideshowDatas, 'title', null) && (
          <p className="post-subtitle">{_.get(slideshowDatas, 'title', null)}</p>
        )}
        {_.get(slideshowDatas, 'text_before', null) && (
          <p className="text_before">{_.get(slideshowDatas, 'text_before', null)}</p>
        )}
        <Slide {...properties}>
         {slideshowDatas.datas.map((slideImage, index)=> {
           const placeholderImage = _.get(slideImage, 'image', null) ? _.get(slideImage.image.childImageSharp, 'gatsbyImageData', null) : null;
           const image = getImage(placeholderImage);
           const imageAlt = _.get(slideImage, 'alt', null);
           console.log(slideImage);
           return (
            <div className="each-slide" key={index}>
              <div>
                <GatsbyImage image={image} alt={imageAlt} />
              </div>
            </div>
          )})}
        </Slide>
        {_.get(slideshowDatas, 'text_after', null) && (
          <div className="text_after">{_.get(slideshowDatas, 'text_after', null)}</div>
        )}
      </div>
    )
}

export default Slideshow;
