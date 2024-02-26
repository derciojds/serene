'use client';

import { Add, Minus } from '@/components/Icons';
import { cn } from '@/utils';
import { useState } from 'react';
import styles from './productInfo.module.scss';

export function QuantitySelector({ totalInventory }: { totalInventory: number }) {
  const [quantity, setQuantity] = useState(totalInventory ? 1 : 0);

  return (
    <fieldset className={styles.quantitySelector}>
      <legend className="fs-body-lg">Quantity</legend>
      <div className={styles.quantitySelectorButtons}>
        <button
          type="button"
          aria-label="Remove one"
          aria-disabled={quantity <= 1}
          disabled={quantity <= 1}
          onClick={() => {
            setQuantity(quantity <= 1 ? quantity : quantity - 1);
          }}
        >
          <Minus />
        </button>
        <span title="selected quantity" className={cn(styles.quantity, 'fs-button')}>
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Add one"
          aria-disabled={quantity >= totalInventory}
          disabled={quantity >= totalInventory}
          onClick={() => {
            setQuantity(quantity >= totalInventory ? totalInventory : quantity + 1);
          }}
        >
          <Add />
        </button>
      </div>
    </fieldset>
  );
}
