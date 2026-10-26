import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Magnetic from '../Magnetic/Magnetic';
import CvDownload from '../CvDownload/CvDownload';
import HeroScanPhoto from './HeroScanPhoto';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Hero.module.css';

/**
 * Hero Section
 * 
 * Standalone Hero section with independent HeroScanPhoto.
 * Includes multi-language support, magnetic CTA buttons,
 * and high-tech biometric diagnostic scanner.
 */
const Hero = () => {
  const { language, t } = useLanguage();

  return (
    <section id="hero" className={styles.hero}>
      {/* Background ambient glows */}
      <div className={styles.glowBL} aria-hidden />
      <div className={styles.glowTR} aria-hidden />

      <div className={styles.container}>
        {/* Left: Text Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className={styles.greeting}>{t('hero.greeting')}</span>

          <h1 className={styles.name}>
            Desir Lloyd<br />Barry Johanson
          </h1>

          <div className={styles.typewriterWrapper}>
            <span className={styles.typePrefix}>&lt; </span>
            <TypeAnimation
              key={language}
              sequence={[
                t('hero.role1'), 2200,
                t('hero.role2'), 2200,
                t('hero.role3'), 2200,
                t('hero.role4'), 2200,
              ]}
              wrapper="span"
              speed={50}
              className={`gradient-text ${styles.typeText}`}
              repeat={Infinity}
            />
            <span className={styles.typePrefix}> /&gt;</span>
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
        </motion.div>

        {/* Right: Independent Hero Profile Photo with Biometric Scanner Animation */}
        <motion.div
          className={styles.photoWrapper}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <HeroScanPhoto />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
