import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedText from '../AnimatedText/AnimatedText';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Typewriter from '../Typewriter/Typewriter';
import { useLanguage } from '../../contexts/LanguageContext';
import budgetTrackerImg from '../../assets/budgettracker.png';
import ginTypeImg from '../../assets/gintype.png';
import word2pdfImg from '../../assets/word2pdf.png';
import styles from './Projects.module.css';

const projectsData = [
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

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
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
    if (!cardRef.current) return;
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

  return (
    <div ref={ref} style={{ perspective: "1500px" }}>
      <motion.div 
        className={styles.card}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div 
          className={styles.glare} 
          style={{ 
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.1) 0%, transparent 60%)` 
          }} 
        />
        <div style={{ transform: "translateZ(30px)" }}>
          <div className={styles.imageContainer}>
            <img src={project.image} alt={project.title} loading="lazy" />
            <div className={styles.overlay}>
              <div className={styles.links}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="Code source">
                    <FaGithub size={20} />
                  </a>
                )}
                <a href={project.live} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="Voir le projet">
                  <FaExternalLinkAlt size={20} />
                </a>
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

  const getTranslatedProject = (index, originalProject) => {
    const translatedTitle = t(`projects.items.${index}.title`);
    const translatedDesc = t(`projects.items.${index}.description`);
    return {
      ...originalProject,
      title: translatedTitle !== `projects.items.${index}.title` ? translatedTitle : originalProject.title,
      description: translatedDesc !== `projects.items.${index}.description` ? translatedDesc : originalProject.description
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
                className: idx === arr.length - 1 ? 'gradient-text' : ''
              }))} 
            />
          </h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project, index) => {
            const translatedProject = getTranslatedProject(index, project);
            return <ProjectCard key={index} project={translatedProject} index={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
