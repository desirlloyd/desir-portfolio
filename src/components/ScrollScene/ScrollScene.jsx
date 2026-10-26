import React, { useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Magnetic from '../Magnetic/Magnetic';
import Typewriter from '../Typewriter/Typewriter';
import CvDownload from '../CvDownload/CvDownload';
import { useLanguage } from '../../contexts/LanguageContext';
import profilPhoto from '../../assets/Profil1.jpeg';
import styles from './ScrollScene.module.css';

/**
 * ScrollScene
 *
 * Layout: 300vh wrapper + position:sticky 100vh inner.
 *
 * ALL animation is driven by scroll via direct DOM style writes —
 * no React state, no Framer Motion scroll hooks.
 *
 * Card anatomy (two nested divs for independent transforms):
 *   .cardTrack  — receives translateX / translateY / scale
 *     .cardInner — receives rotateY  (3D flip)
 *       .front / .back — backface-visibility:hidden faces
 *
 * ALIGNMENT STRATEGY:
 *   Both the card and the text blocks start at top:50% / transform:translateY(-50%)
 *   so they are always vertically centred.  The JS only moves the card
 *   horizontally (from right column to left column) and slightly adjusts
 *   vertical alignment to compensate for scale.
 */
const ScrollScene = () => {
  const { language, t } = useLanguage();
  const wrapperRef   = useRef(null);
  const trackRef     = useRef(null);
  const innerRef     = useRef(null);
  const heroTextRef  = useRef(null);
  const aboutTextRef = useRef(null);

  // Store target deltas — computed once after first layout
  const deltaRef = useRef({ tx: 0, ty: 0 });

  useEffect(() => {
    /**
     * Compute how far the card must travel from its hero position
     * to land precisely to the LEFT of the about text block.
     *
     * We measure both elements AFTER the browser has laid them out
     * (p = 0 state), so we get real pixel positions.
     */
    const computeDeltas = () => {
      const vw = window.innerWidth;
      const isMobile = vw < 992;

      if (isMobile) {
        deltaRef.current = { tx: 0, ty: 0 };
      } else {
        // Mathematical calculations (independent of DOM rendering timing):
        // Hero start center CX: 75% of screen width (0.75 * vw)
        // Card width: 320px, scaled to 72% at end state -> 320 * 0.72 = 230.4px. Half width = 115.2px.
        // Desired end center CX (left edge at 5% of screen width): 5% * vw + halfWidth = 0.05 * vw + 115.2
        // tx = targetCX - heroCX = (0.05 * vw + 115.2) - (0.75 * vw) = -0.70 * vw + 115.2
        const tx = -0.70 * vw + 115.2;
        deltaRef.current = { tx, ty: 0 };
      }
    };

    let rafId = null;

    const update = () => {
      if (!wrapperRef.current) return;

      const wTop    = wrapperRef.current.offsetTop;
      const wHeight = wrapperRef.current.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - wTop;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(wHeight, 1)));

      const { tx, ty } = deltaRef.current;
      const isMobile = window.innerWidth < 992;

      /* ── Card outer: translate + scale ── */
      if (trackRef.current) {
        const curTX = isMobile ? 0 : tx * p;
        const curTY = ty * p;
        const sc    = 1 - p * 0.28;   // 1.00 → 0.72
        trackRef.current.style.transform =
          `translate(calc(-50% + ${curTX}px), calc(-50% + ${curTY}px)) scale(${sc})`;
      }

      /* ── Card inner: rotateY 0° → 180° ── */
      if (innerRef.current) {
        innerRef.current.style.transform = `rotateY(${p * 180}deg)`;
      }

      /* ── Hero text: fade out in first 55% ── */
      if (heroTextRef.current) {
        const op = Math.max(0, 1 - p / 0.55);
        heroTextRef.current.style.opacity       = op;
        heroTextRef.current.style.transform     = isMobile
          ? `translateX(-50%)`
          : `translateY(calc(-50% + ${-p * 30}px))`;
        heroTextRef.current.style.pointerEvents = op < 0.05 ? 'none' : '';
      }

      /* ── About text: fade in in last 45% ── */
      if (aboutTextRef.current) {
        const op = Math.max(0, (p - 0.55) / 0.45);
        aboutTextRef.current.style.opacity       = op;
        aboutTextRef.current.style.transform     = isMobile
          ? `translateX(-50%)`
          : `translateY(calc(-50% + ${(1 - op) * 25}px))`;
        aboutTextRef.current.style.pointerEvents = op < 0.05 ? 'none' : '';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Compute target deltas after layout, then run first frame
    const init = () => {
      computeDeltas();
      update();
    };

    // Small delay to ensure CSS has painted
    const timeoutId = setTimeout(init, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { computeDeltas(); update(); });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper} data-scroll-scene>
      <div className={styles.sticky}>

        {/* Ambient glows */}
        <div className={styles.glowLeft}  aria-hidden />
        <div className={styles.glowRight} aria-hidden />

        {/* ── HERO text — left column, vertically centred ── */}
        <div ref={heroTextRef} className={styles.heroText} id="hero">
          <span className={styles.greeting}>{t('hero.greeting')}</span>
          <h1 className={styles.name}>
            Desir Lloyd<br />Barry Johanson
          </h1>
          <div className={styles.typeRow}>
            <span className={styles.bracket}>&lt; </span>
            <TypeAnimation
              key={language}
              sequence={[
                t('hero.role1'), 2200,
                t('hero.role2'), 2200,
                t('hero.role3'), 2200,
                t('hero.role4'), 2200,
              ]}
              speed={50}
              wrapper="span"
              className={`gradient-text ${styles.typeText}`}
              repeat={Infinity}
            />
            <span className={styles.bracket}> /&gt;</span>
          </div>
          <p className={styles.description}>
            {t('hero.description')}
          </p>
          <div className={styles.ctaGroup}>
            <Magnetic>
              <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                {t('hero.viewProjects')}
              </a>
            </Magnetic>
            <Magnetic>
              <CvDownload
                className={`${styles.btn} ${styles.btnSecondary}`}
                iconSize={18}
              >
                {t('hero.downloadCV')}
              </CvDownload>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className={`${styles.btn} ${styles.btnTertiary}`}>
                {t('hero.contactMe')}
              </a>
            </Magnetic>
          </div>
        </div>

        {/* ── CARD — position:absolute, centred, driven by scroll ── */}
        <div ref={trackRef} className={styles.cardTrack}>
          <div className={styles.cardPerspective}>
            <div ref={innerRef} className={styles.cardInner}>
              {/* Front */}
              <div className={styles.face}>
                <div className={styles.faceInner}>
                  <img src={profilPhoto}
                       alt="Desir Lloyd Barry Johanson" />
                  <div className={styles.faceGlow} />
                </div>
              </div>
              {/* Back */}
              <div className={`${styles.face} ${styles.back}`}>
                <div className={styles.faceInner}>
                  <img src={profilPhoto}
                       alt="About — Desir Lloyd Barry Johanson" />
                  <div className={`${styles.faceGlow} ${styles.faceGlowAlt}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ABOUT text — right column, vertically centred ── */}
        <div
          ref={aboutTextRef}
          className={styles.aboutText}
          id="about"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          <h2 className={styles.aboutTitle}>
            <Typewriter 
              key={language}
              segments={t('about.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'gradient-text' : ''
              }))} 
            />
          </h2>
          <h3 className={styles.aboutSubtitle}>
            {t('about.subtitle')}
          </h3>
          <p className={styles.aboutBio}>
            {t('about.bio1')}
          </p>
          <p className={styles.aboutBio}>
            {t('about.bio2')}
          </p>
          <div className={styles.socialRow}>
            <Magnetic>
              <CvDownload className={styles.socialLink} iconSize={16}>
                {t('about.downloadCV')}
              </CvDownload>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollScene;
