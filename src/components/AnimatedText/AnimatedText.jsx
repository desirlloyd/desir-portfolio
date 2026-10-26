import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Staggered Text Reveal Component
 * Splits text into words and animates them sliding up from an invisible mask.
 */
const AnimatedText = ({ text1, highlightText, className, once = true, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 50,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  const words1 = text1 ? text1.split(' ') : [];
  const words2 = highlightText ? highlightText.split(' ') : [];

  return (
    <motion.h2
      ref={ref}
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {words1.map((word, index) => (
        <span key={`w1-${index}`} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span style={{ display: 'inline-block' }} variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
      {words2.length > 0 && (
        <span className="gradient-text" style={{ display: 'flex', gap: '0.3em' }}>
          {words2.map((word, index) => (
            <span key={`w2-${index}`} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span style={{ display: 'inline-block' }} variants={child}>
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </motion.h2>
  );
};

export default AnimatedText;
