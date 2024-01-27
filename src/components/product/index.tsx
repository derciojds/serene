import Image from 'next/image';
import styles from './product.module.scss';

interface ProductProps {
  image: string;
  title: string;
  price: string;
}

export function Product({ image, price, title }: ProductProps) {
  return (
    <article className={styles.container}>
      <a href="products/#" className={styles.image}>
        <Image width={350} height={350} src={image} alt={title} />
      </a>
      <footer>
        <a href="products/#">
          <h3 className="fs-body-md truncate">{title}</h3>
        </a>
        <p className="fs-body-sm">{price}</p>
      </footer>
    </article>
  );
}
