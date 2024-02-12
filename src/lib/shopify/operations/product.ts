import { removeEdgesAndNodes } from '@/utils';
import { shopifyFetch } from '..';
import { TAGS } from '../constants';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from '../queries/product';
import { reshapeProduct, reshapeProducts } from '../reshape';
import {
  PageInfo,
  Product,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
} from '../types';

type GetProductsProps = Omit<ShopifyProductsOperation['variables'], ''>;

type GetProductsResponse = {
  products: Product[];
  pageInfo: PageInfo;
};

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle,
    },
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId,
    },
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  first,
  after,
}: GetProductsProps): Promise<GetProductsResponse> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      first,
      after,
    },
  });

  const products = reshapeProducts(removeEdgesAndNodes(res.body.data.products));
  const pageInfo = res.body.data.products.pageInfo;

  return { products, pageInfo };
}
