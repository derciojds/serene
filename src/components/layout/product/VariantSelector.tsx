'use client';

import { ProductOption, ProductVariant } from '@/lib/shopify/types';
import { cn } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './variantSelector.module.scss';

type VariantSelectorProps = {
  options: ProductOption[];
  variants: ProductVariant[];
};

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({ options, variants }: VariantSelectorProps) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {},
    ),
  }));

  return options.map((option) => (
    <fieldset key={option.id} className={styles.variantsWrapper}>
      <legend className="fs-body-lg">{option.name}</legend>
      {option.values.map((value) => {
        const optionNameLowerCase = option.name.toLowerCase();

        // Base option params on current params so we can preserve any other param state in the url.
        const optionSearchParams = new URLSearchParams(searchParams.toString());

        // Update the option params using the current option to reflect how the url *would* change,
        // if the option was clicked.
        optionSearchParams.set(optionNameLowerCase, value);

        // In order to determine if an option is available for sale, we need to:
        //
        // 1. Filter out all other param state
        // 2. Filter out invalid options
        // 3. Check if the option combination is available for sale
        //
        // This is the "magic" that will cross check possible variant combinations and preemptively
        // disable combinations that are not available. For example, if the color gray is only available in size medium,
        // then all other sizes should be disabled.
        const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
          options.find(
            (option) => option.name.toLowerCase() === key && option.values.includes(value),
          ),
        );
        const isAvailableForSale = combinations.find((combination) =>
          filtered.every(
            ([key, value]) => combination[key] === value && combination.availableForSale,
          ),
        );

        // The option is active if it's in the url params.
        const isActive = searchParams.get(optionNameLowerCase) === value;

        let classes = cn(styles.variant, isActive && styles.active);

        return (
          <div
            className={classes}
            key={value}
            title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
            onChange={() => {
              replace(`${pathname}?${optionSearchParams.toString()}`);
            }}
          >
            <input className="sr-only" type="radio" name="variant" id={value} />
            <label className="fs-button" htmlFor={value}>
              {value} {optionNameLowerCase === 'size' ? 'ML' : ''}
            </label>
          </div>
        );
      })}
    </fieldset>
  ));

  // return (
  //   <fieldset className={styles.variantsWrapper}>
  //     <legend className="fs-body-lg">Size</legend>
  //     {variants.map((variant) => (
  //       <div className={styles.variant} key={variant.id}>
  //         <input
  //           className="sr-only"
  //           type="radio"
  //           name="variant"
  //           id={variant.id.replace(/\D/g, '')}
  //         />
  //         <label className="fs-button" htmlFor={variant.id.replace(/\D/g, '')}>
  //           {variant.title} ML
  //         </label>
  //       </div>
  //     ))}
  //   </fieldset>
  // );
}
