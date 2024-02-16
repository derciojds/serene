'use client';

import { Children, ReactNode, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

interface Props extends React.ComponentProps<typeof Swiper> {
  children: ReactNode;
}

const values = {
  mobile: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  tablet: {
    slidesPerView: 3,
    spaceBetween: 18,
  },
  desktop: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
};

export function ProductsSwiper({ children, ...props }: Props) {
  const [breakpoint, setBreakpoint] = useState(values.desktop);
  const { spaceBetween, slidesPerView } = breakpoint;

  useEffect(() => {
    function checkMedia() {
      const mql1 = window.matchMedia('(max-width: 700px)').matches;
      const mql2 = window.matchMedia('(max-width: 1020px)').matches;

      if (mql1) {
        setBreakpoint(values.mobile);
      } else if (mql2) {
        setBreakpoint(values.tablet);
      } else {
        setBreakpoint(values.desktop);
      }
    }

    checkMedia();

    window.addEventListener('resize', checkMedia);
    return () => {
      window.removeEventListener('resize', checkMedia);
    };
  });

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      {...props}
    >
      {Children.map(children, (child) => {
        return <SwiperSlide>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
}
