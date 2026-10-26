import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedText from '../AnimatedText/AnimatedText';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Experience.module.css';

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isEven = index % 2 === 0;

  return (
    <div className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`} ref={ref}>
      <motion.div 
        className={styles.timelineContent}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.date}>{item.date}</div>
        <h3 className={styles.jobTitle}>{item.title}</h3>
        <h4 className={styles.company}>{item.company}</h4>
        <p className={styles.description}>{item.description}</p>
      </motion.div>
      
      <motion.div 
        className={styles.timelineIcon}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.3, type: 'spring' }}
      >
        {item.icon}
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experienceData = [
    {
      type: 'education',
      title: t('experience.items.0.title'),
      company: t('experience.items.0.company'),
      date: t('experience.items.0.date'),
      description: t('experience.items.0.description'),
      icon: <FaGraduationCap />
    },
    {
      type: 'work',
      title: t('experience.items.1.title'),
      company: t('experience.items.1.company'),
      date: t('experience.items.1.date'),
      description: t('experience.items.1.description'),
      icon: <FaBriefcase />
    },
    {
      type: 'education',
      title: t('experience.items.2.title'),
      company: t('experience.items.2.company'),
      date: t('experience.items.2.date'),
      description: t('experience.items.2.description'),
      icon: <FaGraduationCap />
    }
  ];

  // Split title dynamically (e.g. "Mon Parcours" -> "Mon", "Parcours")
  const titleText = t('experience.title');
  const titleParts = titleText.split(' ');
  const text1 = titleParts[0] || '';
  const highlightText = titleParts.slice(1).join(' ') || '';

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.sectionHeader}>
          <AnimatedText 
            text1={text1} 
            highlightText={highlightText} 
            className={styles.title} 
          />
          <div className={styles.line}></div>
        </div>

        <div className={styles.timeline}>
          <motion.div 
            className={styles.animatedLine} 
            style={{ scaleY }} 
          />
          {experienceData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
