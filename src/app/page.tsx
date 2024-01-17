import { getCollectionProducts } from '@/services/shopify/controllers/collection';
import Image from 'next/image';

export default async function Home() {
  const products = await getCollectionProducts({
    collection: 'featured-products',
  });

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Image
              width={400}
              height={400}
              src={product.featuredImage.url}
              alt={product.title}
            />
            <p>{product.title}</p>
            <p>{product.priceRange.minVariantPrice.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
