import { cn } from '@/utils';
import styles from './home.module.scss';
import { Ingredients } from './sections/Ingredients';
import { FeaturedProducts } from './sections/featured-products';
import { Hero } from './sections/hero';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className={styles.main}>
        <div className={cn(styles.mainContent, 'container')}>
          <FeaturedProducts />
          <Ingredients />
        </div>
      </div>
    </>
  );
}
