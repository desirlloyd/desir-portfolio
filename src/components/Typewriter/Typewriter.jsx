import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reusable Typewriter component.
 * Types the phrase once when it enters the viewport, then leaves the
 * full text in place with a blinking cursor — no perpetual delete/retype
 * loop (headings must stay readable, not cycle).
 * Supports multiple segments with different classNames (e.g. static text + accent text).
 * Cursor styles come from the global .typewriter-* rules in index.css.
 */
const Typewriter = ({ word, segments, delay = 80 }) => {
  const resolvedSegments = segments || [{ text: word || '', className: '' }];
  const fullText = resolvedSegments.map((s) => s.text).join('');

  const reducedMotion = useReducedMotion();

  const [charIndex, setCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(
    () => reducedMotion || (typeof window !== 'undefined' && !window.IntersectionObserver)
  );
  const containerRef = useRef(null);

  const textLength = fullText.length;
  // Derive effective charIndex: under reduced motion, render complete text immediately
  const effectiveCharIndex = reducedMotion ? textLength : charIndex;

  // Start typing only when the heading enters the viewport
  useEffect(() => {
    if (reducedMotion || isStarted) return undefined;
    if (typeof window === 'undefined' || !window.IntersectionObserver) return undefined;

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
  }, [reducedMotion, isStarted]);

  // Type once, then stop — the heading stays put after landing
  useEffect(() => {
    if (!isStarted || reducedMotion) return undefined;
    if (charIndex >= textLength) return undefined;

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, isStarted, textLength, delay, reducedMotion]);

  // Distribute the typed characters across the segments immutably
  const renderedElements = resolvedSegments.map((segment, idx) => {
    // Start index in fullText of this segment
    const startOffset = resolvedSegments
      .slice(0, idx)
      .reduce((sum, s) => sum + s.text.length, 0);

    if (effectiveCharIndex <= startOffset) return null;

    const charsInThisSegment = Math.min(effectiveCharIndex - startOffset, segment.text.length);
    const textToRender = segment.text.substring(0, charsInThisSegment);

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
    </span>
  );
};

export default Typewriter;
