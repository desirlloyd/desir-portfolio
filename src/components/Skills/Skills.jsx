import React, { useRef, useEffect } from 'react';
import { 
  FaHtml5, FaJs, FaPhp, FaPython, FaDatabase, FaBrain, FaWindows, FaServer, FaNetworkWired, FaFileWord, FaFileExcel, FaReact 
} from 'react-icons/fa';
import { SiNextdotjs, SiVite, SiVuedotjs, SiAngular, SiTailwindcss } from 'react-icons/si';
import Typewriter from '../Typewriter/Typewriter';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
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

const SKILLS_DATA = [
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
  { id: 'prompt', name: 'Prompt Engineering', category: 'ai', icon: <FaBrain color="#FF69B4" />, className: styles.nodeAi },
  { id: 'windows', name: 'Windows', category: 'infra', icon: <FaWindows color="#0078D7" />, className: styles.nodeInfra },
  { id: 'win_server', name: 'Windows Server', category: 'infra', icon: <FaServer color="#C0C0C0" />, className: styles.nodeInfra },
  { id: 'net_admin', name: 'Administration Réseau', category: 'infra', icon: <FaNetworkWired color="#1E90FF" />, className: styles.nodeInfra },
  { id: 'word', name: 'Microsoft Word', category: 'office', icon: <FaFileWord color="#2B579A" />, className: styles.nodeOffice },
  { id: 'excel', name: 'Microsoft Excel', category: 'office', icon: <FaFileExcel color="#217346" />, className: styles.nodeOffice }
];

const Skills = () => {
  const { language: currentLang, t: translate } = useLanguage();
  const reducedMotion = useReducedMotion();

  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const lineRefs = useRef([]);

  // Localized skill labels
  const netAdminText = currentLang === 'ht' ? 'Administrasyon Rezo' : (currentLang === 'en' ? 'Network Administration' : 'Administration Réseau');

  const getSkillLabel = (skill) => {
    if (skill.id === 'net_admin') return netAdminText;
    return skill.name;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize dimensions and physical state of nodes
    let containerWidth = container.clientWidth;
    let containerHeight = container.clientHeight;

    const nodesState = SKILLS_DATA.map((skill, idx) => {
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

    const drawLines = () => {
      // Draw connector lines using calculated centers
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
    };

    const drawNodes = () => {
      nodesState.forEach((node) => {
        if (node.el) {
          node.el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
        }
      });
    };

    // Reduced motion: settled static graph — nodes placed, lines connected, no physics loop
    if (reducedMotion) {
      const settle = () => {
        // Measure real node sizes, then clamp inside the container
        nodesState.forEach((node) => {
          if (node.el) {
            node.width = node.el.offsetWidth;
            node.height = node.el.offsetHeight;
            node.x = Math.max(5, Math.min(node.x, containerWidth - node.width - 5));
            node.y = Math.max(5, Math.min(node.y, containerHeight - node.height - 5));
          }
        });

        // Push overlapping nodes apart so the static graph stays readable
        for (let iter = 0; iter < 40; iter++) {
          for (let i = 0; i < nodesState.length; i++) {
            for (let j = i + 1; j < nodesState.length; j++) {
              const a = nodesState[i];
              const b = nodesState[j];
              if (!a.el || !b.el) continue;
              const overlapX =
                Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
              const overlapY =
                Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
              if (overlapX > 4 && overlapY > 4) {
                if (a.x <= b.x) { a.x -= overlapX / 2; b.x += overlapX / 2; }
                else { a.x += overlapX / 2; b.x -= overlapX / 2; }
                if (a.y <= b.y) { a.y -= overlapY / 2; b.y += overlapY / 2; }
                else { a.y += overlapY / 2; b.y -= overlapY / 2; }
              }
            }
          }
          nodesState.forEach((node) => {
            node.x = Math.max(5, Math.min(node.x, containerWidth - node.width - 5));
            node.y = Math.max(5, Math.min(node.y, containerHeight - node.height - 5));
          });
        }

        drawNodes();
        drawLines();
      };

      settle();
      // Re-settle once webfonts land (glyph widths shift the node boxes)
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(settle);
      }
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Physics Animation
    let rafId = null;

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

      drawLines();

      rafId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = null;
    };

    // Only run the physics loop while the graph is on screen
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    // Delay start slightly to let the DOM paint and nodes take their sizes
    const startTimeout = setTimeout(() => {
      // Re-measure widths/heights once to get precise numbers after paint
      nodesState.forEach((node) => {
        if (node.el) {
          node.width = node.el.offsetWidth;
          node.height = node.el.offsetHeight;
        }
      });
    }, 150);

    return () => {
      clearTimeout(startTimeout);
      visibilityObserver.disconnect();
      stopLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            <Typewriter 
              key={currentLang}
              segments={translate('skills.title').split(' ').map((part, idx, arr) => ({
                text: part + (idx < arr.length - 1 ? ' ' : ''),
                className: idx === arr.length - 1 ? 'title-accent' : ''
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
          {SKILLS_DATA.map((skill) => (
            <div
              key={skill.id}
              ref={el => nodeRefs.current[skill.id] = el}
              className={`${styles.skillNode} ${skill.className}`}
            >
              <span className={styles.icon}>{skill.icon}</span>
              <span>{getSkillLabel(skill)}</span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Skills;
