export type Language = 'fr' | 'en';

export type Theme = 'light' | 'dark';

export type SectionId = 'about' | 'projects' | 'skills' | 'resume';

export type SkillIconKey =
  | 'brain'
  | 'layers'
  | 'compass'
  | 'calculator'
  | 'users';

export interface TechGroup {
  label: string;
  items: { name: string; primary?: boolean }[];
}

export interface SecondarySkillCategory {
  id: string;
  icon: SkillIconKey;
  title: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  img: string;
  title: string;
  description: string;
  course: string;
  github: string;
  technologies: string[];
}

export interface ProfileInfo {
  name: string;
  role: string;
  photo: string;
  cvPath: string;
  githubUrl: string;
  linkedinUrl: string;
  phone: string;
  email: string;
  location: string;
  birthdate: string;
}

export interface LocaleContent {
  nav: Record<SectionId, string>;
  hero: {
    headlineRole: string;
    primaryCta: string;
    secondaryCta: string;
  };
  labels: {
    phone: string;
    email: string;
    location: string;
    birthdate: string;
    downloadCv: string;
    copied: string;
    copyHint: string;
    aboutTitle: string;
    skillsTitle: string;
    skillsCount: string;
    aiSectionTitle: string;
    aiSectionSubtitle: string;
    techStackTitle: string;
    techStackSubtitle: string;
    primaryBadge: string;
    projectsTitle: string;
    featuredLabel: string;
    filterAll: string;
    courseLabel: string;
    technologiesLabel: string;
    viewProject: string;
    inspectProject: string;
    previousProject: string;
    nextProject: string;
    closeModal: string;
    resumeTitle: string;
    openNewTab: string;
    pdfFallback: string;
    pdfDownloadLink: string;
    themeToDark: string;
    themeToLight: string;
    githubLabel: string;
    linkedinLabel: string;
  };
  profile: ProfileInfo;
  aboutParagraph: string;
  aiSkills: string[];
  techStack: TechGroup[];
  secondarySkills: SecondarySkillCategory[];
  projects: ProjectItem[];
}
