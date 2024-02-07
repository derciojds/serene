import { ensureStartsWith } from '@/utils';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Trending',
    slug: 'trending-desc',
    sortKey: 'BEST_SELLING',
    reverse: false,
  }, // asc
  {
    title: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: 'CREATED_AT',
    reverse: true,
  },
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'PRICE',
    reverse: false,
  }, // asc
  {
    title: 'Price: High to low',
    slug: 'price-desc',
    sortKey: 'PRICE',
    reverse: true,
  },
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2024-01/graphql.json';

export const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
export const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
export const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
