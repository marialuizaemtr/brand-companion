import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoBranca from '@/assets/logo-branca.png';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'SERVIÇOS', path: '/servicos' },
  { name: 'PARCERIAS', path: '/parcerias' },
  { name: 'CURSOS', path: '/cursos' },
  { name: 'BLOG', path: '/blog' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="container-narrow">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logoBranca} 
              alt="Permarke" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-primary-foreground font-body text-sm font-medium tracking-wide transition-opacity duration-200 hover:opacity-80 ${
                  location.pathname === link.path ? 'opacity-100' : 'opacity-90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/registrar-marca">
              <Button variant="nav" size="lg">
                REGISTRAR MINHA MARCA
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-primary-foreground font-body text-sm font-medium tracking-wide py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/registrar-marca" onClick={() => setIsMenuOpen(false)}>
                <Button variant="nav" size="lg" className="w-full mt-4">
                  REGISTRAR MINHA MARCA
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
