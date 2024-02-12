import { cn } from '@/utils';
import { Button } from '../button';
import styles from './input.module.scss';

export function Input() {
  return (
    <form className={styles.form} action="">
      <input
        className={cn(styles.input, 'fs-body-lg')}
        placeholder="Email"
        required
        type="email"
        name="email"
        id="emailInput"
      />
      <Button.root
        style={{ textTransform: 'uppercase' }}
        size="sm"
        element="button"
        className={styles.button}
        type="submit"
      >
        <Button.content text="subscribe" />
      </Button.root>
    </form>
  );
}
