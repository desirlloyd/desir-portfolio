import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { FiMenu, FiX, FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../contexts/LanguageContext';
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const detectSection = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // ── ScrollScene: hero vs about ──────────────────────────────
      // #hero and #about live inside a position:sticky container and
      // are not in normal document flow. Detect them by computing the
      // scroll progress (p) within the 300vh wrapper.
      const sceneEl = document.querySelector('[data-scroll-scene]');
      if (sceneEl) {
        const sceneTop  = sceneEl.offsetTop;
        const sceneH    = sceneEl.offsetHeight - vh;
        if (scrollY >= sceneTop && scrollY < sceneTop + sceneEl.offsetHeight) {
          const p = Math.max(0, Math.min(1, (scrollY - sceneTop) / Math.max(sceneH, 1)));
          // hero fades out up to p=0.55, about fades in from p=0.55
          setActiveSection(p < 0.55 ? 'hero' : 'about');
          return;
        }
      }

      // ── Sections after the scroll scene ─────────────────────────
      const otherIds = ['skills', 'projects', 'contact'];
      let current = 'about'; // default if we're past the scene
      for (const id of otherIds) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 150) {
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
              aria-label="Change language"
            >
              <FiGlobe size={16} />
              <span className={styles.langText}>{language.toUpperCase()}</span>
              <FiChevronDown size={14} className={`${styles.chevron} ${langDropdownOpen ? styles.rotate : ''}`} />
            </button>
            <div className={`${styles.langDropdown} ${langDropdownOpen ? styles.open : ''}`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
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
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
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
