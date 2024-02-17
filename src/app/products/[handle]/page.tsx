import { HIDDEN_PRODUCT_TAG } from '@/lib/shopify/constants';
import { getProduct } from '@/lib/shopify/operations/product';
import { Image as TImage } from '@/lib/shopify/types';
import { cn } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
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
        <Thumbnail images={product.images} />
        <Gallery images={product.images} />
        <div className={styles.info}>
          <h1 className="fs-body-lg">{product.title}</h1>
          <div className="fs-body-lg">
            <span>{product.priceRange.maxVariantPrice.amount}</span>
          </div>
          <div className={styles.variants}>
            <form>
              <fieldset>
                <legend className="fs-body-lg">Size</legend>
                {product.variants.map((variant) => (
                  <div key={variant.id}>
                    <input type="radio" name="variant" id={variant.id.replace(/\D/g, '')} />
                    <label htmlFor={variant.id.replace(/\D/g, '')}>{variant.title}</label>
                  </div>
                ))}
              </fieldset>
            </form>
            <div>
              <h2 className="fs-body-lg">Description</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Thumbnail({ images }: { images: TImage[] }) {
  return (
    <ul className={styles.thumbnails}>
      {images.map((image) => (
        <li key={image.url}>
          <div>
            <span>
              <input type="submit" value="" title="Product thumbnail" />
              <span>
                <Image width={116} height={116} src={image.url} alt={image.altText} />
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Gallery({ images }: { images: TImage[] }) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.url}>
          <div>
            <Image draggable={false} src={image.url} alt={image.altText} width={520} height={600} />
          </div>
        </li>
      ))}
    </ul>
  );
}
