'use client';

import { Button } from '@/components/button';
import { LoadingRing } from '@/components/spiner/Ring';
import { ProductVariant } from '@/lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { CSSProperties } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addItem } from '../actions';

function SubmitButton({
  availableForSale,
  selectedVariantId,
  style,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  style?: CSSProperties;
}) {
  const { pending } = useFormStatus();

  if (!availableForSale) {
    return (
      <Button.root style={style} aria-disabled disabled element="button">
        <Button.content text="Out Of Stock" />
      </Button.root>
    );
  }

  if (!selectedVariantId) {
    return (
      <Button.root
        style={style}
        aria-label="Please select an option"
        aria-disabled
        disabled
        element="button"
      >
        <Button.content text="Add To Cart" />
      </Button.root>
    );
  }

  return (
    <>
      <Button.root
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        style={style}
        aria-label="Add to cart"
        aria-disabled={pending}
        element="button"
        type="submit"
      >
        <Button.content text="Add to Cart" />
        {pending ? <Button.icon icon={LoadingRing} /> : null}
      </Button.root>
    </>
  );
}

export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        style={{ width: '100%' }}
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
