import { Sort } from '@/components/Icons';
import { Filter } from '@/components/filter';
import { sorting } from '@/lib/shopify/constants';
import styles from './products.module.scss';

export function ProductsFilter() {
  return (
    <div className={styles.filters}>
      <div>
        <Filter
          trigger={{ label: 'Scent' }}
          type="checkbox"
          list={['Floral', 'Woody', 'Fruity']}
        />
        <Filter
          trigger={{ label: 'Availability' }}
          type="radio"
          list={['In Stock', 'Out of Stock']}
        />
        <Filter trigger={{ label: 'Price' }} type="slider" min={50} max={400} />
      </div>
      <Filter
        trigger={{
          label: 'Sort by',
          icon: Sort,
          className: styles.sortButton,
        }}
        type="radio"
        list={sorting}
        urlTerm="sort"
      />
    </div>
  );
}
