'use client';

import { useDimensions } from '@/hooks/useDimensions';
import { cn } from '@/utils';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './header.module.scss';

const toggleNavVariants = {
  show: { opacity: 1, y: 0 },
  hide: { opacity: 0, y: '-100%' },
};

export function NavRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [colorsAreInveted, setColorsAreInveted] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);
  const [isInHero, setIsInHero] = useState(true);

  const mainRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const { height } = useDimensions();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setShowNavigation(false);
    } else {
      setShowNavigation(true);
    }

    if (latest > previous && latest > height) {
      setIsInHero(false);
    } else if (latest < previous && latest < height) {
      setIsInHero(true);
    }
  });

  useEffect(() => {
    if (pathname === '/' && isInHero) setColorsAreInveted(true);
    else setColorsAreInveted(false);

    mainRef.current = document.querySelector('#main');
  }, [pathname, isInHero]);

  return (
    <motion.header
      variants={toggleNavVariants}
      animate={showNavigation ? 'show' : 'hide'}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
      className={cn(styles.header, `${colorsAreInveted ? 'theme-dark' : ''}`)}
    >
      <div
        style={{
          display: colorsAreInveted ? 'none' : 'block',
        }}
        className={styles.background}
      ></div>
      {children}
    </motion.header>
  );
}
