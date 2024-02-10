'use client';

import { SectionDesc } from '@/components/section-description';
import { cn } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../home.module.scss';

export function Ingredients() {
  const [position, setPosition] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(position + 1);
      if (position === 2) {
        setPosition(0);
      }
    }, 3 * 1000);

    return () => clearInterval(interval);
  });

  return (
    <section className={styles.ingredients}>
      <SectionDesc.root>
        <SectionDesc.caption text="Ingredients" />
        <SectionDesc.title
          text={`What makes Us
            <span class="gradient-text"> Diferent</span>`}
        />
      </SectionDesc.root>
      <div className={styles.presentation}>
        <div className={styles.indicators}>
          <RingImage
            image="/images/ingredient01.jpg"
            className={position === 0 ? styles.active : ''}
          />
          <RingImage
            image="/images/ingredient02.jpg"
            className={position === 1 ? styles.active : ''}
          />
          <RingImage
            image="/images/ingredient03.jpg"
            className={position === 2 ? styles.active : ''}
          />
        </div>
        <div className={styles.slide}>
          <div className={styles.slideImage}>
            <Image
              width={655}
              height={614}
              alt="woman smelling perfume"
              src="/images/presentation.jpg"
              className={position === 0 ? styles.active : ''}
            />
            <Image
              width={655}
              height={614}
              alt="woman smelling perfume"
              src="/images/pexels-photo-1895015.webp"
              className={position === 1 ? styles.active : ''}
            />
            <Image
              width={655}
              height={614}
              alt="woman smelling perfume"
              src="/images/pexels-photo-4202325.webp"
              className={position === 2 ? styles.active : ''}
            />
          </div>
          <p className={cn(styles.slideText, 'fs-h3')}>
            <span className={position === 0 ? styles.active : ''}>
              {' '}
              Perfumes crafted using a symphony of rare and exquisite
              ingredients sourced from the corners of the globe.
            </span>
            <span className={position === 1 ? styles.active : ''}>
              {' '}
              At the heart of every Serene fragrance lies a meticulously curated
              selection of the finest botanicals and minerals.
            </span>
            <span className={position === 2 ? styles.active : ''}>
              {' '}
              Our perfumers weave together opulent blooms, precious woods, and
              rare accords, creating signature fragrances that embody
              sophistication and allure.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function RingImage({
  image,
  className,
}: {
  image: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Image width={120} height={120} src={image} alt="vanila"></Image>
      <svg
        width={128}
        height={128}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect
          x={2}
          y={2}
          width={124}
          height={124}
          rx={62}
          fill="url(#pattern0)"
          stroke="url(#paint0_linear_188_841)"
          strokeWidth={4}
          strokeDasharray="390"
          strokeDashoffset="390"
        />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          ></pattern>
          <linearGradient
            id="paint0_linear_188_841"
            x1={-3.5}
            y1={59.5}
            x2={131.5}
            y2={64}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9747FF" />
            <stop offset={1} stopColor="#DEA2F3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
