import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { IdentityRail } from './components/IdentityRail';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeSection } from './components/ResumeSection';
import { SkillsSection } from './components/SkillsSection';
import { TopNav } from './components/TopNav';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { useActiveSection } from './hooks/useScrollNavigation';
import type { Language, SectionId, Theme } from './types/portfolio';

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'fr';
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

/** Split dossier & interactive workbench portfolio with persistent identity rail, FR/EN locale, and light/dark theme. */
export function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const activeSection = useActiveSection();

  const content = PORTFOLIO_DATA[language];

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem('portfolio-lang', language);
    } catch {
      // Ignore storage access errors
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore storage access errors
    }
  }, [theme]);

  const handleNavigate = (section: SectionId) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${section}`);
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Mobile / tablet sticky header */}
      <TopNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        content={content}
      />

      {/* Split desktop shell: sticky left identity dossier + scrollable right workbench */}
      <div className="mx-auto w-full max-w-[1360px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[312px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-14">
          <IdentityRail
            activeSection={activeSection}
            onNavigate={handleNavigate}
            language={language}
            onLanguageChange={setLanguage}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            content={content}
          />

          <div className="flex min-w-0 flex-col">
            <main className="flex-1">
              <HeroSection content={content} onNavigate={handleNavigate} />
              <SkillsSection content={content} />
              <ProjectsSection content={content} />
              <ResumeSection content={content} />
            </main>

            <footer
              className="border-t pt-6 pb-2"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <div className="flex flex-col items-start justify-between gap-3 text-[12px] sm:flex-row sm:items-center">
                <span style={{ color: 'var(--text-muted)' }}>
                  {content.profile.name} · {content.profile.location}
                </span>
                <div className="flex items-center gap-5" style={{ color: 'var(--text-muted)' }}>
                  <a
                    href={content.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-150 hover:underline"
                  >
                    GitHub
                  </a>
                  <a
                    href={content.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-150 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${content.profile.email}`}
                    className="transition-colors duration-150 hover:underline"
                  >
                    {content.profile.email}
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
