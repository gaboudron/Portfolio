interface IconProps {
  className?: string;
}

/** Flat monochrome GitHub mark sized to match Lucide 16px icons. */
export function GitHubIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.57 7.18 9.96.52.1.71-.23.71-.5 0-.25-.01-1.08-.01-1.96-2.92.63-3.54-1.24-3.54-1.24-.48-1.21-1.17-1.53-1.17-1.53-.95-.65.07-.64.07-.64 1.06.07 1.61 1.08 1.61 1.08.94 1.6 2.46 1.14 3.06.87.09-.68.37-1.14.67-1.4-2.33-.26-4.78-1.17-4.78-5.19 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.89 1.08a10.02 10.02 0 0 1 5.26 0c2.01-1.36 2.89-1.08 2.89-1.08.57 1.44.21 2.5.1 2.77.67.73 1.08 1.67 1.08 2.82 0 4.03-2.45 4.92-4.79 5.18.38.33.72.97.72 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.72.5A10.51 10.51 0 0 0 22.5 12c0-5.8-4.7-10.5-10.5-10.5Z" />
    </svg>
  );
}

/** Flat monochrome LinkedIn mark sized to match Lucide 16px icons. */
export function LinkedInIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.4 18.3H5.7V9.8h2.7v8.5ZM7.05 8.65a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12Zm11.25 9.65h-2.7v-4.14c0-.99-.02-2.26-1.38-2.26-1.38 0-1.59 1.08-1.59 2.19v4.21h-2.7V9.8h2.59v1.16h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.24 1.8 3.24 4.13v4.61Z" />
    </svg>
  );
}
