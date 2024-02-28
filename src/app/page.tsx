import { Footer } from '@/components/footer';
import { cn } from '@/utils';
import { Suspense } from 'react';
import styles from './home.module.scss';
import { FeaturedProducts } from './sections/FeaturedProducts';
import { Hero } from './sections/Hero';
import { Ingredients } from './sections/Ingredients';
import { Newsletter } from './sections/Newsletter';
import { Testmonials } from './sections/Testimonials';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className={styles.main}>
        <div className={cn(styles.mainContent, 'container')}>
          <Suspense>
            <FeaturedProducts />
          </Suspense>
          <Ingredients />
          <Testmonials />
          <Newsletter />
        </div>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
