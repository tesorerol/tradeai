import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 821 },
    items: 3,
  },
  ipad: {
    breakpoint: { max: 820, min: 520 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 520, min: 0 },
    items: 2,
  },
};

const SectionCarousel= ({ children }) => {
  const CarouselView= Carousel;

  return (
    <CarouselView responsive={responsive} itemClass="card-slide" shouldResetAutoplay={false} draggable={false}>
      {children}
    </CarouselView>
  );
};

export default SectionCarousel;
