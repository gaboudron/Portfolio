import { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { LocaleContent, ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  currentIndex: number;
  totalCount: number;
  content: LocaleContent;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}

/** Accessible gallery modal supporting keyboard Escape and arrow navigation. */
export function ProjectModal({
  project,
  currentIndex,
  totalCount,
  content,
  onPrevious,
  onNext,
  onClose,
}: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && totalCount > 1) onPrevious();
      if (event.key === 'ArrowRight' && totalCount > 1) onNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, totalCount, onClose, onPrevious, onNext]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="animate-modal-in relative flex max-h-[90dvh] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-strong)',
          boxShadow: 'var(--shadow-float)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <span
            className="font-mono-meta text-[12px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {currentIndex + 1} / {totalCount}
          </span>

          <div className="flex items-center gap-1.5">
            {totalCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={onPrevious}
                  aria-label={content.labels.previousProject}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
                  style={{
                    backgroundColor: 'var(--bg-raised)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-secondary)',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label={content.labels.nextProject}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
                  style={{
                    backgroundColor: 'var(--bg-raised)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-secondary)',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={content.labels.closeModal}
              className="ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
              style={{
                backgroundColor: 'var(--bg-raised)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
                outlineColor: 'var(--accent)',
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-5 sm:p-6">
          <div
            className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border"
            style={{
              backgroundColor: 'var(--bg-raised)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <img
              src={project.img}
              alt={project.title}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-5">
            <span
              className="font-mono-meta text-[12px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {content.labels.courseLabel} · {project.course}
            </span>

            <h2
              id="project-modal-title"
              className="mt-1.5 text-[24px] font-medium leading-snug tracking-[-0.015em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h2>

            <p
              className="mt-3 text-[15px] leading-[1.65]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.description}
            </p>
          </div>

          <div className="mt-5">
            <span
              className="block text-[12px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {content.labels.technologiesLabel}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-meta rounded-md border px-2.5 py-1 text-[12px]"
                  style={{
                    backgroundColor: 'var(--bg-raised)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-6 flex items-center justify-end gap-3 border-t pt-4"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="h-9 cursor-pointer rounded-lg border px-4 text-[13px] font-medium transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
              style={{
                backgroundColor: 'var(--bg-raised)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-secondary)',
              }}
            >
              {content.labels.closeModal}
            </button>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-1.5 rounded-lg px-4 text-[13px] font-medium transition-[filter,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-contrast)',
                outlineColor: 'var(--accent)',
              }}
            >
              <span>{content.labels.viewProject}</span>
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
