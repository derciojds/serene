import { cn } from '@/utils';
import styles from './sectionDesc.module.scss';

export function SectionDescCaption({ text }: { text: string }) {
  return <div className={cn(styles.caption, 'fs-caption')}>{text}</div>;
}
