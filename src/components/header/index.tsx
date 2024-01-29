'use client';

import { useDimensions } from '@/hooks/useDimensions';
import { cn } from '@/utils';
import * as Collapsible from '@radix-ui/react-collapsible';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType, useEffect, useRef, useState } from 'react';
import { Logo, Menu, Search, ShoppingBag, User } from '../Icons';
import { Button } from '../button';
import styles from './header.module.scss';

interface NavButtonsProp {
  icon: ElementType;
  title: string;
  onClick?: () => void;
}

const navLinks = [
  {
    name: 'Shop',
    url: '/shop',
  },
  {
    name: 'About Us',
    url: '/about',
  },
  {
    name: 'Blog',
    url: '/blog',
  },
  {
    name: 'Terms',
    url: '/terms',
  },
];

const toggleNavVariants = {
  show: { opacity: 1, y: 0 },
  hide: { opacity: 0, y: '-100%' },
};

export function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
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
      // OUTSIDE THE HERO SECTION
    } else if (latest < previous && latest < height) {
      setIsInHero(true);
      // 📥 INSIDE THE HERO SECTION
    }
  });

  const pathname = usePathname();

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
        style={{ display: colorsAreInveted ? 'none' : 'block' }}
        className={styles.background}
      ></div>
      <div className={cn('container', styles.navContainer)}>
        <nav className="hide-on-mobile">
          <ul className={styles.navItems}>
            {navLinks.map((link, i) => (
              <li className="item" key={`id_${i}`}>
                <Link className={'fs-button'} href={link.url}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.logo}>
          <Link
            className={styles.logoLink}
            aria-label="Home"
            title="Home"
            href="/"
          >
            <Logo />
          </Link>
        </div>
        <nav>
          <ul className={styles.navItems}>
            <li>
              <NavButton icon={Search} title={'search products'} />
            </li>
            <li className="hide-on-mobile">
              <NavButton icon={User} title={'login'} />
            </li>
            <li>
              <NavButton icon={ShoppingBag} title={'shopping bag'} />
            </li>
            <div>
              <MobileMenu />
            </div>
          </ul>
        </nav>
      </div>
    </motion.header>
  );

  function MobileMenu() {
    return (
      <Collapsible.Root open={mobileMenuIsOpen} className={styles.mobileMenu}>
        <Collapsible.Trigger asChild>
          <NavButton
            icon={Menu}
            title={'toggle menu'}
            onClick={() => {
              setMobileMenuIsOpen(!mobileMenuIsOpen);
            }}
          />
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.mobileMenuContent}>
          {navLinks.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  function NavButton({ icon, title, onClick }: NavButtonsProp) {
    return (
      <Button.root
        onClick={onClick}
        variant="ghost"
        size="sm"
        title={title}
        element="button"
      >
        <Button.icon icon={icon} />
      </Button.root>
    );
  }
}
