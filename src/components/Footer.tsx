import { Link } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';

const externalLinks = [
  { label: 'Digital Mathematics', href: 'https://digitalmathematics.org' },
  { label: 'GitHub', href: 'https://github.com/JonatanGS777' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yonatan-guerrero-soriano-6b3729136/' },
];

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.projects, path: '/projects' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <footer className="bg-[#111827]">
      <div className="max-container container-padding pt-16 md:pt-24 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Name */}
          <div>
            <h3 className="font-accent text-[1.25rem] font-semibold text-[#F0EDE6]">
              Yonatan Guerrero Soriano
            </h3>
            <p className="mt-2 text-[0.875rem] font-light text-[#9BA3AF] leading-relaxed">
              {t.footer.subtitle}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-caption text-[#5A6375] mb-4">{t.footer.navLabel}</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[0.875rem] text-[#9BA3AF] hover:text-[#F0EDE6] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: External Links */}
          <div>
            <h4 className="text-caption text-[#5A6375] mb-4">{t.footer.linksLabel}</h4>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.875rem] text-[#9BA3AF] hover:text-[#D4A853] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-caption text-[#5A6375] mb-4">{t.footer.contactLabel}</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:contacto@yonatanguerrero.com"
                  className="text-[0.875rem] text-[#D4A853] hover:text-[#F0EDE6] transition-colors duration-300"
                >
                  contacto@yonatanguerrero.com
                </a>
              </li>
              <li className="text-[0.875rem] text-[#9BA3AF]">
                {t.footer.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1A2235] my-10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.75rem] text-[#5A6375]">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
