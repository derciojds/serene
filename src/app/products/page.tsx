'use client';

import { Sort } from '@/components/Icons';
import { Filter } from '@/components/filter';
import { Product, ProductSkeleton } from '@/components/product';
import { getProducts } from '@/lib/shopify/operations/product';
import { Product as TProduct } from '@/lib/shopify/types';
import { useFilterStore } from '@/stores/filterStore';
import { buildFilterString } from '@/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import styles from './products.module.scss';

export default function ProductsPage() {
  const first = 12;

  const filter = useFilterStore((state) => state.selectedContent);
  const filterString = buildFilterString(filter) || undefined;

  const fetchProducts = async ({ pageParam }: { pageParam?: string }) => {
    const { products, pageInfo } = await getProducts({
      first,
      after: pageParam,
      query: filterString,
    });
    return { products, pageInfo };
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['products', filterString],
    queryFn: fetchProducts,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.products.length === 0) {
        return undefined;
      }
      const { hasNextPage } = lastPage.pageInfo;
      const { cursor } = lastPage.products[lastPage.products.length - 1];
      return hasNextPage ? cursor : null;
    },
  });

  const filteredProducts = data?.pages.reduce((acc: TProduct[], page) => {
    let products = page.products;

    if (filter['availability']?.includes('Out of Stock')) {
      products = page.products.filter(
        (product) => product.totalInventory === 0,
      );
    }
    return [...acc, ...products];
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  if (inView && hasNextPage) {
    fetchNextPage();
  }

  return (
    <main className={'container'}>
      <div className={styles.spacer}></div>
      <div className={styles.filters}>
        <div>
          <Filter
            trigger={{ label: 'Scent' }}
            type="checkbox"
            content={['Floral', 'Woody', 'Fruity']}
          />
          <Filter
            trigger={{ label: 'Availability' }}
            type="radio"
            content={['In Stock', 'Out of Stock']}
          />
          <Filter
            trigger={{ label: 'Price' }}
            type="slider"
            min={0}
            max={100}
          />
        </div>
        <Filter
          trigger={{
            label: 'Sort by',
            icon: Sort,
            className: styles.sortButton,
          }}
          type="radio"
          content={['New', 'Old']}
        />
      </div>
      <div className={styles.products}>
        {status === 'pending'
          ? Array.from({ length: first }, (_, i) => <ProductSkeleton key={i} />)
          : filteredProducts?.map((product) => (
              <Product
                key={product.handle}
                handle={product.handle}
                image={product.featuredImage.url}
                title={product.title}
                price={product.priceRange.minVariantPrice.amount}
              />
            ))}
      </div>
      <div ref={ref} className={styles.footer}>
        {hasNextPage ? (
          <div className={styles.loading}>
            <div></div>
          </div>
        ) : (
          <p>There is no more products</p>
        )}
      </div>
    </main>
  );
}
