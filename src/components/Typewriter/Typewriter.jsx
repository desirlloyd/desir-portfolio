import React, { useState, useEffect, useRef, Fragment } from 'react';

/**
 * Reusable Typewriter component.
 * Types the phrase sequentially and stops, leaving a blinking cursor at the end.
 * Supports multiple segments with different classNames (e.g. static text + gradient text).
 * Uses IntersectionObserver to start typing only when it enters the viewport.
 */
const Typewriter = ({ word, segments, delay = 80 }) => {
  const resolvedSegments = segments || [{ text: word || '', className: '' }];
  const fullText = resolvedSegments.map(s => s.text).join('');
  
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let timer;
    if (!isDeleting && charIndex === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 3000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      timer = setTimeout(() => setIsDeleting(false), 800); // Pause before typing again
    } else {
      timer = setTimeout(() => {
        setCharIndex(prev => prev + (isDeleting ? -1 : 1));
      }, isDeleting ? delay / 2 : delay);
    }
    
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, fullText, delay, isStarted]);

  // Distribute the current typed characters across the segments
  let remainingChars = charIndex;
  const renderedElements = resolvedSegments.map((segment, idx) => {
    if (remainingChars <= 0) return null;
    
    const textLength = segment.text.length;
    const textToRender = segment.text.substring(0, remainingChars);
    remainingChars -= textLength;

    if (segment.className) {
      return (
        <span key={idx} className={segment.className}>
          {textToRender}
        </span>
      );
    }
    return <Fragment key={idx}>{textToRender}</Fragment>;
  });

  return (
    <span ref={containerRef} className="typewriter-container">
      {renderedElements}
      <span className="typewriter-cursor">_</span>
      <style>{`
        .typewriter-container {
          display: inline-block;
          white-space: nowrap;
        }
        .typewriter-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: typewriterBlink 0.6s step-end infinite;
          color: inherit;
        }
        @keyframes typewriterBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default Typewriter;
