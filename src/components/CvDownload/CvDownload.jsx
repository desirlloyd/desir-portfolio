import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiX } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
import cvFrench from '../../assets/CV-DLBJF.pdf';
import cvEnglish from '../../assets/CV-DLBJE.pdf';
import styles from './CvDownload.module.css';

const CV_FILES = {
  fr: {
    url: cvFrench,
    filename: 'CV_Desir_Lloyd_Barry_Johanson_FR.pdf'
  },
  en: {
    url: cvEnglish,
    filename: 'CV_Desir_Lloyd_Barry_Johanson_EN.pdf'
  }
};

const CvDownload = ({
  children,
  className = '',
  iconSize = 16,
  showIcon = true,
  onAfterDownload
}) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleDownload = (language) => {
    const { url, filename } = CV_FILES[language];
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
    onAfterDownload?.();
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {showIcon && <FiDownload size={iconSize} />}
        {children}
      </button>

      {open && createPortal(
        <div className={styles.overlay} role="presentation">
          <div
            ref={modalRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={t('cv.close')}
            >
              <FiX size={18} />
            </button>

            <h3 id="cv-modal-title" className={styles.title}>
              {t('cv.chooseLanguage')}
            </h3>
            <p className={styles.subtitle}>{t('cv.subtitle')}</p>

            <div className={styles.options}>
              <button
                type="button"
                className={styles.optionBtn}
                onClick={() => handleDownload('fr')}
              >
                <span className={styles.optionLabel}>{t('cv.french')}</span>
                <span className={styles.optionHint}>PDF</span>
              </button>
              <button
                type="button"
                className={styles.optionBtn}
                onClick={() => handleDownload('en')}
              >
                <span className={styles.optionLabel}>{t('cv.english')}</span>
                <span className={styles.optionHint}>PDF</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CvDownload;
