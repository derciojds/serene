import { ElementType } from 'react';
import { Button } from '../button';

interface NavButtonsProp {
  icon: ElementType;
  title: string;
  text?: string | number;
  onClick?: () => void;
}

export function NavButton({ icon, title, onClick, text }: NavButtonsProp) {
  return (
    <Button.root
      style={{ gap: '0.5rem' }}
      onClick={onClick}
      variant="ghost"
      size="sm"
      title={title}
      element="button"
    >
      <Button.icon icon={icon} />
      {text ? <Button.content text={String(text)} /> : ''}
    </Button.root>
  );
}
