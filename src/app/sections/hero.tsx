import { ArrowRight } from '@/components/Icons';
import { Button } from '@/components/button';
import { cn } from '@/utils';
import styles from '../home.module.scss';

export function Hero() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContent}>
        <picture className={styles.heroImage}>
          <source
            media="(min-width: 768px)"
            srcSet="/images/hero-desktop.jpg"
          />
          <source media="(min-width: 320px)" srcSet="/images/hero-mobile.jpg" />
          <img draggable="false" src="/images/hero-desktop.jpg" alt="Hero" />
        </picture>
        <div className={cn('container', styles.heroBody)}>
          <h1 className="fs-h1">
            Indulge in luxury with mood-enhancing perfumes
          </h1>
          <p className="fs-body">
            Experience the power of scent to uplift your mood and enhance your
            day.
          </p>
          <Button.root href="/products" element="a">
            <Button.content text="Shop" />
            <Button.icon icon={ArrowRight} />
          </Button.root>
        </div>
      </div>
      <div className={styles.heroSpacer} />
    </section>
  );
}
