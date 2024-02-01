'use client';

import { Menu } from '@/lib/shopify/types';
import * as Collapsible from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { useState } from 'react';
import { Menu as MenuIcon } from '../Icons';
import { NavButton } from './NavButton';
import styles from './header.module.scss';

export function MobileMenu({ menu }: { menu: Menu[] | null[] }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <Collapsible.Root open={mobileMenuIsOpen} className={styles.mobileMenu}>
      <Collapsible.Trigger asChild>
        <NavButton
          icon={MenuIcon}
          title={'toggle menu'}
          onClick={() => {
            setMobileMenuIsOpen(!mobileMenuIsOpen);
          }}
        />
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.mobileMenuContent}>
        {menu.length
          ? menu.map((item) =>
              item ? (
                <li className="item" key={item.title}>
                  <Link className={'fs-button'} href={item.path}>
                    {item.title}
                  </Link>
                </li>
              ) : (
                ''
              ),
            )
          : ''}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
