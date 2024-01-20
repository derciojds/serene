'use client';

import Link from 'next/link';
import { Logo, Menu, Search, ShoppingBag, User } from '../Icons';
import { Button } from '../button';

import { cn } from '@/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  elToIntersect?: MutableRefObject<null>;
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
];

export function Header() {
  const headerRef = useRef(null);
  useLayoutEffect(() => {
    const el = document.querySelector('[data-intersection-element]');

    gsap.to(headerRef.current, {
      scrollTrigger: {
        trigger: el,
        markers: true,
        start: 'top top',
        onEnter: () => {
          console.log('on enter');
        },
        onEnterBack: () => {
          console.log('Im leaving');
        },
      },
      opacity: 0.5,
    });
  }, []);

  return (
    <header ref={headerRef} data-inverted={true} className={styles.header}>
      <div className={cn('container', styles.navContainer)}>
        <nav>
          <ul className={styles.navItems}>
            {navLinks.map((link) => (
              <li key={link.url}>
                <Link className={styles.navItemsLink} href={link.url}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <h1>
          <Link
            className={styles.logoLink}
            aria-label="Home"
            title="Home"
            href="/"
          >
            <Logo />
          </Link>
        </h1>
        <nav>
          <ul className={styles.navItems}>
            <li>
              <Button.root
                size="sm"
                variant="ghost"
                title="search for products"
                element="button"
              >
                <Button.icon icon={Search} />
              </Button.root>
            </li>
            <li>
              <Button.root
                variant="ghost"
                size="sm"
                title="login"
                element="button"
              >
                <Button.icon icon={User} />
              </Button.root>
            </li>
            <li className={styles.shoppingBag}>
              <Button.root
                variant="ghost"
                size="sm"
                title="shopping bag"
                element="button"
              >
                <Button.icon icon={ShoppingBag} />
              </Button.root>
            </li>
            <li className={styles.toggleMenu}>
              <Button.root
                variant="ghost"
                size="sm"
                title="toggle menu"
                element="button"
              >
                <Button.icon icon={Menu} />
              </Button.root>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
