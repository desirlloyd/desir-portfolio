import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './ProfilePhoto.module.css';

/**
 * Standalone flip card component.
 * Flips from front to back when it enters the viewport.
 * No position:fixed, no Framer Motion useScroll — pure CSS 3D.
 */
const ProfilePhoto = ({ size = 'large', className = '' }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref} className={`${styles.cardScene} ${className}`}>
      <div className={`${styles.card} ${inView ? styles.flipped : ''}`}>
        {/* Front: shown in Hero */}
        <div className={`${styles.face} ${styles.front}`}>
          <img
            src="https://i.pravatar.cc/400?img=8"
            alt="Desir Lloyd Barry Johanson"
            loading="eager"
          />
          <div className={styles.glowOverlay} />
          <div className={styles.glowBorder} />
        </div>

        {/* Back: revealed after flip in About */}
        <div className={`${styles.face} ${styles.back}`}>
          <img
            src="https://i.pravatar.cc/400?img=12"
            alt="Desir Lloyd Barry Johanson – About"
            loading="eager"
          />
          <div className={styles.glowOverlayAlt} />
          <div className={styles.glowBorderAlt} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
