'use client';

import { cn } from '@/utils';
import * as Collapsible from '@radix-ui/react-collapsible';
import { motion, useScroll } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType, useEffect, useState } from 'react';
import { Logo, Menu, Search, ShoppingBag, User } from '../Icons';
import { Button } from '../button';
import styles from './header.module.scss';

interface NavButtonsProp {
  icon: ElementType;
  title: string;
  onClick?: () => void;
}

gsap.registerPlugin(ScrollTrigger);

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

const variants = {
  /** this is the "visible" key and it's correlating styles **/
  visible: { opacity: 1, y: 0 },
  /** this is the "hidden" key and it's correlating styles **/
  hidden: { opacity: 0, y: '-160%' },
};

export function Header() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [colorsAreInveted, setColorsAreInveted] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);

  const { scrollY } = useScroll();
  const pathname = usePathname();

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setShowNavigation(true);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setShowNavigation(false);
    }
  }

  useEffect(() => {
    if (pathname === '/') setColorsAreInveted(true);
    else setColorsAreInveted(false);

    return () => {
      window.addEventListener('scroll', update);
    };
  });

  return (
    <header
      className={cn(styles.header, `${colorsAreInveted ? 'theme-dark' : ''}`)}
    >
      <motion.div
        variants={variants}
        initial="visible"
        animate={showNavigation ? 'visible' : 'hidden'}
        transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.6 }}
        className={cn('container', styles.navContainer)}
      >
        <nav className="hide-on-mobile">
          <ul className={styles.navItems}>
            {navLinks.map((link, i) => (
              <li className="item" key={`id_${i}`}>
                <Link
                  className={cn(styles.navItemsLink, 'fs-button')}
                  href={link.url}
                >
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
      </motion.div>
    </header>
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
