'use client';
import { ProductGridItems } from '@/components/layout/products/ProductGridItems';
import { ProductGridItemsSkeleton } from '@/components/layout/products/ProductGridItemsSkeleton';
import { ProductsFilter } from '@/components/layout/products/ProductsFilter';
import { defaultSort, sorting } from '@/lib/shopify/constants';
import { getProducts } from '@/lib/shopify/operations/product';
import { Product as TProduct } from '@/lib/shopify/types';
import { buildFilterString } from '@/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import styles from './products.module.scss';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const FIRST = 12;

  const { scent, price, sort } = searchParams || {};
  const filterString = buildFilterString({ scent, price }) || undefined;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const fetchProducts = async ({ pageParam }: { pageParam?: string }) => {
    const { products, pageInfo } = await getProducts({
      sortKey,
      reverse,
      first: FIRST,
      after: pageParam,
      query: filterString,
    });
    return { products, pageInfo };
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['products', filterString, sortKey, reverse],
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

  // @TODO
  const filteredProducts = data?.pages.reduce((acc: TProduct[], page) => {
    let products = page.products;

    if (searchParams?.availability?.includes('out of stock')) {
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
      <ProductsFilter />
      <div className={styles.products}>
        {status === 'pending' ? (
          <ProductGridItemsSkeleton length={FIRST} />
        ) : (
          <ProductGridItems products={filteredProducts} />
        )}
      </div>
      <div ref={ref} className={styles.footer}>
        {hasNextPage ? (
          <div className={styles.loading}>
            <div></div>
          </div>
        ) : (
          <p>There are no more products</p>
        )}
      </div>
    </main>
  );
}
