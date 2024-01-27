import { ReactNode } from 'react';
import styles from './sectionDesc.module.scss';

export function SectionDescRoot({ children }: { children: ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
