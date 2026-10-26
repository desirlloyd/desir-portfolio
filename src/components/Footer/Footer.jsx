import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3>Desir Lloyd Barry Johanson</h3>
            <p className={styles.tagline}>{t('footer.tagline')}</p>
          </div>
          
          <div className={styles.socials}>
            <a href="https://github.com/lloyddesir" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/lloyd-b-j-desir-5a24b83b7/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Desir Lloyd Barry Johanson. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
