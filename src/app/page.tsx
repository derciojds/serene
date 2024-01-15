import { shopifyFetch } from '@/services/shopify';

export default async function Home() {
  const products = await shopifyFetch({
    query: `
      {
        shop {
          name
        }
      }
    `,
  });

  const { body } = products;

  console.log(body);

  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}
