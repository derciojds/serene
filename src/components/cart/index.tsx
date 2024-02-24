'use cliente';

import { getCart } from '@/lib/shopify/operations/cart';
import { cookies } from 'next/headers';
import { CartModal } from './cart-modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
