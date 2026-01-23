import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import logoBranca from '@/assets/logo-branca.png';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Mail, href: 'mailto:contato@permarke.com.br', label: 'Email' },
];

const footerLinks = {
  solucoes: [
    { name: 'Registro de Marca', path: '/servicos' },
    { name: 'Contratos', path: '/servicos' },
    { name: 'Proteção de Direitos', path: '/servicos' },
  ],
  empresa: [
    { name: 'Sobre', path: '/' },
    { name: 'Parcerias', path: '/parcerias' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Blog', path: '/blog' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Social */}
          <div className="lg:col-span-1">
            <img 
              src={logoBranca} 
              alt="Permarke" 
              className="h-8 w-auto mb-6"
            />
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-background/70 hover:text-background transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h4 className="font-heading text-lg mb-4">Soluções</h4>
            <ul className="space-y-3">
              {footerLinks.solucoes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-background text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>contato@permarke.com.br</li>
              <li>(11) 99999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Permarke. Todos os direitos reservados.
          </p>
          <p className="text-sm text-background/60">
            Hub Jurídico para Marcas
          </p>
        </div>
      </div>
    </footer>
  );
}
