import { getMenu } from '@/lib/shopify/operations/menu';
import { Menu } from '@/lib/shopify/types';
import { cn } from '@/utils';
import Link from 'next/link';
import { Logo, Search, User } from '../Icons';
import Cart from '../cart';
import { MobileMenu } from './MobileMenu';
import { NavButton } from './NavButton';
import styles from './header.module.scss';

export async function NavContent() {
  const menu = await getMenu('main-menu');

  const processedMenu = menu.map((item) => {
    if (item.path === '/search/all') {
      return {
        title: item.title,
        path: '/products',
      };
    } else if (item.path === '/') {
      return null;
    } else {
      return {
        title: item.title,
        path: item.path,
      };
    }
  });

  return (
    <nav className={cn('container', styles.navContainer)}>
      <div className="hide-on-mobile">
        <ul className={cn(styles.navItems)}>
          {processedMenu.length
            ? processedMenu.map((item) =>
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
        </ul>
      </div>
      <div className={styles.logo}>
        <Link className={styles.logoLink} aria-label="Home" title="Home" href="/">
          <Logo />
        </Link>
      </div>
      <ul className={styles.navItems}>
        <li>
          <NavButton icon={Search} title={'search products'} />
        </li>
        <li className="hide-on-mobile">
          <NavButton icon={User} title={'login'} />
        </li>
        <li>
          <Cart />
        </li>
        <li className={styles.mobileMenu}>
          <MobileMenu menu={processedMenu as Menu[]} />
        </li>
      </ul>
    </nav>
  );
}
