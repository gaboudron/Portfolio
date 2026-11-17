import { Download, ExternalLink, FileText } from 'lucide-react';
import { useRevealRef } from '../hooks/useScrollNavigation';
import type { LocaleContent } from '../types/portfolio';

interface ResumeSectionProps {
  content: LocaleContent;
}

/** Two-column CV dossier pairing document metadata and actions with an embedded PDF frame. */
export function ResumeSection({ content }: ResumeSectionProps) {
  const { profile, hero, labels } = content;
  const { ref, visible } = useRevealRef<HTMLElement>();

  return (
    <section
      id="resume"
      ref={ref}
      data-visible={visible}
      aria-labelledby="resume-heading"
      className="reveal-section scroll-mt-28 border-t py-14 lg:scroll-mt-8 lg:py-16"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono-meta text-[12px] font-medium"
            style={{ color: 'var(--accent-text)' }}
          >
            04
          </span>
          <h2
            id="resume-heading"
            className="text-[26px] font-medium leading-tight tracking-[-0.02em] sm:text-[30px]"
            style={{ color: 'var(--text-primary)' }}
          >
            {labels.resumeTitle}
          </h2>
        </div>
        <span
          className="font-mono-meta text-[12px]"
          style={{ color: 'var(--text-muted)' }}
        >
          CV.pdf
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-[0.42fr_0.58fr]">
        {/* Left: Document Dossier & Actions */}
        <div
          className="flex flex-col gap-5 rounded-2xl border p-5"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-hairline)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: 'var(--bg-raised)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--accent-text)',
              }}
            >
              <FileText size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h3
                className="text-[16px] font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {profile.name} · {profile.role}
              </h3>
              <p
                className="mt-1 text-[13px] leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {hero.headlineRole}
              </p>
            </div>
          </div>

          <dl
            className="divide-y border-t border-b text-[13px]"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div
              className="flex items-center justify-between gap-4 py-2.5"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <dt style={{ color: 'var(--text-muted)' }}>{labels.location}</dt>
              <dd style={{ color: 'var(--text-primary)' }}>{profile.location}</dd>
            </div>
            <div
              className="flex items-center justify-between gap-4 py-2.5"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <dt style={{ color: 'var(--text-muted)' }}>{labels.email}</dt>
              <dd className="truncate" style={{ color: 'var(--text-primary)' }}>
                {profile.email}
              </dd>
            </div>
            <div
              className="flex items-center justify-between gap-4 py-2.5"
              style={{ borderColor: 'var(--border-hairline)' }}
            >
              <dt style={{ color: 'var(--text-muted)' }}>{labels.phone}</dt>
              <dd
                className="font-mono-meta tabular-nums"
                style={{ color: 'var(--text-primary)' }}
              >
                {profile.phone}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2.5 sm:flex-row xl:flex-col">
            <a
              href={profile.cvPath}
              download="Gabriel_Boudron_CV.pdf"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-medium transition-[filter,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-contrast)',
                outlineColor: 'var(--accent)',
              }}
            >
              <Download size={15} strokeWidth={1.5} />
              <span>{labels.downloadCv}</span>
            </a>

            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-medium transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--bg-raised)',
                borderColor: 'var(--border-hairline)',
                color: 'var(--text-primary)',
                outlineColor: 'var(--accent)',
              }}
            >
              <ExternalLink size={15} strokeWidth={1.5} />
              <span>{labels.openNewTab}</span>
            </a>
          </div>
        </div>

        {/* Right: Framed PDF Viewer */}
        <div
          className="overflow-hidden rounded-2xl border p-2"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-hairline)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <object
            data={profile.cvPath}
            type="application/pdf"
            aria-label={labels.resumeTitle}
            className="h-[520px] w-full rounded-xl sm:h-[620px]"
          >
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <p className="text-[14px]" style={{ color: 'var(--text-secondary)' }}>
                {labels.pdfFallback}
              </p>
              <a
                href={profile.cvPath}
                download="Gabriel_Boudron_CV.pdf"
                className="text-[14px] font-medium underline underline-offset-4"
                style={{ color: 'var(--accent-text)' }}
              >
                {labels.pdfDownloadLink}
              </a>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}
