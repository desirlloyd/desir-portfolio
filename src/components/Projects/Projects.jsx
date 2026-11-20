import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaMobileAlt } from 'react-icons/fa';
import Typewriter from '../Typewriter/Typewriter';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import budgetTrackerImg from '../../assets/budgettracker.png';
import ginTypeImg from '../../assets/gintype.png';
import word2pdfImg from '../../assets/word2pdf.png';
import { kesbizScreens, img02 } from './kesbizData';
import ScreenGalleryModal from './ScreenGalleryModal';
import styles from './Projects.module.css';

const projectsData = [
  {
    title: 'KesBiz',
    description: 'Application mobile de gestion de produits et point de vente (POS) pour commerces. Suivi des stocks en temps réel avec alertes, carnet de crédit client, gestion des dépenses et encaissement multi-moyens (Cash, MonCash, Natcash).',
    image: img02,
    screenshots: kesbizScreens,
    tags: ['React Native', 'Supabase'],
    isMobileApp: true
  },
  {
    title: 'BudgetTracker',
    description: 'Application web de gestion de budget personnel pour suivre les revenus, les dépenses et le solde net, avec graphiques de tendances et historique des transactions.',
    image: budgetTrackerImg,
    tags: ['React', 'Vite'],
    live: 'https://budgettracker-dlbj.netlify.app/'
  },
  {
    title: 'GinType',
    description: 'Application web de test de vitesse de frappe pour mesurer le WPM et la précision, avec choix de durée et niveaux de texte.',
    image: ginTypeImg,
    tags: ['HTML', 'CSS', 'Javascript'],
    live: 'https://gintype-dlbj.netlify.app/'
  },
  {
    title: 'Word2PDF',
    description: 'Application web de conversion de documents Word en PDF, avec traitement 100% local pour garantir la confidentialité des fichiers.',
    image: word2pdfImg,
    tags: ['Typescript', 'Python'],
    live: 'https://word2pdf-dlbj.netlify.app/'
  }
];

const ProjectCard = ({ project, index, onOpenGallery }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const totalSlides = hasScreenshots ? project.screenshots.length : 1;

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  // 3D Tilt Effect State
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const currentDisplayImage = hasScreenshots
    ? project.screenshots[currentSlide].image
    : project.image;

  return (
    <div ref={ref} style={{ perspective: reducedMotion ? 'none' : '1500px' }}>
      <motion.div 
        className={styles.card}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: reducedMotion ? 'flat' : 'preserve-3d'
        }}
      >
        <motion.div 
          className={styles.glare} 
          style={{ 
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)` 
          }} 
        />
        <div style={{ transform: "translateZ(30px)" }}>
          <div 
            className={`${styles.imageContainer} ${project.isMobileApp ? styles.mobileImageContainer : ''}`}
            onClick={hasScreenshots ? () => onOpenGallery(project, currentSlide) : undefined}
            style={{ cursor: hasScreenshots ? 'pointer' : 'default' }}
          >
            {project.isMobileApp && (
              <span className={styles.mobileBadge}>
                <FaMobileAlt />
                <span>{t('projects.mobileApp') || 'App Mobile'}</span>
                <span>•</span>
                <span>{currentSlide + 1}/{totalSlides}</span>
              </span>
            )}

            <img 
              src={currentDisplayImage} 
              alt={project.title} 
              loading="lazy" 
              className={project.isMobileApp ? styles.cardMobileImg : ''} 
            />

            {/* Quick in-card pagination controls for mobile screenshots */}
            {hasScreenshots && (
              <>
                <button
                  type="button"
                  className={`${styles.cardNavBtn} ${styles.cardNavPrev}`}
                  onClick={handlePrevSlide}
                  aria-label={t('projects.prevScreen') || 'Précédent'}
                  title={t('projects.prevScreen') || 'Précédent'}
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  type="button"
                  className={`${styles.cardNavBtn} ${styles.cardNavNext}`}
                  onClick={handleNextSlide}
                  aria-label={t('projects.nextScreen') || 'Suivant'}
                  title={t('projects.nextScreen') || 'Suivant'}
                >
                  <FaChevronRight size={12} />
                </button>

                <div className={styles.cardDots}>
                  {project.screenshots.map((_, dotIdx) => (
                    <span 
                      key={dotIdx}
                      className={`${styles.cardDot} ${dotIdx === currentSlide ? styles.cardDotActive : ''}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className={styles.overlay}>
              <div className={styles.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label={t('projects.sourceCode')}>
                    <FaGithub size={20} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label={t('projects.visitSite')}>
                    <FaExternalLinkAlt size={20} />
                  </a>
                )}
                {hasScreenshots && (
                  <button 
                    type="button"
                    className={styles.iconLink} 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGallery(project, currentSlide);
                    }}
                    aria-label={t('projects.visitSite')}
                    title={t('projects.visitSite')}
                  >
                    <FaExternalLinkAlt size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.content}>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const { language, t } = useLanguage();
  const [galleryModal, setGalleryModal] = useState({
    isOpen: false,
    project: null,
    initialIndex: 0
  });

  const handleOpenGallery = (project, initialIndex = 0) => {
    setGalleryModal({
      isOpen: true,
      project,
      initialIndex
    });
  };

  const handleCloseGallery = () => {
    setGalleryModal((prev) => ({
      ...prev,
      isOpen: false
    }));
  };

  const getTranslatedProject = (index, originalProject) => {
    const translatedTitle = t(`projects.items.${index}.title`);
    const translatedDesc = t(`projects.items.${index}.description`);
    const translatedScreens = t(`projects.items.${index}.screens`);
    return {
      ...originalProject,
      title: translatedTitle !== `projects.items.${index}.title` ? translatedTitle : originalProject.title,
      description: translatedDesc !== `projects.items.${index}.description` ? translatedDesc : originalProject.description,
      screens: Array.isArray(translatedScreens) ? translatedScreens : originalProject.screens
    };
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            <Typewriter 
              key={language}
              segments={t('projects.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'title-accent' : ''
              }))} 
            />
          </h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project, index) => {
            const translatedProject = getTranslatedProject(index, project);
            return (
              <ProjectCard 
                key={index} 
                project={translatedProject} 
                index={index} 
                onOpenGallery={handleOpenGallery}
              />
            );
          })}
        </div>
      </div>

      {galleryModal.isOpen && (
        <ScreenGalleryModal
          key={`${galleryModal.project?.title}-${galleryModal.initialIndex}`}
          isOpen={galleryModal.isOpen}
          onClose={handleCloseGallery}
          project={galleryModal.project}
          initialIndex={galleryModal.initialIndex}
        />
      )}
    </section>
  );
};

export default Projects;
