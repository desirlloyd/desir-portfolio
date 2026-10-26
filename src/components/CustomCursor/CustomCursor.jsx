import React, { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

/**
 * A custom mouse follower that creates a glowing cyan/purple halo.
 * It expands when hovering over clickable elements (a, button, input, textarea).
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use requestAnimationFrame for smooth 1:1 following without React state overhead
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const render = () => {
      // Direct 1:1 mapping for zero-latency tracking
      cursorX = mouseX;
      cursorY = mouseY;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeaveViewport = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseLeaveViewport);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseLeaveViewport);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  // Hide the native cursor globally when this is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.cursor = 'none';
      const interactives = document.querySelectorAll('a, button, input, textarea');
      interactives.forEach(el => {
        // We override the default pointer cursor to keep it hidden
        // However, if we set it to 'none', we lose the browser's native text selection cursor on inputs.
        // For a premium feel, hiding it everywhere is common.
        el.style.cursor = 'none'; 
      });
    }

    return () => {
      document.body.style.cursor = '';
      const interactives = document.querySelectorAll('a, button, input, textarea');
      interactives.forEach(el => el.style.cursor = '');
    };
  }, [isVisible]);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${isHovering ? styles.hovered : ''} ${isVisible ? styles.visible : ''}`}
    />
  );
};

export default CustomCursor;
