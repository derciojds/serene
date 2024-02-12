import Image from 'next/image';
import Link from 'next/link';
import styles from './product.module.scss';

interface ProductProps {
  image: string;
  title: string;
  price: string;
  handle: string;
}

export function Product({ image, price, title, handle }: ProductProps) {
  return (
    <article className={styles.container}>
      <Link href={`products/${handle}`} className={styles.image}>
        <Image width={350} height={350} src={image} alt={title} />
      </Link>
      <footer>
        <Link href={`products/${handle}`}>
          <h3 className="fs-body-md truncate">{title}</h3>
        </Link>
        <p className="fs-body-sm">{price}</p>
      </footer>
    </article>
  );
}
