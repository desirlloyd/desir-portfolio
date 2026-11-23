import React from 'react';
import profilPhoto from '../../assets/Profil1.jpeg';
import styles from './HeroScanPhoto.module.css';

/**
 * HeroScanPhoto
 * 
 * Futuristic biometric diagnostic scanner interface for the Hero section.
 * Features:
 *  - Phosphorescent green scan beam sweeping top to bottom
 *  - Luminous halo & trailing illumination
 *  - High-tech HUD corner reticles and discrete telemetry markers
 *  - Subtly reactive border during active scan cycle
 *  - Contained viewport keeping photo crisp and undistorted
 */
const HeroScanPhoto = ({ className = '' }) => {
  return (
    <div className={`${styles.scannerContainer} ${className}`}>
      {/* Rotating Rectangle larger than the photo, spinning indefinitely */}
      <div className={styles.rotatingRectangle} aria-hidden />

      {/* Viewport Frame (Centered Photo) */}
      <div className={styles.viewportFrame}>
        {/* Profile Image (undistorted) */}
        <img
          src={profilPhoto}
          alt="Desir Lloyd Barry Johanson"
          className={styles.photo}
          loading="eager"
        />

        {/* Ambient Dark-Tech Vignette */}
        <div className={styles.vignetteOverlay} aria-hidden />

        {/* Subtle Scanline Raster Mesh */}
        <div className={styles.scanlineMesh} aria-hidden />

        {/* The Scanning Beam & Trailing Illumination */}
        <div className={styles.scanBeamGroup} aria-hidden>
          {/* Trailing illumination (light that follows behind the beam) */}
          <div className={styles.scanTrail} />
          {/* High-intensity phosphorescent green scan line */}
          <div className={styles.scanLine} />
          {/* Subtle leading aura */}
          <div className={styles.scanLeadingGlow} />
        </div>
      </div>
    </div>
  );
};

export default HeroScanPhoto;
