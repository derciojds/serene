import styles from './products.module.scss';

export function ProductGridItemsSkeleton({ length }: { length: number }) {
  return (
    <div className={styles.products}>
      {Array.from({ length }, (_, i) => (
        <div key={i} className={styles.skeletonContainer}>
          <div className={styles.skeletonImage}></div>
          <div className={styles.skeletonContent}>
            <div></div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}
