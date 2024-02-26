'use client';

import { Image as TImage } from '@/lib/shopify/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './productInfo.module.scss';

export function Gallery({ images }: { images: TImage[] }) {
  const sliderContainerRef = useRef<HTMLUListElement>(null);
  const lastSlideRef = useRef<HTMLLIElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(1);
  const [isClickEvent, setIsClickEvent] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    const sliderContainer = sliderContainerRef.current;
    const lastSliderImage = lastSlideRef.current;

    const AllThumbnails = document.querySelectorAll('#thumbnails > li');
    const AllSlides = document.querySelectorAll('#slider > li');

    const currentSlide = AllSlides[currentSlideIndex] as HTMLElement;
    const currentThumb = AllThumbnails[currentSlideIndex] as HTMLElement;

    if (currentSlide !== null) {
      sliderContainer?.scrollTo({
        top: currentSlide.offsetTop,
        left: currentSlide.offsetLeft,
        behavior: 'smooth',
      });
    }

    const handleResize = () => {
      markerPositionCalculator({ marker, currentThumb });

      if (sliderContainer && lastSliderImage) {
        const marginBottom =
          Number(sliderContainer.offsetHeight) - Number(lastSliderImage.offsetHeight);

        lastSliderImage.style.marginBottom = marginBottom + 'px';
      }
    };

    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sliderContainerRef, lastSlideRef, currentSlideIndex]);

  const handleSliderScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const rightPosition = Math.floor(target.scrollTop / (lastSlideRef?.current?.clientHeight || 1));
    const leftPosition = Math.floor(target.scrollLeft / (lastSlideRef?.current?.clientWidth || 1));

    const index = rightPosition || leftPosition;

    if (index !== currentMarkerIndex && !isClickEvent) {
      const currentThumb = document.querySelectorAll('#thumbnails > li')[index] as HTMLElement;
      const marker = markerRef.current;

      setCurrentMarkerIndex(index);
      markerPositionCalculator({ marker, currentThumb });
    } else if (index === currentMarkerIndex) {
      setIsClickEvent(false);
    }
  };

  const markerPositionCalculator = ({
    marker,
    currentThumb,
  }: {
    marker: HTMLDivElement | null;
    currentThumb: HTMLElement;
  }) => {
    if (marker && currentThumb) {
      const thumbValues = {
        width: currentThumb.offsetWidth,
        height: currentThumb.offsetHeight,
        left: currentThumb.offsetLeft,
        top: currentThumb.offsetTop,
      };

      const padding = 8;

      marker.style.cssText = `
        display: block;
        left: ${thumbValues.left - padding / 2}px;
        top: ${thumbValues.top - padding / 2}px;
        width: ${thumbValues.width + padding}px;
        height: ${thumbValues.height + padding}px;
      `;
    }
  };

  return (
    <div className={styles.gallery}>
      <ul className={styles.thumbnails} id="thumbnails">
        <div ref={markerRef} className={styles.marker}></div>
        {images.map((image, index) => (
          <li key={image.url}>
            <div>
              <span>
                <input
                  onClick={() => {
                    setIsClickEvent(true);
                    setCurrentSlideIndex(index);
                  }}
                  type="submit"
                  value=""
                  title="Product thumbnail"
                />
                <span>
                  <Image width={116} height={116} src={image.url} alt={image.altText} />
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <ul
        id="slider"
        className={styles.slider}
        ref={sliderContainerRef}
        onScroll={handleSliderScroll}
      >
        {images.map((image, index) => {
          const isLastImage = index === images.length - 1;

          return (
            <li ref={isLastImage ? lastSlideRef : null} key={image.url}>
              <div>
                <Image
                  draggable={false}
                  src={image.url}
                  alt={image.altText}
                  width={520}
                  height={600}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
