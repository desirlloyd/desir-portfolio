import React, { useEffect, useRef, useMemo } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiMongodb } from 'react-icons/si';
import styles from './ParticlesBackground.module.css';

const LOGO_COMPONENTS = [
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, 
  FaNodeJs, FaPython, FaDocker, FaGitAlt, 
  SiTypescript, SiMongodb
];

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const logosRef = useRef([]);

  // Generate stable random properties for the logos on mount
  const logosData = useMemo(() => {
    return LOGO_COMPONENTS.map((Icon, idx) => ({
      Icon,
      id: idx,
      x: Math.random() * 100, // percentage vw
      y: Math.random() * 100, // percentage vh
      yOffset: 0, // dynamic offset for floating
      floatSpeed: Math.random() > 0.5 ? Math.random() * 0.4 + 0.1 : 0, // roughly half will float up slowly
      size: Math.random() * 60 + 50, // px size between 50 and 110 on desktop
      depth: Math.random() * 0.4 + 0.1, // parallax scroll speed
      opacity: Math.random() * 0.3 + 0.15, // more visible (0.15 to 0.45)
      rotateSpeed: (Math.random() - 0.5) * 0.3, // slightly slower rotation
      currentRotation: Math.random() * 360,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationFrameId;
    let scrollY = window.scrollY;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Track scroll for parallax effect
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 2; // Spread out more vertically
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        
        // GINKTIK.OS Particle palette: Phosphor green, Amber orange, Crisp light
        const colors = ['rgba(183, 255, 90, ', 'rgba(255, 180, 84, ', 'rgba(240, 244, 239, '];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1; // Very subtle
        
        // Depth determines how much scroll parallax affects it
        this.depth = Math.random() * 0.5 + 0.1;
      }

      update() {
        // Natural drift
        this.y -= this.speedY;
        this.x += this.speedX;

        // Reset if offscreen (top)
        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }

      draw() {
        // Calculate parallax Y position
        const parallaxY = this.y - (scrollY * this.depth * 0.5);
        
        // Wrap parallax position to always stay on screen vertically
        let drawY = parallaxY % height;
        if (drawY < 0) drawY += height;

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.fill();
        
        // Optional glow
        if (this.size > 1.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `${this.colorBase}0.5)`;
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particles = [];
      const particleCount = Math.min(width * 0.1, 100); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Also animate the DOM logos for high-performance parallax
      logosData.forEach((data, i) => {
        const el = logosRef.current[i];
        if (el) {
          // Update natural upward float
          data.yOffset -= data.floatSpeed;

          // Parallax Y calculation
          // Base Y is percentage of screen height + the float offset
          const baseY = (data.y / 100) * height + data.yOffset;
          const parallaxY = baseY - (scrollY * data.depth);
          
          // Wrap around screen with a larger margin for bigger logos
          const wrapHeight = height + 200;
          let drawY = parallaxY % wrapHeight;
          if (drawY < -100) {
            drawY += wrapHeight;
            // Also reset float offset when it wraps so it doesn't drift infinitely negative 
            // and lose sync with the initial random y
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

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [logosData]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.particlesCanvas} />
      <div className={styles.logosOverlay}>
        {logosData.map((data, idx) => {
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
