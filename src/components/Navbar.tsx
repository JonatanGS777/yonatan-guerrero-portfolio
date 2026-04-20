import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.projects, path: '/projects' },
    { label: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300',
          'glass',
          scrolled && 'glass-border shadow-glass'
        )}
      >
        <div className="max-container container-padding w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 select-none">
            <span className="font-display text-[1.25rem] font-bold text-[#F0EDE6] tracking-tight">
              YGS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] inline-block mt-1" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative text-[0.875rem] uppercase tracking-[0.08em] transition-colors duration-300 group',
                    isActive ? 'text-[#F0EDE6]' : 'text-[#9BA3AF] hover:text-[#F0EDE6]'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute left-0 -bottom-1 h-px bg-[#D4A853] transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side: Lang toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#1A2235] text-[0.75rem] font-mono uppercase tracking-[0.08em] text-[#9BA3AF] hover:border-[#D4A853] hover:text-[#D4A853] transition-all duration-300"
              aria-label="Toggle language"
            >
              <span className={cn('transition-colors duration-200', lang === 'es' ? 'text-[#D4A853]' : 'text-[#9BA3AF]')}>ES</span>
              <span className="text-[#1A2235]">/</span>
              <span className={cn('transition-colors duration-200', lang === 'en' ? 'text-[#D4A853]' : 'text-[#9BA3AF]')}>EN</span>
            </button>

            {/* CTA Button */}
            <Link
              to="/contact"
              className={cn(
                'inline-flex items-center px-5 py-2 border text-[0.875rem] font-medium uppercase tracking-[0.06em] transition-all duration-300',
                'border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-[#0A0E1A]'
              )}
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Mobile: Lang toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="text-[0.75rem] font-mono text-[#9BA3AF] hover:text-[#D4A853] transition-colors duration-300"
              aria-label="Toggle language"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  'block w-6 h-px bg-[#F0EDE6] transition-transform duration-300',
                  mobileOpen && 'translate-y-[3.5px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-px bg-[#F0EDE6] transition-opacity duration-300',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-px bg-[#F0EDE6] transition-transform duration-300',
                  mobileOpen && '-translate-y-[3.5px] -rotate-45'
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-[#F0EDE6] transition-all duration-500',
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : '0ms' }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className={cn(
            'mt-4 px-8 py-3 border border-[#D4A853] text-[#D4A853] text-[1rem] font-medium uppercase tracking-[0.06em] hover:bg-[#D4A853] hover:text-[#0A0E1A] transition-all duration-300',
            mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
          style={{ transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : '0ms' }}
        >
          {t.nav.cta}
        </Link>
      </div>
    </>
  );
}
