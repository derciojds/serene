import { Connection } from '@/lib/shopify/types';
import { ReadonlyURLSearchParams } from 'next/navigation';

/*
  Shopify utility functions
  -------------------------------------------------------------------------------------
*/

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    'SHOPIFY_STORE_DOMAIN',
    'SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        '\n',
      )}\n`,
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes('[') ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes(']')
  ) {
    throw new Error(
      'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.',
    );
  }
};

export const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => {
    if (edge?.cursor) {
      return { cursor: edge?.cursor, ...edge?.node };
    } else {
      return { ...edge?.node };
    }
  });
};

/*
  ---------------------------------------------------------------------------------------
*/

// function to join class names

export function cn(...classNames: any[]) {
  return classNames.filter((className) => className).join(' ');
}

type FilterData =
  | {
      [key: string]: string | undefined;
    }
  | undefined;

export function buildFilterString(filterData: FilterData): string {
  const filterConditions: string[] = [];

  // Process scent filter
  if (filterData?.scent && filterData.scent.length > 0) {
    const scentFilters = filterData.scent
      .split(',')
      .map((scent) => `tag:${scent}`);
    filterConditions.push(`(${scentFilters.join(' OR ')})`);
  }

  // Process price filter
  if (filterData?.price) {
    const [min, max] = filterData.price.split(',');
    filterConditions.push(
      `variants.price:>=${min} AND variants.price:<=${max}`,
    );
  }

  // Combine all filter conditions
  return filterConditions.join(' AND ');
}
