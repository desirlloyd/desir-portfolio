import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaMobileAlt } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import styles from './ScreenGalleryModal.module.css';

const ScreenGalleryModal = ({ isOpen, onClose, project, initialIndex = 0 }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const screenshots = project?.screenshots || [];
  const totalScreens = screenshots.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalScreens - 1));
  }, [totalScreens]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalScreens - 1 ? prev + 1 : 0));
  }, [totalScreens]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !project || totalScreens === 0) return null;

  const currentScreenMeta = project.screens?.[currentIndex] || {
    title: `${t('projects.screenOf') || 'Écran'} ${currentIndex + 1}`,
    desc: ''
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className={styles.modal}
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.projectBadge}>
                <FaMobileAlt />
                <span>{project.title}</span>
                <span className={styles.badgeSeparator}>•</span>
                <span className={styles.screenCounter}>
                  {t('projects.screenOf') || 'Écran'} {currentIndex + 1} {t('projects.of') || 'sur'} {totalScreens}
                </span>
              </div>
            </div>

            <button 
              className={styles.closeBtn} 
              onClick={onClose}
              aria-label={t('projects.closeGallery') || 'Fermer'}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className={styles.viewerContainer}>
            {/* Prev Button */}
            <button 
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={handlePrev}
              aria-label={t('projects.prevScreen') || 'Précédent'}
            >
              <FaChevronLeft size={20} />
            </button>

            {/* Phone Screen Mockup - Exactly respects image proportions */}
            <div className={styles.phoneFrame}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={screenshots[currentIndex].image}
                  alt={currentScreenMeta.title || `${project.title} - ${currentIndex + 1}`}
                  className={styles.screenshotImg}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button 
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={handleNext}
              aria-label={t('projects.nextScreen') || 'Suivant'}
            >
              <FaChevronRight size={20} />
            </button>
          </div>

          {/* Screen Details & Description */}
          <div className={styles.detailsArea}>
            <div className={styles.screenTitleRow}>
              <span className={styles.screenIndexPill}>{currentIndex + 1}/{totalScreens}</span>
              <h3 className={styles.screenTitle}>{currentScreenMeta.title}</h3>
            </div>
            {currentScreenMeta.desc && (
              <p className={styles.screenDesc}>{currentScreenMeta.desc}</p>
            )}
          </div>

          {/* Navigation Dots */}
          <div className={styles.navDotsContainer}>
            {screenshots.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.navDot} ${idx === currentIndex ? styles.navDotActive : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${t('projects.screenOf') || 'Écran'} ${idx + 1}`}
                title={`${t('projects.screenOf') || 'Écran'} ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenGalleryModal;
