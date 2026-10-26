import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import profilPhoto from '../../assets/Profil1.jpeg';
import styles from './AboutHoloPhoto.module.css';

/**
 * AboutHoloPhoto
 * 
 * Holographic Stabilization interface for the About section.
 * Sequence:
 *  1. Triggered once when entering viewport (triggerOnce: true).
 *  2. Soft progressive lens focus (blur -> sharp).
 *  3. Discrete phosphorescent green contour traces the perimeter.
 *  4. Fine technical calibration lines and coordinates appear briefly.
 *  5. Periodic subtle specular light sheen (reflet lumineux) sweeps across.
 *  6. Settles permanently into a stable, refined, and elegant state.
 */
const AboutHoloPhoto = ({ className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const [calibrated, setCalibrated] = useState(false);

  useEffect(() => {
    if (inView) {
      // Mark system calibration complete after 1.5s
      const timer = setTimeout(() => {
        setCalibrated(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`${styles.container} ${inView ? styles.active : ''} ${calibrated ? styles.stabilized : ''} ${className}`}
    >
      {/* Corner Tech Marks */}
      <div className={`${styles.corner} ${styles.cornerTL}`} aria-hidden />
      <div className={`${styles.corner} ${styles.cornerTR}`} aria-hidden />
      <div className={`${styles.corner} ${styles.cornerBL}`} aria-hidden />
      <div className={`${styles.corner} ${styles.cornerBR}`} aria-hidden />

      {/* Top HUD Telemetry */}
      <div className={styles.topTelemetry} aria-hidden>
        <span className={styles.telemetryTag}>
          <span className={styles.statusDot} />
          {calibrated ? 'SYS.ID // STABILIZED' : 'SYS.ID // CALIBRATING...'}
        </span>
        <span className={styles.telemetryIndex}>ARCHIVE • 02</span>
      </div>

      {/* Bottom HUD Telemetry */}
      <div className={styles.bottomTelemetry} aria-hidden>
        <span className={styles.coords}>CAL: OPTICAL 1.0</span>
        <span className={styles.statusLabel}>
          {calibrated ? 'LOCK: 100%' : 'LOCKING...'}
        </span>
      </div>

      {/* Photo Frame Container */}
      <div className={styles.frame}>
        {/* SVG Animated Perimeter Contour */}
        <svg className={styles.contourSvg} aria-hidden>
          <rect
            className={styles.contourRect}
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
          />
        </svg>

        {/* The Undistorted Profile Image */}
        <img
          src={profilPhoto}
          alt="À Propos — Desir Lloyd Barry Johanson"
          className={styles.photo}
          loading="lazy"
        />

        {/* Ambient Dark-Tech Tint */}
        <div className={styles.ambientOverlay} aria-hidden />

        {/* Brief Technical Calibration Grid (Fades out once stabilized) */}
        <div className={styles.calibrationOverlay} aria-hidden>
          <div className={styles.gridLines} />
          <div className={styles.centerReticle}>+</div>
          <div className={styles.axisH} />
          <div className={styles.axisV} />
        </div>

        {/* Periodic Specular Light Sheen (Reflet Lumineux) */}
        <div className={styles.specularSheen} aria-hidden />
      </div>
    </div>
  );
};

export default AboutHoloPhoto;
