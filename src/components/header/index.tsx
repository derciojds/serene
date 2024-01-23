'use client';

import { cn } from '@/utils';
import * as Collapsible from '@radix-ui/react-collapsible';
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
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [colorsAreInveted, setColorsAreInveted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') setColorsAreInveted(true);
    else setColorsAreInveted(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        styles.header,
        `${colorsAreInveted ? 'invert-colors' : ''}`,
      )}
    >
      <div className={cn('container', styles.navContainer)}>
        <nav className="hide-on-mobile">
          <ul className={styles.navItems}>
            {navLinks.map((link) => (
              <li key={link.url}>
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
              <NavButton icon={Search} title={'search products'} />
            </li>
            <li className="hide-on-mobile">
              <NavButton icon={User} title={'login'} />
            </li>
            <li>
              <NavButton icon={ShoppingBag} title={'shopping bag'} />
            </li>
            <li>
              <MobileMenu />
            </li>
          </ul>
        </nav>
      </div>
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
