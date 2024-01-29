import { ArrowRight } from '@/components/Icons';
import { Button } from '@/components/button';
import { cn } from '@/utils';
import styles from '../home.module.scss';

export function Hero() {
  return (
    <section className={cn(styles.heroWrapper, 'theme-dark')}>
      <div className={styles.heroContent}>
        <video
          className={styles.heroVideo}
          muted
          autoPlay
          loop
          poster="/images/hero-video.mp4_20240129_213835.721.jpg"
        >
          <source src="/videos/hero-video.mp4" />
        </video>
        <div className={styles.overlay}></div>
        <div className={cn('container', styles.heroBody)}>
          <h1 className="fs-h1">
            Indulge in luxury with mood-enhancing perfumes
          </h1>
          <p className="fs-body">
            Experience the power of scent to uplift your mood and enhance your
            day.
          </p>
          <Button.root className="theme-white" href="/products" element="a">
            <Button.content text="Shop" />
            <Button.icon icon={ArrowRight} />
          </Button.root>
        </div>
      </div>
      <div className={styles.heroSpacer} />
    </section>
  );
}
