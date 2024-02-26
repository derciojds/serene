'use client';

import { Add, Minus } from '@/components/Icons';
import { LoadingRing } from '@/components/spiner/Ring';
import { CartItem } from '@/lib/shopify/types';
import { useFormState, useFormStatus } from 'react-dom';
import { updateItemQuantity } from '../actions';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      aria-disabled={pending}
      className={''}
    >
      {pending ? <LoadingRing /> : type === 'plus' ? <Add /> : <Minus />}
    </button>
  );
}

export function EditItemQuantityButton({ item, type }: { item: CartItem; type: 'plus' | 'minus' }) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  const payload = {
    lineId: item.id,
    variantId: item.merchandise.id,
    quantity: type === 'plus' ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
