import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language } from '@/types/language';

const navLinks: Record<Language, Array<{ name: string; href: string }>> = {
  zh: [
    { name: '关于我', href: '#about' },
    { name: '个人经历', href: '#awards' },
    { name: '科研成果', href: '#research' },
    { name: '项目经历', href: '#projects' },
    { name: '相关技能', href: '#skills' },
  ],
  en: [
    { name: 'About Me', href: '#about' },
    { name: 'Experience Hightlights', href: '#awards' },
    { name: 'Research Outputs', href: '#research' },
    { name: 'Projects Experience', href: '#projects' },
    { name: 'Related Skills', href: '#skills' },
  ],
};

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
}

export default function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isEnglish = language === 'en';
  const links = navLinks[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-&lsqb;cubic-bezier(0.16,1,0.3,1)&rsqb; ${
          isScrolled
            ? 'py-3'
            : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3'
                : 'px-2'
            }`}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xl font-bold text-white hover:text-neon-green transition-colors"
            >
              <span className="text-gradient">{isEnglish ? 'ChongEn Huang' : '黄崇恩'}</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="relative text-sm text-white/70 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleLanguage}
                className="px-4 py-2 text-sm font-medium text-white/80 border border-white/20 rounded-full hover:text-white hover:border-neon-cyan/50 transition-all duration-300"
              >
                {isEnglish ? '中文' : 'English'}
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-5 py-2 text-sm font-medium text-dark-bg bg-neon-green rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                {isEnglish ? 'Contact' : '联系我'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl text-white/80 hover:text-neon-green transition-colors"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-8 py-3 text-lg font-medium text-white/90 border border-white/20 rounded-full"
          >
            {isEnglish ? '中文' : 'English'}
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-8 py-3 text-lg font-medium text-dark-bg bg-neon-green rounded-full"
          >
            {isEnglish ? 'Contact' : '联系我'}
          </button>
        </div>
      </div>
    </>
  );
}
