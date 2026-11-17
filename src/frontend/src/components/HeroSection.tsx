import { ArrowDownRight } from 'lucide-react';
import type { LocaleContent, SectionId } from '../types/portfolio';

interface HeroSectionProps {
  content: LocaleContent;
  onNavigate: (section: SectionId) => void;
}

/** Opening editorial masthead with bio and architectural section index. */
export function HeroSection({ content, onNavigate }: HeroSectionProps) {
  const { hero, labels, nav, aboutParagraph, projects } = content;

  const indexLinks: { id: SectionId; index: string; title: string; meta: string }[] = [
    { id: 'skills', index: '02', title: nav.skills, meta: labels.skillsCount },
    {
      id: 'projects',
      index: '03',
      title: nav.projects,
      meta: String(projects.length).padStart(2, '0'),
    },
    { id: 'resume', index: '04', title: nav.resume, meta: 'CV.pdf' },
  ];

  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="animate-hero-enter scroll-mt-28 pt-2 pb-14 lg:scroll-mt-8 lg:pt-0 lg:pb-16"
    >
      <div className="flex items-center gap-2.5">
        <span
          className="font-mono-meta text-[12px] font-medium"
          style={{ color: 'var(--accent-text)' }}
        >
          01
        </span>
        <span
          className="h-px w-5"
          style={{ backgroundColor: 'var(--border-strong)' }}
          aria-hidden="true"
        />
        <span
          className="text-[13px] font-medium"
          style={{ color: 'var(--text-muted)' }}
        >
          {labels.aboutTitle}
        </span>
      </div>

      <h1
        id="hero-heading"
        className="mt-4 max-w-[24ch] text-[30px] font-medium leading-[1.12] tracking-[-0.025em] sm:text-[40px] xl:text-[44px]"
        style={{ color: 'var(--text-primary)' }}
      >
        {hero.headlineRole}
      </h1>

      <p
        className="mt-5 max-w-[66ch] text-[15px] leading-[1.72] sm:text-[16px]"
        style={{ color: 'var(--text-secondary)' }}
      >
        {aboutParagraph}
      </p>

      {/* Architectural Section Index */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {indexLinks.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
            className="group flex items-center justify-between rounded-xl border px-4 py-3.5 transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-hairline)',
              boxShadow: 'var(--shadow-card)',
              outlineColor: 'var(--accent)',
            }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-mono-meta text-[11px]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {item.index}
                </span>
                <span
                  className="text-[14px] font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </span>
              </div>
              <span
                className="font-mono-meta mt-0.5 block text-[11px]"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.meta}
              </span>
            </div>

            <ArrowDownRight
              size={15}
              strokeWidth={1.5}
              className="shrink-0 opacity-45 transition-opacity duration-150 group-hover:opacity-100"
              style={{ color: 'var(--accent-text)' }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
