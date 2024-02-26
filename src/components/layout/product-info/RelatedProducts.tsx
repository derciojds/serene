import { getProductRecommendations } from '@/lib/shopify/operations/page';
import { ProductGridItems } from '../products/ProductGridItems';
import styles from './productInfo.module.scss';

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className={styles.relatedProducts}>
      <h2 className="fs-h3">Related Products</h2>
      <ProductGridItems products={relatedProducts} />
    </div>
  );
}
