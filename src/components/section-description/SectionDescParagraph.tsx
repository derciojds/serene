import { cn } from '@/utils';
import styles from './sectionDesc.module.scss';

export function SectionDescParagraph({ text }: { text: string }) {
  return <div className={cn(styles.paragraph, 'fs-body-md')}>{text}</div>;
}
