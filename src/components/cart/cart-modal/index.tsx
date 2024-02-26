'use client';

import { ShoppingBag } from '@/components/Icons';
import { Price } from '@/components/price';
import { DEFAULT_OPTION } from '@/lib/shopify/constants';
import { Cart } from '@/lib/shopify/types';
import { cn, createUrl } from '@/utils';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteItemButton } from '../delete-item-button';
import { EditItemQuantityButton } from '../edit-item-quantity-button';
import styles from './cartModal.module.scss';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild className={styles.triggerButton}>
        <button type="button">
          <ShoppingBag />
          <span className={styles.cartCount}>{cart?.totalQuantity}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.dialogHeader}>
            <Dialog.Title className={cn(styles.dialogTitle, 'fs-body-lg')}>My Cart</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                close
              </button>
            </Dialog.Close>
          </div>
          {!cart || cart.lines.length === 0 ? (
            <div className={styles.emptyCart}>
              <h3>Your cart is empty</h3>
              <p>
                Looks like you have not added anything to you cart. Go ahead & explore top
                categories.
              </p>
            </div>
          ) : (
            <div className={styles.cartContent}>
              <ul>
                {cart.lines.map((item, i) => {
                  const merchandiseSearchParams = {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(({ name, value }) => {
                    if (value !== DEFAULT_OPTION) {
                      merchandiseSearchParams[name.toLowerCase()] = value;
                    }
                  });

                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams),
                  );

                  return (
                    <li key={i}>
                      <div className={styles.product}>
                        <div className={styles.deleteProductButton}>
                          <DeleteItemButton item={item} />
                        </div>
                        <Link
                          className={styles.productInfo}
                          href={merchandiseUrl}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={styles.productImage}>
                            <Image
                              width={64}
                              height={64}
                              alt={
                                item.merchandise.product.featuredImage.altText ||
                                item.merchandise.product.title
                              }
                              src={item.merchandise.product.featuredImage.url}
                            />
                          </div>
                          <div>
                            <span>{item.merchandise.product.title}</span>
                            {item.merchandise.title !== DEFAULT_OPTION ? (
                              <p>{item.merchandise.title}</p>
                            ) : null}
                          </div>
                        </Link>
                        <div className={styles.price}>
                          <Price
                            amount={item.cost.totalAmount.amount}
                            currencyCode={item.cost.totalAmount.currencyCode}
                          />
                          <div className={styles.quantityEditor}>
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="">
                              <span>{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div>
                <div className={styles.orderSummary}>
                  <p>Subtotal</p>
                  <Price
                    amount={cart.cost.totalAmount.amount}
                    currencyCode={cart.cost.totalAmount.currencyCode}
                  />
                </div>
                <a className={styles.checkoutButton} href={cart.checkoutUrl}>
                  Proceed to Checkout
                </a>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
