import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiX } from 'react-icons/fi';
import { useLanguage } from '../../hooks/useLanguage';
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
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const triggerEl = triggerRef.current;

    // Move focus into the dialog
    const modal = modalRef.current;
    if (modal) modal.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;

      // Keep Tab cycling inside the dialog
      const focusables = modalRef.current.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside);
      document.body.style.overflow = '';
      // Return focus to the trigger
      triggerEl?.focus();
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
        ref={triggerRef}
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
            tabIndex={-1}
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
