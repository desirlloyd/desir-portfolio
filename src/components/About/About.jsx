import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './About.module.css';

// Individual stat card with its own custom count-up trigger
const StatCard = ({ stat }) => {
  const [count, countRef] = useCountUp(stat.number, 2200);
  return (
    <div className={styles.statBox} ref={countRef}>
      <h4 className={styles.statNumber}>
        {count}<span className={styles.accent}>{stat.suffix}</span>
      </h4>
      <p className={styles.statLabel}>{stat.label}</p>
    </div>
  );
};

const stats = [
  { number: 3, suffix: '+', label: "Ans d'expérience" },
  { number: 20, suffix: '+', label: 'Projets livrés' },
  { number: 10, suffix: '+', label: 'Clients satisfaits' },
];

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            À <span className="gradient-text typewriter-target" data-word="propos"></span>
          </h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles.content}>
          <motion.div
            className={styles.photoWrapper}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
          >
            <ProfilePhoto />
          </motion.div>

          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className={styles.subtitle}>
              Passionné par le code et l'expérience utilisateur
            </h3>
            <p className={styles.bio}>
              En tant que développeur fullstack, j'allie expertise technique et sensibilité design
              pour créer des applications web qui sont non seulement fonctionnelles, mais aussi captivantes.
            </p>
            <p className={styles.bio}>
              J'ai travaillé sur divers projets allant de l'intégration d'interfaces complexes à
              l'architecture de systèmes backend robustes. Mon approche est centrée sur la qualité du code,
              les performances et l'innovation continue.
            </p>

            <div className={styles.statsContainer}>
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
