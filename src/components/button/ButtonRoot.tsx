import { cn } from '@/utils';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonRootProps = {
  size?: 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
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
  disabled,
  ...restProps
}: ButtonRootProps) {
  const commonProps = {
    'data-button-size': size,
    'data-button-variant': variant,
    className: cn(
      styles.container,
      className,
      'fs-button',
      disabled ? styles.disabled : '',
    ),
  };

  switch (element) {
    case 'a':
      return (
        <a role="button" {...commonProps} {...(restProps as AnchorProps)}>
          {children}
        </a>
      );
    case 'button':
      return (
        <button type="button" {...commonProps} {...(restProps as ButtonProps)}>
          {children}
        </button>
      );
    default:
      break;
  }
}
