import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { FiMenu, FiX, FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../hooks/useLanguage';
import CvDownload from '../CvDownload/CvDownload';

const navLinks = [
  { key: 'nav.hero', href: '#hero' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
];

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'ht', label: 'Créole Haïtien' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!langDropdownOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [langDropdownOpen]);

  // Lock scroll and handle Escape key for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLangKeyDown = (e) => {
    if (!langDropdownOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setLangDropdownOpen(true);
      }
      return;
    }

    const currentIndex = languages.findIndex((l) => l.code === language);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % languages.length;
      setLanguage(languages[nextIndex].code);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + languages.length) % languages.length;
      setLanguage(languages[prevIndex].code);
    }
  };

  useEffect(() => {
    const detectSection = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = 'hero';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 180) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', detectSection, { passive: true });
    detectSection(); // run on mount
    return () => window.removeEventListener('scroll', detectSection);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo}>
          DLBJ<span className="gradient-text">.</span>
        </a>

        {/* Desktop Menu */}
        <div className={styles.desktopNavGroup}>
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className={activeSection === link.href.substring(1) ? styles.active : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Controls (Language + Hamburger) */}
        <div className={styles.rightControls}>
          <CvDownload className={styles.cvDownloadBtn} iconSize={16}>
            <span className={styles.cvDownloadText}>{t('hero.downloadCV')}</span>
          </CvDownload>

          <div className={styles.langSwitcher} ref={dropdownRef}>
            <button
              className={styles.langBtn}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onKeyDown={handleLangKeyDown}
              aria-label={t('nav.changeLanguage')}
              aria-haspopup="menu"
              aria-expanded={langDropdownOpen}
              aria-controls="lang-menu"
            >
              <FiGlobe size={16} />
              <span className={styles.langText}>{language.toUpperCase()}</span>
              <FiChevronDown size={14} className={`${styles.chevron} ${langDropdownOpen ? styles.rotate : ''}`} />
            </button>
            <div
              id="lang-menu"
              role="menu"
              className={`${styles.langDropdown} ${langDropdownOpen ? styles.open : ''}`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  role="menuitemradio"
                  aria-checked={language === lang.code}
                  className={`${styles.langOption} ${language === lang.code ? styles.active : ''}`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('nav.menu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}
      >
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                className={activeSection === link.href.substring(1) ? styles.active : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
          <li className={styles.mobileCvLi}>
            <CvDownload
              className={styles.mobileCvDownloadBtn}
              iconSize={16}
              onAfterDownload={() => setMobileMenuOpen(false)}
            >
              <span>{t('hero.downloadCV')}</span>
            </CvDownload>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
