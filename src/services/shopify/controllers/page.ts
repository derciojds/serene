import { removeEdgesAndNodes } from '@/utils';
import { shopifyFetch } from '..';
import { getPageQuery, getPagesQuery } from '../queries/page';
import {
  Page,
  Product,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProductRecommendationsOperation,
} from '../types';
import { reshapeProducts } from '../reshape';
import { getProductRecommendationsQuery } from '../queries/product';
import { TAGS } from '../constants';

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
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
