import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background decorative elements */}
      <div className={styles.glowBL}></div>
      <div className={styles.glowTR}></div>

      <div className={styles.container}>
        {/* Left: Text content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className={styles.greeting}>Bonjour, je suis</span>
          <h1 className={styles.name}>
            Desir Lloyd<br />Barry Johanson
          </h1>

          <div className={styles.typewriterWrapper}>
            <span className={styles.typePrefix}>&lt; </span>
            <TypeAnimation
              sequence={[
                'Fullstack Developer', 2200,
                'React Specialist', 2200,
                'Problem Solver', 2200,
                'UI/UX Enthusiast', 2200,
              ]}
              wrapper="span"
              speed={50}
              className={`gradient-text ${styles.typeText}`}
              repeat={Infinity}
            />
            <span className={styles.typePrefix}> /&gt;</span>
          </div>

          <p className={styles.description}>
            Je conçois des expériences web modernes, performantes et hautement
            interactives avec une attention méticuleuse au design et à la qualité du code.
          </p>

          <div className={styles.ctaGroup}>
            <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
              Voir mes projets
            </a>
            <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
              Me contacter
            </a>
          </div>
        </motion.div>

        {/* Right: Profile photo (flips when About section hits viewport) */}
        <motion.div
          className={styles.photoWrapper}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <ProfilePhoto />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
