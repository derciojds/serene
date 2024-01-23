import { cn } from '@/utils';
import Link from 'next/link';
import { ChevronDown, Logo } from '../Icons';
import { Button } from '../button';
import styles from './footer.module.scss';

export function Footer() {
  return (
    <footer className={cn(styles.footerWrapper, 'theme-dark')}>
      <div className={styles.footerSpacer}></div>
      <div className={styles.footerContent}>
        <div className={styles.footerPadding}></div>
        <div className="container-narrow">
          <div className={styles.logo}>
            <Logo />
          </div>
          <section className={styles.groups}>
            <nav className={styles.navsGroup}>
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
            <div className={styles.actionsGroup}>
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
        </div>
        <div className={styles.footerPadding}></div>
      </div>
    </footer>
  );
}
