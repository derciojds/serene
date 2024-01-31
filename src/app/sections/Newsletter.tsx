import { Input } from '@/components/input';
import Image from 'next/image';
import styles from '../home.module.scss';

export function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <Image
        width={200}
        height={200}
        src="/images/newsletter.jpg"
        alt="newsletter"
        className={styles.image}
      />
      <h1 className="fs-display">
        Get Exclusive Offers and <span className="gradient-text">Updates</span>
      </h1>
      <Input />
    </section>
  );
}
