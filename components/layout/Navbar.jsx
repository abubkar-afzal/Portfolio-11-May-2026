import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { personalInfo } from '@/components/data/portfolio-data';

const links = [
  { to: 'about', label: 'About' },
  { to: 'work', label: 'Work' },
  { to: 'education', label: 'Education' },
  { to: 'skills', label: 'Skills' },
  { to: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Navbar header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link
            to="hero"
            smooth
            spy
            className="text-xl md:text-2xl font-display font-bold text-foreground cursor-pointer hover:text-accent transition-colors"
          >
            {personalInfo.name.split(' ')[1]}
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                
                className="text-sm font-medium text-foreground-muted hover:text-accent cursor-pointer transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <ThemeToggle className="cursor-pointer"/>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3 cursor-pointer">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground z-50"
              aria-label="Toggle menu"
            >
              {/* Hamburger / Close icon */}
              <div className="relative w-5 h-4">
                <span
                  className={`absolute left-0 block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 top-2' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block w-full h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 block w-full h-0.5 bg-current transform transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 top-2' : 'top-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay (outside header, behind it) */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              
              className="text-3xl font-display font-bold text-foreground-muted hover:text-accent transition-colors cursor-pointer"
              style={{
                transitionDelay: mobileOpen ? `${i * 100}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}