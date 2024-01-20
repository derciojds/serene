import { cn } from '@/utils';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonRootProps = {
  size?: 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  children: NonNullable<ReactNode>;
} & (AnchorProps | ButtonProps);

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  element: 'a';
  href: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  element: 'button';
}

export function ButtonRoot({
  size = 'lg',
  element,
  variant = 'primary',
  className = '',
  children,
  ...restProps
}: ButtonRootProps) {
  const commonProps = {
    'data-button-size': size,
    'data-button-variant': variant,
    className: cn(styles.container, className),
  };

  switch (element) {
    case 'a':
      return (
        <a {...commonProps} {...(restProps as AnchorProps)}>
          {children}
        </a>
      );
    case 'button':
      return (
        <button {...commonProps} {...(restProps as ButtonProps)}>
          {children}
        </button>
      );
    default:
      break;
  }
}
