'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-scroll';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { personalInfo } from '@/components/data/portfolio-data';
import {
  FiVideo,
  FiPlay,
  FiPause,
  FiMaximize,
  FiMinimize,
  FiX,
  FiSliders,
} from 'react-icons/fi';

const links = [
  { to: 'about', label: 'About' },
  { to: 'work', label: 'Work' },
  { to: 'education', label: 'Education' },
  { to: 'skills', label: 'Skills' },
  { to: 'contact', label: 'Contact' },
];

const NORMAL_SPEED = 350;
const WORK_SPEED = 180;

const PAUSE_SECTIONS = links
  .filter((l) => l.to !== 'work')
  .map((l) => l.to);

const SECTION_PAUSE_MS = 2500;

export default function Navbar({ videoSrc = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ---------- Cinematic tour state ----------
  const [tourActive, setTourActive] = useState(false);
  const [tourPaused, setTourPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSectionPause, setIsSectionPause] = useState(false);

  // ---------- Mobile tour-controls modal ----------
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);

  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const videoRef = useRef(null);

  const visitedRef = useRef(new Set());
  const pauseUntilRef = useRef(0);
  const isSectionPauseRef = useRef(false);

  // ---------- header scroll effect ----------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- close mobile menu when tour starts ----------
  useEffect(() => {
    if (tourActive) setMobileOpen(false);
  }, [tourActive]);

  // ---------- reset section tracking when tour begins ----------
  useEffect(() => {
    if (!tourActive) return;
    visitedRef.current = new Set();
    pauseUntilRef.current = 0;
    isSectionPauseRef.current = false;
    setIsSectionPause(false);

    for (const id of PAUSE_SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        visitedRef.current.add(id);
      }
    }
  }, [tourActive]);

  // ---------- auto-close mobile controls modal when tour stops ----------
  useEffect(() => {
    if (!tourActive) setMobileControlsOpen(false);
  }, [tourActive]);

  // ---------- body lock for mobile menu ----------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // ---------- fullscreen listener ----------
  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  // ---------- AUTO-SCROLL LOOP ----------
  useEffect(() => {
    if (!tourActive || tourPaused) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.scrollBehavior;
    const prevBody = body.style.scrollBehavior;
    html.style.setProperty('scroll-behavior', 'auto', 'important');
    body.style.setProperty('scroll-behavior', 'auto', 'important');

    const tick = (time) => {
      if (time < pauseUntilRef.current) {
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (isSectionPauseRef.current) {
        isSectionPauseRef.current = false;
        setIsSectionPause(false);
      }

      const dt = Math.min(100, time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      let speed = NORMAL_SPEED;
      const workEl = document.getElementById('work');
      if (workEl) {
        const wRect = workEl.getBoundingClientRect();
        const mid = window.innerHeight * 0.5;
        if (wRect.top <= mid && wRect.bottom >= mid) speed = WORK_SPEED;
      }

      window.scrollTo({
        top: window.scrollY + speed * dt,
        left: 0,
        behavior: 'instant',
      });

      // Full-section pause
      const viewportH = window.innerHeight;
      for (const id of PAUSE_SECTIONS) {
        if (visitedRef.current.has(id)) continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionFits = rect.height <= viewportH;
        const fullSectionVisible = sectionFits
          ? rect.top >= -5 && rect.bottom <= viewportH + 5
          : rect.top <= 5 && rect.bottom > 0;
        if (fullSectionVisible) {
          visitedRef.current.add(id);
          pauseUntilRef.current = time + SECTION_PAUSE_MS;
          isSectionPauseRef.current = true;
          setIsSectionPause(true);
          break;
        }
      }

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setTourPaused(true);
        if (videoRef.current) videoRef.current.pause();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      html.style.scrollBehavior = prevHtml;
      body.style.scrollBehavior = prevBody;
    };
  }, [tourActive, tourPaused]);

  // ---------- block manual scroll while playing ----------
  useEffect(() => {
    if (!tourActive || tourPaused) return;
    const prevent = (e) => e.preventDefault();
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
    };
  }, [tourActive, tourPaused]);

  // ---------- sync video playback ----------
  useEffect(() => {
    if (!videoRef.current) return;
    if (tourActive && !tourPaused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [tourActive, tourPaused]);

  // ---------- keyboard shortcuts ----------
  const stopTour = useCallback(async () => {
    setTourActive(false);
    setTourPaused(false);
    setIsSectionPause(false);
    isSectionPauseRef.current = false;
    setMobileControlsOpen(false);
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {}
  }, []);

  useEffect(() => {
    if (!tourActive) return;
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setTourPaused((p) => !p);
      } else if (e.key === 'Escape') {
        // Close the mobile controls first if open
        if (mobileControlsOpen) {
          setMobileControlsOpen(false);
          return;
        }
        stopTour();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tourActive, stopTour, mobileControlsOpen]);

  // ---------- actions ----------
  const startTour = useCallback(async () => {
    setTourActive(true);
    setTourPaused(false);
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen unavailable:', err);
    }
  }, []);

  const handleVideoClick = () => {
    if (tourActive) stopTour();
    else startTour();
  };

  const toggleTourPause = useCallback(() => {
    setTourPaused((p) => !p);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  }, []);

  return (
    <>
      {/* ---------------- HEADER ---------------- */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
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

          {/* ---------- Desktop Links + Controls ---------- */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground-muted hover:text-accent cursor-pointer transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {tourActive && (
              <button
                onClick={toggleTourPause}
                aria-label={tourPaused ? 'Resume cinematic tour' : 'Pause cinematic tour'}
                title={tourPaused ? 'Resume tour (Space)' : 'Pause tour (Space)'}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-elevated border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer"
              >
                {tourPaused ? <FiPlay size={15} /> : <FiPause size={15} />}
              </button>
            )}

            {tourActive && (
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-elevated border border-border hover:border-accent hover:text-accent text-foreground transition-colors cursor-pointer"
              >
                {isFullscreen ? <FiMinimize size={15} /> : <FiMaximize size={15} />}
              </button>
            )}

            <button
              onClick={handleVideoClick}
              aria-label={tourActive ? 'Stop cinematic tour' : 'Start cinematic tour'}
              title={tourActive ? 'Stop cinematic tour' : 'Start cinematic tour'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                tourActive
                  ? 'bg-accent text-accent-contrast'
                  : 'bg-surface-elevated border border-border hover:border-accent hover:text-accent text-foreground'
              }`}
            >
              <FiVideo size={15} />
            </button>

            <ThemeToggle className="cursor-pointer" />
          </div>

          {/* ---------- Mobile Controls — only 2 buttons now ---------- */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleVideoClick}
              aria-label={tourActive ? 'Stop cinematic tour' : 'Start cinematic tour'}
              className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ${
                tourActive
                  ? 'bg-accent text-accent-contrast'
                  : 'bg-surface-elevated border border-border text-foreground'
              }`}
            >
              <FiVideo size={15} />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
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

      {/* ---------------- MOBILE MENU ---------------- */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
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

      {/* ---------------- CINEMATIC TOUR OVERLAY ---------------- */}
      {tourActive && (
        <div
          className={`fixed inset-0 z-30 ${
            tourPaused ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'
          }`}
          onClick={() => {
            if (!tourPaused) setTourPaused(true);
          }}
          aria-label="Tap to pause cinematic tour"
        >
          {videoSrc && (
            <div className="absolute bottom-4 right-4 w-40 h-24 md:w-56 md:h-32 rounded-xl overflow-hidden shadow-2xl border-2 border-accent/40 pointer-events-none">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                autoPlay
              />
            </div>
          )}

          {!tourPaused && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground-muted text-[8px] md:text:xs font-mono tracking-widest bg-background/60 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none">
              {isSectionPause ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  PAUSING FOR A MOMENT
                </span>
              ) : (
                'TAP ANYWHERE TO PAUSE'
              )}
            </div>
          )}
        </div>
      )}

      {/* ---------------- MOBILE FLOATING TOUR-CONTROLS FAB ---------------- */}
      {tourActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMobileControlsOpen((v) => !v);
          }}
          aria-label="Open tour controls"
          className="md:hidden fixed top-20 right-4 z-[55] w-12 h-12 rounded-full bg-surface-elevated/95 backdrop-blur-xl border-2 border-accent/40 text-accent shadow-2xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          {mobileControlsOpen ? <FiX size={20} /> : <FiSliders size={20} />}
        </button>
      )}

      {/* ---------------- MOBILE TOUR-CONTROLS MODAL ---------------- */}
      {tourActive && mobileControlsOpen && (
        <div
          className="md:hidden fixed inset-0 z-[60] flex items-end justify-center bg-background/70 backdrop-blur-md"
          onClick={() => setMobileControlsOpen(false)}
        >
          <div
            className="w-full max-w-md m-4 mb-6 rounded-3xl bg-surface border-2 border-border shadow-2xl p-5 animate-in slide-in-from-bottom-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-foreground">
                Tour Controls
              </h3>
              <button
                onClick={() => setMobileControlsOpen(false)}
                aria-label="Close tour controls"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-elevated border border-border text-foreground-muted hover:text-foreground cursor-pointer"
              >
                <FiX size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Pause / Resume */}
              <button
                onClick={() => {setMobileControlsOpen(false), toggleTourPause()}}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-elevated border border-border text-foreground font-semibold text-sm cursor-pointer active:scale-[0.99] transition-transform"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    {tourPaused ? <FiPlay size={16} /> : <FiPause size={16} />}
                  </span>
                  {tourPaused ? 'Resume Tour' : 'Pause Tour'}
                </span>
                <span className="text-[10px] font-mono text-foreground-muted tracking-widest">
                  {tourPaused ? 'PAUSED' : 'PLAYING'}
                </span>
              </button>

              {/* Fullscreen toggle */}
              <button
              onClick={() => {setMobileControlsOpen(false), toggleFullscreen()}}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-surface-elevated border border-border text-foreground font-semibold text-sm cursor-pointer active:scale-[0.99] transition-transform"
              >
                <span className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
                  </span>
                  {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                </span>
                <span className="text-[10px] font-mono text-foreground-muted tracking-widest">
                  {isFullscreen ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Stop tour */}
              <button
                onClick={() => {
                  stopTour();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-accent text-accent-contrast font-semibold text-sm cursor-pointer active:scale-[0.99] transition-transform shadow-lg shadow-accent/25"
              >
                <FiX size={16} />
                Stop Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}