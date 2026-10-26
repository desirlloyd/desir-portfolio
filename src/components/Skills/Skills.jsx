import React, { useRef, useEffect, useState } from 'react';
import { 
  FaHtml5, FaJs, FaPhp, FaPython, FaDatabase, FaBrain, FaWindows, FaServer, FaNetworkWired, FaFileWord, FaFileExcel, FaReact 
} from 'react-icons/fa';
import { SiNextdotjs, SiVite, SiVuedotjs, SiAngular, SiTailwindcss } from 'react-icons/si';
import Typewriter from '../Typewriter/Typewriter';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Skills.module.css';

// Connections between related skills
const connections = [
  { from: 'html_css', to: 'js' },
  { from: 'html_css', to: 'tailwind' },
  { from: 'js', to: 'react' },
  { from: 'js', to: 'vue' },
  { from: 'js', to: 'angular' },
  { from: 'react', to: 'next' },
  { from: 'react', to: 'vite' },
  { from: 'vue', to: 'vite' },
  { from: 'react', to: 'tailwind' },
  { from: 'js', to: 'php' },
  { from: 'php', to: 'sql' },
  { from: 'python', to: 'sql' },
  { from: 'python', to: 'prompt' },
  { from: 'windows', to: 'win_server' },
  { from: 'win_server', to: 'net_admin' },
  { from: 'windows', to: 'net_admin' },
  { from: 'windows', to: 'word' },
  { from: 'windows', to: 'excel' },
  { from: 'sql', to: 'win_server' },
  { from: 'python', to: 'windows' }
];

const Skills = () => {
  const { language, t } = () => {
    // In case hook is outside or not initialized, safely call useLanguage
    try {
      return useLanguage();
    } catch (e) {
      return { language: 'fr', t: (k) => k };
    }
  };
  const langContext = useLanguage();
  const currentLang = langContext ? langContext.language : 'fr';
  const translate = langContext ? langContext.t : (k) => k;

  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const lineRefs = useRef([]);

  // Localized skill labels
  const promptText = 'Prompt Engineering';
  const netAdminText = currentLang === 'ht' ? 'Administrasyon Rezo' : (currentLang === 'en' ? 'Network Administration' : 'Administration Réseau');

  const skillsData = [
    { id: 'html_css', name: 'HTML, CSS', category: 'web', icon: <FaHtml5 color="#E34F26" />, className: styles.nodeWeb },
    { id: 'js', name: 'JavaScript', category: 'web', icon: <FaJs color="#F7DF1E" />, className: styles.nodeWeb },
    { id: 'react', name: 'React.js', category: 'web', icon: <FaReact color="#61DAFB" />, className: styles.nodeWeb },
    { id: 'next', name: 'Next.js', category: 'web', icon: <SiNextdotjs color="#FFFFFF" />, className: styles.nodeWeb },
    { id: 'vite', name: 'Vite', category: 'web', icon: <SiVite color="#646CFF" />, className: styles.nodeWeb },
    { id: 'vue', name: 'Vue', category: 'web', icon: <SiVuedotjs color="#4FC08D" />, className: styles.nodeWeb },
    { id: 'angular', name: 'Angular', category: 'web', icon: <SiAngular color="#DD0031" />, className: styles.nodeWeb },
    { id: 'tailwind', name: 'Tailwind', category: 'web', icon: <SiTailwindcss color="#06B6D4" />, className: styles.nodeWeb },
    { id: 'php', name: 'PHP', category: 'web', icon: <FaPhp color="#777BB4" />, className: styles.nodeWeb },
    { id: 'sql', name: 'SQL', category: 'web', icon: <FaDatabase color="#00FFFF" />, className: styles.nodeWeb },
    { id: 'python', name: 'Python', category: 'web', icon: <FaPython color="#3776AB" />, className: styles.nodeWeb },
    { id: 'prompt', name: promptText, category: 'ai', icon: <FaBrain color="#FF69B4" />, className: styles.nodeAi },
    { id: 'windows', name: 'Windows', category: 'infra', icon: <FaWindows color="#0078D7" />, className: styles.nodeInfra },
    { id: 'win_server', name: 'Windows Server', category: 'infra', icon: <FaServer color="#C0C0C0" />, className: styles.nodeInfra },
    { id: 'net_admin', name: netAdminText, category: 'infra', icon: <FaNetworkWired color="#1E90FF" />, className: styles.nodeInfra },
    { id: 'word', name: 'Microsoft Word', category: 'office', icon: <FaFileWord color="#2B579A" />, className: styles.nodeOffice },
    { id: 'excel', name: 'Microsoft Excel', category: 'office', icon: <FaFileExcel color="#217346" />, className: styles.nodeOffice }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize dimensions and physical state of nodes
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    const nodesState = skillsData.map((skill, idx) => {
      const el = nodeRefs.current[skill.id];
      const width = el ? el.offsetWidth : 120;
      const height = el ? el.offsetHeight : 40;

      // Disperse nodes starting at evenly distributed positions to avoid clump overlapping on start
      const rows = 4;
      const cols = 5;
      const r = Math.floor(idx / cols);
      const c = idx % cols;

      const startX = (containerWidth / cols) * (c + 0.2) + (Math.random() - 0.5) * 30;
      const startY = (containerHeight / rows) * (r + 0.2) + (Math.random() - 0.5) * 30;

      // Random speed vector between 0.35 and 0.8 pixels per frame
      const speedMagnitude = 0.4 + Math.random() * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const vx = Math.cos(angle) * speedMagnitude;
      const vy = Math.sin(angle) * speedMagnitude;

      return {
        id: skill.id,
        el,
        x: Math.max(10, Math.min(startX, containerWidth - width - 10)),
        y: Math.max(10, Math.min(startY, containerHeight - height - 10)),
        vx,
        vy,
        width,
        height
      };
    });

    // Handle resizing to update container dimensions and clamp nodes safely inside
    const handleResize = () => {
      if (!container) return;
      containerWidth = container.clientWidth;
      containerHeight = container.clientHeight;

      nodesState.forEach((node) => {
        const el = node.el;
        if (el) {
          node.width = el.offsetWidth;
          node.height = el.offsetHeight;
          // Re-clamp inside container boundaries
          node.x = Math.max(5, Math.min(node.x, containerWidth - node.width - 5));
          node.y = Math.max(5, Math.min(node.y, containerHeight - node.height - 5));
        }
      });
    };

    window.addEventListener('resize', handleResize);

    // Physics Animation and SVG line updates
    let rafId;

    const animate = () => {
      // 1. Move each node and bounce on boundaries
      nodesState.forEach((node) => {
        if (!node.el) return;

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce left/right walls
        if (node.x <= 0) {
          node.x = 0;
          node.vx = Math.abs(node.vx); // Move right
        } else if (node.x + node.width >= containerWidth) {
          node.x = containerWidth - node.width;
          node.vx = -Math.abs(node.vx); // Move left
        }

        // Bounce top/bottom walls
        if (node.y <= 0) {
          node.y = 0;
          node.vy = Math.abs(node.vy); // Move down
        } else if (node.y + node.height >= containerHeight) {
          node.y = containerHeight - node.height;
          node.vy = -Math.abs(node.vy); // Move up
        }

        // Apply hardware-accelerated transformation directly to DOM element
        node.el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
      });

      // 2. Draw connector lines using calculated centers
      connections.forEach((conn, index) => {
        const lineEl = lineRefs.current[index];
        const fromNode = nodesState.find(n => n.id === conn.from);
        const toNode = nodesState.find(n => n.id === conn.to);

        if (lineEl && fromNode && toNode) {
          const x1 = fromNode.x + fromNode.width / 2;
          const y1 = fromNode.y + fromNode.height / 2;
          const x2 = toNode.x + toNode.width / 2;
          const y2 = toNode.y + toNode.height / 2;

          lineEl.setAttribute('x1', x1.toString());
          lineEl.setAttribute('y1', y1.toString());
          lineEl.setAttribute('x2', x2.toString());
          lineEl.setAttribute('y2', y2.toString());
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    // Delay start slightly to let the DOM paint and nodes take their sizes
    const startTimeout = setTimeout(() => {
      // Re-measure widths/heights once to get precise numbers after paint
      nodesState.forEach((node) => {
        if (node.el) {
          node.width = node.el.offsetWidth;
          node.height = node.el.offsetHeight;
        }
      });
      rafId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCategoryTitle = (key) => {
    return translate(`skills.categories.${key}`) || key;
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            <Typewriter 
              key={currentLang}
              segments={translate('skills.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'gradient-text' : ''
              }))} 
            />
          </h2>
          <div className={styles.line}></div>
        </div>

        {/* Interactive Floating Graph Container */}
        <div ref={containerRef} className={styles.graphContainer}>
          
          {/* Dynamic SVG Mesh Lines */}
          <svg className={styles.svgOverlay}>
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(183, 255, 90, 0.28)" />
                <stop offset="100%" stopColor="rgba(255, 180, 84, 0.28)" />
              </linearGradient>
            </defs>
            {connections.map((conn, idx) => (
              <line
                key={idx}
                ref={el => lineRefs.current[idx] = el}
                stroke="url(#line-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* Floating Skill Node Circles */}
          {skillsData.map((skill) => (
            <div
              key={skill.id}
              ref={el => nodeRefs.current[skill.id] = el}
              className={`${styles.skillNode} ${skill.className}`}
            >
              <span className={styles.icon}>{skill.icon}</span>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Skills;
