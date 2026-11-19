import { Moon, Sun } from 'lucide-react';
import type { Language, LocaleContent, SectionId, Theme } from '../types/portfolio';

interface TopNavProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  content: LocaleContent;
}

const SECTIONS: SectionId[] = ['about', 'skills', 'projects', 'resume'];

/** Compact sticky header used on mobile and tablet viewports; desktop uses IdentityRail. */
export function TopNav({
  activeSection,
  onNavigate,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  content,
}: TopNavProps) {
  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md lg:hidden"
      style={{
        backgroundColor: 'var(--bg-header)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
          }}
          className="flex items-center gap-2.5 rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: 'var(--accent)' }}
        >
          <span
            className="text-[15px] font-medium tracking-[-0.015em]"
            style={{ color: 'var(--text-primary)' }}
          >
            {content.profile.name}
          </span>
          <span
            className="hidden items-center gap-1.5 text-[12px] sm:inline-flex"
            style={{ color: 'var(--text-muted)' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: 'var(--status-dot)' }}
            />
            <span className="font-mono-meta">{content.profile.role}</span>
          </span>
        </a>

        {/* Desktop section links */}
        <nav aria-label="Navigation" className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex h-8 items-center rounded-lg px-3 text-[13px] font-medium transition-[color,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--bg-raised)' : 'transparent',
                  outlineColor: 'var(--accent)',
                }}
              >
                {content.nav[id]}
              </a>
            );
          })}
        </nav>

        {/* Right controls: FR/EN + Theme */}
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className="flex items-center rounded-lg border p-0.5"
            style={{
              backgroundColor: 'var(--bg-raised)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {(['fr', 'en'] as const).map((lang) => {
              const active = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  aria-pressed={active}
                  className="font-mono-meta h-6 cursor-pointer rounded-md px-2 text-[11px] font-medium uppercase transition-[color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-1"
                  style={{
                    backgroundColor: active ? 'var(--bg-card)' : 'transparent',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    boxShadow: active ? 'var(--shadow-card)' : 'none',
                    outlineColor: 'var(--accent)',
                  }}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? content.labels.themeToDark : content.labels.themeToLight}
            title={theme === 'light' ? content.labels.themeToDark : content.labels.themeToLight}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-secondary)',
              outlineColor: 'var(--accent)',
            }}
          >
            {theme === 'light' ? (
              <Moon size={14} strokeWidth={1.5} />
            ) : (
              <Sun size={14} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile section strip */}
      <nav
        aria-label="Navigation mobile"
        className="flex items-center gap-1 border-t px-4 py-1.5 md:hidden"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        {SECTIONS.map((id) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(id);
              }}
              aria-current={isActive ? 'page' : undefined}
              className="flex h-8 flex-1 items-center justify-center rounded-md text-[12px] font-medium transition-[color,background-color] duration-150"
              style={{
                backgroundColor: isActive ? 'var(--bg-raised)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
            >
              {content.nav[id]}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
