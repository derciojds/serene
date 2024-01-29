import { SectionDesc } from '@/components/section-description';
import { cn } from '@/utils';
import Image from 'next/image';
import styles from '../home.module.scss';

export function Ingredients() {
  return (
    <section className={styles.ingredients}>
      <SectionDesc.root>
        <SectionDesc.caption text="Ingredients" />
        <SectionDesc.title
          text={`What makes Us
            <span class="gradient-text"> Diferent</span>`}
        />
      </SectionDesc.root>
      <div className={styles.presentation}>
        <div className={styles.indicators}>
          <Image
            width={120}
            height={120}
            src="/images/ingredient01.jpg"
            alt="vanila"
          />
          <Image
            width={120}
            height={120}
            src="/images/ingredient02.jpg"
            alt="vanila"
          />
          <Image
            width={120}
            height={120}
            src="/images/ingredient03.jpg"
            alt="vanila"
          />
        </div>
        <div className={styles.slide}>
          <div className={styles.slideImage}>
            <Image
              width={655}
              height={614}
              alt="woman smelling perfume"
              src="/images/presentation.jpg"
            />
          </div>
          <p className={cn(styles.slideText, 'fs-h3')}>
            <span>
              {' '}
              Perfumes crafted using a symphony of rare and exquisite
              ingredients sourced from the corners of the globe.
            </span>
            <span className={styles.active}>
              {' '}
              At the heart of every Serene fragrance lies a meticulously curated
              selection of the finest botanicals and minerals.
            </span>
            <span>
              {' '}
              Our perfumers weave together opulent blooms, precious woods, and
              rare accords, creating signature fragrances that embody
              sophistication and allure.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
