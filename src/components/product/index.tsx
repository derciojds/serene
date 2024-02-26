import { Product } from '@/lib/shopify/types';
import { cn } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Price } from '../price';
import { Tag } from '../tag';
import styles from './product.module.scss';

export function Product({ product }: { product: Product }) {
  const {
    priceRange: { maxVariantPrice },
    availableForSale,
  } = product;

  const containerClass = cn(!availableForSale ? styles.unavailable : '', styles.container);

  return (
    <article className={containerClass}>
      <Link href={`/products/${product.handle}`} className={styles.image}>
        <div className={styles.tag}>
          <Tag variant="sold" />
        </div>
        <Image width={350} height={350} src={product.featuredImage.url} alt={product.title} />
      </Link>
      <footer>
        <Link href={`/products/${product.handle}`}>
          <h3 className="fs-body-md truncate">{product.title}</h3>
        </Link>

        <Price
          className="fs-body-sm"
          amount={maxVariantPrice.amount}
          currencyCode={maxVariantPrice.currencyCode}
        />
      </footer>
    </article>
  );
}
