import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useRevealRef } from '../hooks/useScrollNavigation';
import type { LocaleContent, ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  content: LocaleContent;
}

type FilterKey = 'all' | 'Python' | 'Java' | 'C' | 'Swift' | 'Web';

const FILTER_OPTIONS: { key: FilterKey; match?: string[] }[] = [
  { key: 'all' },
  { key: 'Python', match: ['Python'] },
  { key: 'Java', match: ['Java'] },
  { key: 'C', match: ['C'] },
  { key: 'Swift', match: ['Swift'] },
  { key: 'Web', match: ['HTML', 'CSS', 'JavaScript'] },
];

/** Master-detail interactive project workbench with filter bar, sticky inspector, and gallery modal. */
export function ProjectsSection({ content }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    content.projects[0]?.id ?? ''
  );
  const [modalProjectIndex, setModalProjectIndex] = useState<number | null>(null);
  const { ref, visible } = useRevealRef<HTMLElement>();

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return content.projects;
    const option = FILTER_OPTIONS.find((opt) => opt.key === selectedFilter);
    if (!option?.match) return content.projects;
    return content.projects.filter((project) =>
      project.technologies.some((tech) => option.match?.includes(tech))
    );
  }, [content.projects, selectedFilter]);

  const activeIndex = useMemo(() => {
    const found = filteredProjects.findIndex((p) => p.id === selectedProjectId);
    return found !== -1 ? found : 0;
  }, [filteredProjects, selectedProjectId]);

  const activeProject: ProjectItem | null = filteredProjects[activeIndex] ?? null;
  const modalProject: ProjectItem | null =
    modalProjectIndex !== null ? filteredProjects[modalProjectIndex] ?? null : null;

  const isLeadFeatured =
    selectedFilter === 'all' &&
    activeProject !== null &&
    activeProject.id === content.projects[0]?.id;

  const handleSelectFilter = (key: FilterKey) => {
    setSelectedFilter(key);
    setModalProjectIndex(null);
  };

  const handleStepInspector = (delta: number) => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (activeIndex + delta + filteredProjects.length) % filteredProjects.length;
    const nextItem = filteredProjects[nextIdx];
    if (nextItem) setSelectedProjectId(nextItem.id);
  };

  const handleModalPrevious = () => {
    if (modalProjectIndex === null || filteredProjects.length === 0) return;
    setModalProjectIndex(
      (modalProjectIndex - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  const handleModalNext = () => {
    if (modalProjectIndex === null || filteredProjects.length === 0) return;
    setModalProjectIndex((modalProjectIndex + 1) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      ref={ref}
      data-visible={visible}
      aria-labelledby="projects-heading"
      className="reveal-section scroll-mt-28 border-t py-14 lg:scroll-mt-8 lg:py-16"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      {/* Header + Filter bar */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono-meta text-[12px] font-medium"
            style={{ color: 'var(--accent-text)' }}
          >
            03
          </span>
          <h2
            id="projects-heading"
            className="text-[26px] font-medium leading-tight tracking-[-0.02em] sm:text-[30px]"
            style={{ color: 'var(--text-primary)' }}
          >
            {content.labels.projectsTitle}
          </h2>
          <span
            className="font-mono-meta text-[12px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {filteredProjects.length} / {content.projects.length}
          </span>
        </div>

        <div
          role="group"
          aria-label="Filter projects"
          className="flex flex-wrap items-center gap-1.5"
        >
          {FILTER_OPTIONS.map(({ key }) => {
            const isSelected = selectedFilter === key;
            const label = key === 'all' ? content.labels.filterAll : key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectFilter(key)}
                aria-pressed={isSelected}
                className="h-8 cursor-pointer rounded-lg border px-3 text-[13px] font-medium transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-card)',
                  borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-hairline)',
                  color: isSelected ? 'var(--bg-page)' : 'var(--text-secondary)',
                  outlineColor: 'var(--accent)',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Master-Detail Workbench */}
      <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        {/* Project Directory List (left on xl+, below inspector on smaller screens) */}
        <div
          className="order-2 overflow-hidden rounded-2xl border xl:order-1"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-hairline)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
            {filteredProjects.map((project, index) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  aria-current={isSelected ? 'true' : undefined}
                  className="group relative flex w-full cursor-pointer items-center gap-3.5 px-4 py-3 text-left transition-[background-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-raised)' : 'transparent',
                    borderColor: 'var(--border-hairline)',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  {/* Active selection indicator bar */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 bottom-2 left-0 w-0.5 rounded-r transition-opacity duration-150"
                    style={{
                      backgroundColor: 'var(--accent)',
                      opacity: isSelected ? 1 : 0,
                    }}
                  />

                  <span
                    className="font-mono-meta w-5 shrink-0 text-[11px] tabular-nums"
                    style={{ color: isSelected ? 'var(--accent-text)' : 'var(--text-muted)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div
                    className="h-10 w-14 shrink-0 overflow-hidden rounded-md border"
                    style={{
                      backgroundColor: 'var(--bg-raised)',
                      borderColor: 'var(--border-hairline)',
                    }}
                  >
                    <img
                      src={project.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="truncate text-[14px] font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.title}
                      </span>
                    </div>
                    <p
                      className="font-mono-meta mt-0.5 truncate text-[11px]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.technologies.join(' · ')}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Live Project Inspector Pane (right on xl+, top on smaller screens) */}
        {activeProject && (
          <article
            aria-live="polite"
            className="order-1 overflow-hidden rounded-2xl border xl:sticky xl:top-8 xl:order-2"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-hairline)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Inspector Top Bar */}
            <div
              className="flex items-center justify-between border-b px-5 py-3"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="font-mono-meta text-[12px] tabular-nums"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
                {isLeadFeatured && (
                  <span
                    className="font-mono-meta rounded-md px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: 'var(--accent-soft)',
                      color: 'var(--accent-text)',
                    }}
                  >
                    {content.labels.featuredLabel}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                {filteredProjects.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleStepInspector(-1)}
                      aria-label={content.labels.previousProject}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
                      style={{
                        backgroundColor: 'var(--bg-raised)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--text-secondary)',
                        outlineColor: 'var(--accent)',
                      }}
                    >
                      <ChevronLeft size={14} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepInspector(1)}
                      aria-label={content.labels.nextProject}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
                      style={{
                        backgroundColor: 'var(--bg-raised)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--text-secondary)',
                        outlineColor: 'var(--accent)',
                      }}
                    >
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setModalProjectIndex(activeIndex)}
                  aria-label={content.labels.inspectProject}
                  title={content.labels.inspectProject}
                  className="ml-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-[background-color,transform] duration-150 active:scale-[0.96] focus-visible:outline-2"
                  style={{
                    backgroundColor: 'var(--bg-raised)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-secondary)',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  <Maximize2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Inspector Body */}
            <div className="p-5">
              <button
                type="button"
                onClick={() => setModalProjectIndex(activeIndex)}
                aria-label={`${content.labels.inspectProject} · ${activeProject.title}`}
                className="group relative flex aspect-[16/10] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: 'var(--bg-raised)',
                  borderColor: 'var(--border-hairline)',
                  outlineColor: 'var(--accent)',
                }}
              >
                <img
                  src={activeProject.img}
                  alt={activeProject.title}
                  className="h-full w-full object-contain transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.01]"
                />
              </button>

              <div className="mt-5">
                <p
                  className="font-mono-meta text-[12px]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {content.labels.courseLabel} · {activeProject.course}
                </p>

                <h3
                  className="mt-1.5 text-[22px] font-medium leading-snug tracking-[-0.015em]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {activeProject.title}
                </h3>

                <p
                  className="mt-3 text-[14.5px] leading-[1.68]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {activeProject.description}
                </p>
              </div>

              <div className="mt-5">
                <span
                  className="block text-[12px]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {content.labels.technologiesLabel}
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((tech) => (
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
                className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <button
                  type="button"
                  onClick={() => setModalProjectIndex(activeIndex)}
                  className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 text-[13px] font-medium transition-[background-color,transform] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: 'var(--bg-raised)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  <Maximize2 size={13} strokeWidth={1.5} />
                  <span>{content.labels.inspectProject}</span>
                </button>

                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-[13px] font-medium transition-[filter,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
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
          </article>
        )}
      </div>

      <ProjectModal
        project={modalProject}
        currentIndex={modalProjectIndex ?? 0}
        totalCount={filteredProjects.length}
        content={content}
        onPrevious={handleModalPrevious}
        onNext={handleModalNext}
        onClose={() => setModalProjectIndex(null)}
      />
    </section>
  );
}
