import { personalInfo } from '@/components/data/portfolio-data';
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-foreground-muted">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <div className="flex gap-5">
          <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FiGithub size={18} /></a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FiLinkedin size={18} /></a>
          <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><FiInstagram size={18} /></a>
        </div>
        <p className="hidden lg:block">Designed with passion & built with Next.js</p>
      </div>
    </footer>
  );
}