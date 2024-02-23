import { cn } from '@/utils';
import styles from './tag.module.scss';

type TagProps = {
  variant: 'sold' | 'new';
};

export function Tag({ variant }: TagProps) {
  const name = variant === 'sold' ? 'Sold Out' : variant;
  const classes = cn(
    styles.container,
    variant === 'sold' ? styles.sold : styles.new,
  );

  return (
    <div className={classes}>
      <span>{name}</span>
    </div>
  );
}
