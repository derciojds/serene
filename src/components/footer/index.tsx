'use client';

import { cn } from '@/utils';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Logo, ScrollTop } from '../Icons';
import { Button } from '../button';
import styles from './footer.module.scss';

export function Footer() {
  const footerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start start', 'end 100vh'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-180, 0]);

  useEffect(() => {
    if (scrollTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return setScrollTop(false);
    }
  }, [scrollTop]);

  return (
    <footer
      ref={footerRef}
      className={cn(styles.footer, 'theme-dark', 'footer')}
    >
      <div className={styles.footerSpacer}></div>
      <div className={cn(styles.footerContent, 'container-narrow')}>
        <div className={styles.footerPadding}></div>
        <motion.button
          onClick={() => setScrollTop(true)}
          className={styles.scollTopBtn}
          type="button"
          style={{ rotate }}
        >
          <ScrollTop />
        </motion.button>
        <motion.picture
          className={styles.logo}
          style={{
            y,
            opacity: useSpring(scrollYProgress),
          }}
        >
          <Logo />
        </motion.picture>
        <section className={styles.content}>
          <nav className={styles.nav}>
            <div>
              <h3>About</h3>
              <ul>
                <li>
                  <Link href="#">About</Link>
                </li>
                <li>
                  <Link href="#">Team</Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>
              <ul>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">Support</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div>
            <Button.root variant="secondary" size="sm" element="button">
              <Button.content text="English" />
              <Button.icon icon={ChevronDown} />
            </Button.root>
          </div>
        </section>
        <section className={styles.copyright}>
          <p>© {`${new Date().getFullYear()}`} All rights reserved.</p>
          <p>
            Made with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span>{' '}
            by{' '}
            <a href="#" target="_blank" rel="noreferrer">
              Dercio JdS
            </a>{' '}
            •{' '}
            <a href="#" target="_blank" rel="noreferrer">
              Source code
            </a>
          </p>
        </section>
        <div className={styles.footerPadding}></div>
      </div>
    </footer>
  );
}
