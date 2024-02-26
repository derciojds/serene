import { Product } from '@/components/product';
import { Product as ProductsProp } from '@/lib/shopify/types';
import styles from './products.module.scss';

export function ProductGridItems({ products }: { products: ProductsProp[] | undefined }) {
  return (
    <div className={styles.products}>
      {products?.map((product) => <Product key={product.handle} product={product} />)}
    </div>
  );
}
