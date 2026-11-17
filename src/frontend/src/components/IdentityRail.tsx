import { useState } from 'react';
import {
  ArrowDownRight,
  Calendar,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Moon,
  Smartphone,
  Sun,
} from 'lucide-react';
import type { Language, LocaleContent, SectionId, Theme } from '../types/portfolio';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

interface IdentityRailProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  content: LocaleContent;
}

const SECTIONS: SectionId[] = ['about', 'skills', 'projects', 'resume'];

/** Persistent left dossier rail on desktop, folding into an intro identity card on mobile. */
export function IdentityRail({
  activeSection,
  onNavigate,
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  content,
}: IdentityRailProps) {
  const { profile, hero, labels, nav, projects } = content;
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);

  const handleCopy = async (field: 'phone' | 'email', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 1800);
    } catch {
      // Ignore clipboard restrictions
    }
  };

  const sectionMeta: Record<SectionId, string> = {
    about: '01',
    skills: labels.skillsCount,
    projects: String(projects.length).padStart(2, '0'),
    resume: 'CV.pdf',
  };

  return (
    <aside
      aria-label={profile.name}
      className="lg:sticky lg:top-8 lg:max-h-[calc(100dvh-4rem)] lg:self-start"
    >
      <div
        className="flex flex-col gap-5 rounded-2xl border p-5 lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-hairline)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Top utility controls (desktop only; mobile uses TopNav) */}
        <div
          className="hidden items-center justify-between gap-2 border-b pb-4 lg:flex"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <span
            className="inline-flex items-center gap-2 text-[12px]"
            style={{ color: 'var(--text-muted)' }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: 'var(--status-dot)' }}
            />
            <span className="font-mono-meta">{profile.role}</span>
          </span>

          <div className="flex items-center gap-1.5">
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
              aria-label={theme === 'light' ? labels.themeToDark : labels.themeToLight}
              title={theme === 'light' ? labels.themeToDark : labels.themeToLight}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--bg-raised)',
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

        {/* Identity Header */}
        <div className="flex items-center gap-4">
          <div
            className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border"
            style={{
              backgroundColor: 'var(--bg-raised)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="min-w-0">
            <h2
              className="text-[20px] font-medium leading-tight tracking-[-0.02em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {profile.name}
            </h2>

            <p
              className="mt-1 text-[13px] font-medium lg:hidden"
              style={{ color: 'var(--accent-text)' }}
            >
              {profile.role}
            </p>

            <dl
              className="mt-2.5 flex flex-col gap-1 text-[12px]"
              style={{ color: 'var(--text-muted)' }}
            >
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">{labels.location}</dt>
                <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
                <dd className="truncate">{profile.location}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">{labels.birthdate}</dt>
                <Calendar size={12} strokeWidth={1.5} className="shrink-0" />
                <dd className="font-mono-meta truncate tabular-nums">{profile.birthdate}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Vertical Section Index (desktop) */}
        <nav
          aria-label="Navigation"
          className="hidden flex-col gap-1 border-t pt-4 lg:flex"
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
                className="group relative flex h-9 items-center justify-between rounded-lg px-3 text-[13px] font-medium transition-[color,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--bg-raised)' : 'transparent',
                  outlineColor: 'var(--accent)',
                }}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="h-3.5 w-0.5 rounded-full transition-opacity duration-150"
                    style={{
                      backgroundColor: 'var(--accent)',
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <span>{nav[id]}</span>
                </span>
                <span
                  className="font-mono-meta text-[11px]"
                  style={{ color: isActive ? 'var(--text-secondary)' : 'var(--text-muted)' }}
                >
                  {sectionMeta[id]}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Primary + Secondary CTAs */}
        <div
          className="grid grid-cols-1 gap-2 border-t pt-4 sm:grid-cols-2 lg:grid-cols-1"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('projects');
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-medium transition-[filter,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-contrast)',
              outlineColor: 'var(--accent)',
            }}
          >
            <span>{hero.primaryCta}</span>
            <ArrowDownRight size={15} strokeWidth={1.75} />
          </a>

          <a
            href={profile.cvPath}
            download="Gabriel_Boudron_CV.pdf"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-medium transition-[background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--bg-raised)',
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
              outlineColor: 'var(--accent)',
            }}
          >
            <Download size={15} strokeWidth={1.5} />
            <span>{hero.secondaryCta}</span>
          </a>
        </div>

        {/* Contact & Social Details */}
        <div
          className="flex flex-col gap-2 border-t pt-4"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <button
            type="button"
            onClick={() => handleCopy('email', profile.email)}
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: 'var(--text-secondary)',
              outlineColor: 'var(--accent)',
            }}
            title={copiedField === 'email' ? labels.copied : labels.copyHint}
            aria-label={`${labels.email}: ${profile.email}`}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Mail size={13} strokeWidth={1.5} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="truncate">{profile.email}</span>
            </span>
            <span className="shrink-0" style={{ color: 'var(--text-muted)' }}>
              {copiedField === 'email' ? (
                <Check size={13} strokeWidth={1.75} style={{ color: 'var(--status-dot)' }} />
              ) : (
                <Copy size={12} strokeWidth={1.5} />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy('phone', profile.phone)}
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] transition-colors duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--bg-raised)',
              color: 'var(--text-secondary)',
              outlineColor: 'var(--accent)',
            }}
            title={copiedField === 'phone' ? labels.copied : labels.copyHint}
            aria-label={`${labels.phone}: ${profile.phone}`}
          >
            <span className="flex min-w-0 items-center gap-2">
              <Smartphone size={13} strokeWidth={1.5} className="shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="font-mono-meta truncate tabular-nums">{profile.phone}</span>
            </span>
            <span className="shrink-0" style={{ color: 'var(--text-muted)' }}>
              {copiedField === 'phone' ? (
                <Check size={13} strokeWidth={1.75} style={{ color: 'var(--status-dot)' }} />
              ) : (
                <Copy size={12} strokeWidth={1.5} />
              )}
            </span>
          </button>

          <div className="mt-1 grid grid-cols-2 gap-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.githubLabel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border text-[12px] font-medium transition-opacity duration-150 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
                outlineColor: 'var(--accent)',
              }}
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.linkedinLabel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border text-[12px] font-medium transition-opacity duration-150 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
                outlineColor: 'var(--accent)',
              }}
            >
              <LinkedInIcon className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
