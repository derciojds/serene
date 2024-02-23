import styles from './loadingDots.module.scss';

export function LoadingDots() {
  return (
    <div className="col-3">
      <div className="snippet" data-title="dot-carousel">
        <div className="stage">
          <div className={styles.dotCarousel}></div>
        </div>
      </div>
    </div>
  );
}
