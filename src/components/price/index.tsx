import { formatCurrency } from '@/utils';

type PriceProps = {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>;

export function Price({ amount, className, currencyCode = 'USD' }: PriceProps) {
  return (
    <p className={className}>{`${formatCurrency({
      amount,
      currencyCode,
      locale: 'en-US',
    })} ${currencyCode}`}</p>
  );
}
