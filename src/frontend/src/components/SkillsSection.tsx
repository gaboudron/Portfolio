import { Brain, Calculator, Compass, Layers, Users } from 'lucide-react';
import { useRevealRef } from '../hooks/useScrollNavigation';
import type { LocaleContent, SkillIconKey } from '../types/portfolio';

interface SkillsSectionProps {
  content: LocaleContent;
}

const SKILL_ICONS: Record<SkillIconKey, typeof Brain> = {
  brain: Brain,
  layers: Layers,
  compass: Compass,
  calculator: Calculator,
  users: Users,
};

/** Specification-sheet layout: indexed AI/LLM matrix above a 2-column stack & engineering split. */
export function SkillsSection({ content }: SkillsSectionProps) {
  const { ref, visible } = useRevealRef<HTMLElement>();
  const { labels, aiSkills, techStack, secondarySkills } = content;

  return (
    <section
      id="skills"
      ref={ref}
      data-visible={visible}
      aria-labelledby="skills-heading"
      className="reveal-section scroll-mt-28 border-t py-14 lg:scroll-mt-8 lg:py-16"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono-meta text-[12px] font-medium"
            style={{ color: 'var(--accent-text)' }}
          >
            02
          </span>
          <h2
            id="skills-heading"
            className="text-[26px] font-medium leading-tight tracking-[-0.02em] sm:text-[30px]"
            style={{ color: 'var(--text-primary)' }}
          >
            {labels.skillsTitle}
          </h2>
        </div>
        <span
          className="font-mono-meta text-[12px]"
          style={{ color: 'var(--text-muted)' }}
        >
          {labels.skillsCount}
        </span>
      </div>

      {/* Band A: AI & LLM Indexed Matrix */}
      <div
        className="mt-6 overflow-hidden rounded-2xl border"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-hairline)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          className="flex items-center justify-between border-b px-5 py-3.5"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div className="flex items-center gap-2.5">
            <Brain size={16} strokeWidth={1.5} style={{ color: 'var(--accent-text)' }} />
            <h3
              className="text-[15px] font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              {labels.aiSectionTitle}
            </h3>
          </div>
          <span
            className="font-mono-meta text-[11px]"
            style={{ color: 'var(--text-muted)' }}
          >
            {labels.aiSectionSubtitle}
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2">
          {aiSkills.map((skill, idx) => (
            <li
              key={skill}
              className={`flex items-center gap-3 px-5 py-3 ${idx > 0 ? 'border-t' : ''} ${idx === 1 ? 'sm:border-t-0' : ''} ${idx % 2 === 0 ? 'sm:border-r' : ''}`}
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <span
                className="font-mono-meta w-6 shrink-0 text-[11px] tabular-nums"
                style={{ color: 'var(--text-muted)' }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                className="text-[13.5px] font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Band B: Tech Stack + Secondary Engineering Pillars */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Technical Stack */}
        <div
          className="flex flex-col overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-hairline)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div
            className="flex items-center justify-between border-b px-5 py-3.5"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div className="flex items-center gap-2.5">
              <Layers size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
              <h3
                className="text-[15px] font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {labels.techStackTitle}
              </h3>
            </div>
            <span
              className="font-mono-meta text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              {labels.techStackSubtitle}
            </span>
          </div>

          <div className="flex flex-1 flex-col divide-y" style={{ borderColor: 'var(--border-hairline)' }}>
            {techStack.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-3 px-5 py-4"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <span
                  className="text-[12px] font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {group.label}
                </span>

                <ul className="flex flex-wrap items-center gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[13px]"
                      style={{
                        backgroundColor: item.primary ? 'var(--accent-soft)' : 'var(--bg-raised)',
                        borderColor: item.primary ? 'transparent' : 'var(--border-hairline)',
                        color: item.primary ? 'var(--accent-text)' : 'var(--text-primary)',
                        fontWeight: item.primary ? 500 : 400,
                      }}
                    >
                      <span className="font-mono-meta">{item.name}</span>
                      {item.primary && (
                        <span className="text-[11px] opacity-85">
                          · {labels.primaryBadge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture, Algorithmics, Softskills */}
        <div
          className="flex flex-col divide-y overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-hairline)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {secondarySkills.map((category) => {
            const Icon = SKILL_ICONS[category.icon];
            return (
              <div
                key={category.id}
                className="px-5 py-4"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    strokeWidth={1.5}
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <h3
                    className="text-[14px] font-medium tracking-[-0.01em]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {category.title}
                  </h3>
                </div>

                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border px-2.5 py-1 text-[12px]"
                      style={{
                        backgroundColor: 'var(--bg-raised)',
                        borderColor: 'var(--border-hairline)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
