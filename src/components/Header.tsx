import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoBranca from '@/assets/logo-branca.png';

const navLinks = [
  { name: 'HOME', href: '#hero', isAnchor: true },
  { name: 'SERVIÇOS', href: '#servicos', isAnchor: true },
  { name: 'PARCERIAS', href: '#parcerias', isAnchor: true },
  { name: 'DEPOIMENTOS', href: '#depoimentos', isAnchor: true },
  { name: 'FAQ', href: '#faq', isAnchor: true },
  { name: 'CONTATO', href: '#contato', isAnchor: true },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle anchor scroll after navigation to home
  useEffect(() => {
    if (isHome && location.state?.scrollTo) {
      const target = location.state.scrollTo;
      // Small delay to let the page render
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clear state
      window.history.replaceState({}, '');
    }
  }, [isHome, location.state]);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: href } });
    }
  };

  const goHome = () => {
    setIsMenuOpen(false);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary shadow-lg' : 'bg-primary'}`}>
      <div className="container-narrow">
        <nav className="flex items-center justify-between h-20">
          <button onClick={goHome} className="flex-shrink-0">
            <img src={logoBranca} alt="Permarke" className="h-8 md:h-10 w-auto" />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-primary-foreground font-body text-sm font-medium tracking-wide transition-opacity duration-200 hover:opacity-100 ${
                    isHome && activeSection === link.href.slice(1) ? 'opacity-100' : 'opacity-70'
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground font-body text-sm font-medium tracking-wide transition-opacity duration-200 hover:opacity-100 opacity-70"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:block">
            <Button variant="nav" size="lg" onClick={() => scrollTo('#viabilidade')}>
              REGISTRAR MINHA MARCA
            </Button>
          </div>

          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top bg-primary">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-primary-foreground font-body text-sm font-medium tracking-wide py-2 text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-primary-foreground font-body text-sm font-medium tracking-wide py-2"
                  >
                    {link.name}
                  </Link>
                )
              )}
              <Button variant="nav" size="lg" className="w-full mt-4" onClick={() => scrollTo('#viabilidade')}>
                REGISTRAR MINHA MARCA
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
