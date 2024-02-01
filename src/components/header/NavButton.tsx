import { ElementType } from 'react';
import { Button } from '../button';

interface NavButtonsProp {
  icon: ElementType;
  title: string;
  onClick?: () => void;
}

export function NavButton({ icon, title, onClick }: NavButtonsProp) {
  return (
    <Button.root
      onClick={onClick}
      variant="ghost"
      size="sm"
      title={title}
      element="button"
    >
      <Button.icon icon={icon} />
    </Button.root>
  );
}
