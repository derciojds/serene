import { cn } from '@/utils';
import styles from './home.module.scss';
import { Hero } from './sections/hero';

export default async function Home() {
  return (
    <>
      <Hero />
      <div className={styles.main}>
        <div className={cn(styles.mainContent, 'container')}>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
          <div className="fs-h1">Just some beutful text here</div>
        </div>
      </div>
    </>
  );
}
