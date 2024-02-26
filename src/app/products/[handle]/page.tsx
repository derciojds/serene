import { AddToCart } from '@/components/cart/add-to-cart';
import { Gallery } from '@/components/layout/product-info/Gallery';
import { QuantitySelector } from '@/components/layout/product-info/QuantitySelector';
import { RelatedProducts } from '@/components/layout/product-info/RelatedProducts';
import { VariantSelector } from '@/components/layout/product-info/VariantSelector';
import { Price } from '@/components/price';
import { HIDDEN_PRODUCT_TAG } from '@/lib/shopify/constants';
import { getProduct } from '@/lib/shopify/operations/product';
import { cn } from '@/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from './product.module.scss';

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: `Serene — ${product.seo.title || product.title}`,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  return (
    <>
      <div className="spacer" />
      <div className={cn(styles.details, 'container-narrow')}>
        <Gallery images={product.images} />
        <div className={styles.info}>
          <h1 className="fs-h3">{product.title}</h1>
          <div className={cn(styles.price, 'fs-body-lg')}>
            <Price
              className="fs-body-sm"
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
          <VariantSelector options={product.options} variants={product.variants} />
          <QuantitySelector totalInventory={product.totalInventory} />
          <div className={styles.description}>
            <h2 className="fs-body-lg">Description</h2>
            <p>{product.description}</p>
          </div>
          <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        </div>
      </div>
      <div className="container">
        <RelatedProducts id={product.id} />
      </div>
    </>
  );
}
