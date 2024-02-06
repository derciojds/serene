'use client';

import { Product, ProductSkeleton } from '@/components/product';
import { getProducts } from '@/lib/shopify/operations/product';
import { Product as TProduct } from '@/lib/shopify/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './products.module.scss';

export default function ProductsPage() {
  const first = 12;

  const fetchProjects = async ({ pageParam }: { pageParam?: string }) => {
    const { products, pageInfo } = await getProducts({
      first,
      after: pageParam,
    });
    return { products, pageInfo };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProjects,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      const { hasNextPage } = lastPage.pageInfo;

      const lastProductCursor =
        lastPage.products[lastPage.products.length - 1].cursor;

      return hasNextPage ? lastProductCursor : null;
    },
  });

  const products = data?.pages.reduce((acc: TProduct[], page) => {
    return [...acc, ...page.products];
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <main className={'container'}>
      <div className={styles.filters}></div>
      <div className={styles.products}>
        {status === 'pending'
          ? Array.from({ length: first }, (_, i) => <ProductSkeleton key={i} />)
          : products?.map((product) => (
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
