'use client';

import { Cancel } from '@/components/Icons';
import { LoadingRing } from '@/components/spiner/Ring';
import { CartItem } from '@/lib/shopify/types';
import { useFormState, useFormStatus } from 'react-dom';
import { removeItem } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Remove cart item"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? <LoadingRing size={15} /> : <Cancel />}
    </button>
  );
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const [message, formAction] = useFormState(removeItem, null);
  const itemId = item.id;
  const actionWithVariant = formAction.bind(null, itemId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
