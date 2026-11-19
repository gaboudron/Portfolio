import { useEffect, useRef, useState } from 'react';
import type { SectionId } from '../types/portfolio';

const SECTION_IDS: SectionId[] = ['about', 'skills', 'projects', 'resume'];

/** Tracks the currently visible section for top navigation highlighting. */
export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('about');

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.scrollY + 140;
      let current: SectionId = 'about';

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollOffset) {
          current = id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom) {
        current = 'resume';
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeSection;
}

/** One-time reveal observer for calm section entrances without looping motion. */
export function useRevealRef<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
