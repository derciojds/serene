import { Button } from '@/components/button';
import { Product } from '@/components/product';
import { ProductsSwiper } from '@/components/products-swiper';
import { SectionDesc } from '@/components/section-description';
import { getCollectionProducts } from '@/lib/shopify/operations/collection';
import styles from '../home.module.scss';

export async function FeaturedProducts() {
  const products = await getCollectionProducts({
    collection: 'featured-products',
  });

  return (
    <section className={styles.featuredProducts}>
      <SectionDesc.root>
        <SectionDesc.caption text="Luxury" />
        <SectionDesc.title text="Perfumes" />
        <SectionDesc.paragraph text="Discover our collection of mood-enhancing luxury perfumes" />
      </SectionDesc.root>
      <ProductsSwiper>
        {products.length > 0 &&
          products.map(({ featuredImage, title, priceRange }, index) => (
            <Product
              key={index}
              image={featuredImage.url}
              price={priceRange.maxVariantPrice.amount}
              title={title}
            />
          ))}
      </ProductsSwiper>
      <Button.root
        variant="secondary"
        element="a"
        href="/products"
        className={styles.button}
      >
        <Button.content text="See all products" />
      </Button.root>
    </section>
  );
}
