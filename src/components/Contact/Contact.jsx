import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Typewriter from '../Typewriter/Typewriter';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendContactMessage } from '../../utils/sendContactMessage';
import styles from './Contact.module.css';

const Contact = () => {
  const { language, t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.line}></div>
          <h2 className={styles.title}>
            <Typewriter 
              key={language}
              segments={t('contact.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'gradient-text' : ''
              }))} 
            />
          </h2>
        </div>

        <div className={styles.content}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h3>{t('contact.subtitle')}</h3>
            <p>{t('contact.description')}</p>
            
            <div className={styles.infoItems}>
              <div className={styles.infoBox}>
                <div className={styles.iconWrapper}><FaEnvelope /></div>
                <div>
                  <h4>{t('contact.cards.email')}</h4>
                  <a href="mailto:gintik002@gmail.com">gintik002@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.iconWrapper}><FaMapMarkerAlt /></div>
                <div>
                  <h4>{t('contact.cards.location')}</h4>
                  <p>{t('contact.locationVal')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className={styles.contactForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">{t('contact.form.name')}</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder={t('contact.form.placeholderName')}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">{t('contact.form.email')}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder={t('contact.form.placeholderEmail')}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder={t('contact.form.placeholderMessage')}
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
            </button>

            {status === 'success' && (
              <p className={`${styles.formStatus} ${styles.success}`} role="status">
                {t('contact.form.success')}
              </p>
            )}

            {status === 'error' && (
              <p className={`${styles.formStatus} ${styles.error}`} role="alert">
                {t('contact.form.error')}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
