import { cn } from '@/utils';
import { ReactNode } from 'react';
import styles from './sectionDesc.module.scss';

type SectionDescProps = {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
};

export function SectionDescRoot({
  children,
  align = 'left',
}: SectionDescProps) {
  return <div className={cn(styles.root, styles[align])}>{children}</div>;
}
