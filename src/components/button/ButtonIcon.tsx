import { ElementType } from 'react';

interface ButtonIconProps {
  icon: ElementType;
}

export function ButtonIcon({ icon: Icon }: ButtonIconProps) {
  return <Icon />;
}
