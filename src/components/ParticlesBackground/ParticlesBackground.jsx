import React, { useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb } from 'react-icons/si';
import styles from './ParticlesBackground.module.css';

const LOGO_COMPONENTS = [
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, 
  FaNodeJs, FaPython, FaDocker, FaGitAlt, 
  SiTypescript, SiMongodb
];

// Stable logo attributes generated once at module load (outside render cycle)
const LOGOS_DATA = LOGO_COMPONENTS.map((Icon, idx) => ({
  Icon,
  id: idx,
  x: Math.random() * 100, // percentage vw
  y: Math.random() * 100, // percentage vh
  yOffset: 0, // dynamic offset for floating
  floatSpeed: Math.random() > 0.5 ? Math.random() * 0.4 + 0.1 : 0, // roughly half will float up slowly
  size: Math.random() * 60 + 50, // px size between 50 and 110 on desktop
  depth: Math.random() * 0.4 + 0.1, // parallax scroll speed
  opacity: Math.random() * 0.3 + 0.15, // visible (0.15 to 0.45)
  rotateSpeed: (Math.random() - 0.5) * 0.3, // slow rotation
  currentRotation: Math.random() * 360,
}));

const ParticlesBackground = () => {
  const logosRef = useRef([]);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId;
    let scrollY = window.scrollY;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    // Reduced motion: draw one composed static frame — no animation loops
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const positionStatic = () => {
        LOGOS_DATA.forEach((data, i) => {
          const el = logosRef.current[i];
          if (el) {
            const baseY = (data.y / 100) * height;
            el.style.transform = `translate3d(${data.x}vw, ${baseY}px, 0) rotate(${data.currentRotation}deg)`;
          }
        });
      };

      positionStatic();
      window.addEventListener('resize', positionStatic);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', positionStatic);
      };
    }

    // Track scroll for parallax effect
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      // Animate the DOM logos for parallax and float
      LOGOS_DATA.forEach((data, i) => {
        const el = logosRef.current[i];
        if (el) {
          // Update natural upward float
          data.yOffset -= data.floatSpeed;

          // Parallax Y calculation
          const baseY = (data.y / 100) * height + data.yOffset;
          const parallaxY = baseY - (scrollY * data.depth);
          
          // Wrap around screen with a larger margin for bigger logos
          const wrapHeight = height + 200;
          let drawY = parallaxY % wrapHeight;
          if (drawY < -100) {
            drawY += wrapHeight;
            if (data.yOffset < -wrapHeight) {
              data.yOffset = 0;
            }
          }
          
          data.currentRotation += data.rotateSpeed;

          // Apply transform directly to DOM node
          el.style.transform = `translate3d(${data.x}vw, ${drawY}px, 0) rotate(${data.currentRotation}deg)`;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Pause the loop entirely while the tab is hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logosOverlay}>
        {LOGOS_DATA.map((data, idx) => {
          const Tag = data.Icon;
          return (
            <div
              key={data.id}
              ref={(el) => (logosRef.current[idx] = el)}
              className={styles.floatingLogo}
              style={{
                fontSize: `${data.size}px`,
                opacity: data.opacity,
              }}
            >
              <Tag />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticlesBackground;
