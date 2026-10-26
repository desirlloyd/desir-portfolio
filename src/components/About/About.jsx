import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutHoloPhoto from './AboutHoloPhoto';
import Typewriter from '../Typewriter/Typewriter';
import Magnetic from '../Magnetic/Magnetic';
import CvDownload from '../CvDownload/CvDownload';
import { useCountUp } from '../../hooks/useCountUp';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './About.module.css';

// Individual stat box with count-up animation
const StatCard = ({ stat }) => {
  const [count, countRef] = useCountUp(stat.number, 2000);
  return (
    <div className={styles.statBox} ref={countRef}>
      <h4 className={styles.statNumber}>
        {count}<span className={styles.accent}>{stat.suffix}</span>
      </h4>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
};

/**
 * About Section
 * 
 * Standalone About section with independent AboutHoloPhoto.
 * Features:
 *  - Holographic stabilization animation on the profile photo
 *  - Responsive grid layout preserving proportions
 *  - Multi-language content, typewriter header, and count-up stats
 */
const About = () => {
  const { language, t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const stats = [
    { number: 1, suffix: '+', label: t('about.stats.exp') },
    { number: 3, suffix: '+', label: t('about.stats.education') },
    { number: 3, suffix: '', label: t('about.stats.languages') },
  ];

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            <Typewriter
              key={language}
              segments={t('about.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'gradient-text' : ''
              }))}
            />
          </h2>
          <div className={styles.line} aria-hidden />
        </div>

        <div className={styles.content}>
          {/* Left: Independent Profile Photo with Holographic Stabilization */}
          <motion.div
            className={styles.photoWrapper}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <AboutHoloPhoto />
          </motion.div>

          {/* Right: Bio Text and Metrics */}
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className={styles.subtitle}>
              {t('about.subtitle')}
            </h3>

            <p className={styles.bio}>
              {t('about.bio1')}
            </p>

            <p className={styles.bio}>
              {t('about.bio2')}
            </p>

            <div className={styles.statsContainer}>
              {stats.map((stat, index) => (
                <StatCard key={`${index}-${language}`} stat={stat} />
              ))}
            </div>

            <div className={styles.ctaRow}>
              <Magnetic>
                <CvDownload className={styles.downloadBtn} iconSize={16}>
                  {t('about.downloadCV')}
                </CvDownload>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
