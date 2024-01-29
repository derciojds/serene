'use client';

import { SectionDesc } from '@/components/section-description';
import { Testimonial } from '@/components/testmonial';
import { useDimensions } from '@/hooks/useDimensions';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from '../home.module.scss';

export function Testmonials() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { height } = useDimensions();

  const columnYTransfrom = [
    useTransform(scrollYProgress, [0, 1], [0, height * 2]),
    useTransform(scrollYProgress, [0, 1], [0, height * 3.3]),
    useTransform(scrollYProgress, [0, 1], [0, height * 1.25]),
  ];
  return (
    <section className={styles.testimonials}>
      <SectionDesc.root align="center">
        <SectionDesc.title text="Happy Customers" />
        <SectionDesc.paragraph text="What are people saying about us" />
      </SectionDesc.root>

      <div ref={containerRef} className={styles.testimonialContainer}>
        <motion.div
          style={{ y: columnYTransfrom[0] }}
          className={styles.column}
        >
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </motion.div>
        <motion.div
          style={{ y: columnYTransfrom[1] }}
          className={styles.column}
        >
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </motion.div>
        <motion.div
          style={{ y: columnYTransfrom[2] }}
          className={styles.column}
        >
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </motion.div>
      </div>
    </section>
  );
}
