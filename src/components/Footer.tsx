import { Instagram, MessageCircle, Mail } from 'lucide-react';
import logoBranca from '@/assets/logo-branca.png';

const footerLinks = {
  servicos: [
    'Registro de Marca',
    'Notificações Extrajudiciais',
    'Contratos Sob Medida',
    'Registro de Desenho Industrial',
    'Proteção de Direitos Autorais',
    'Consultoria Estratégica',
    'Assessoria Continuada',
  ],
  parcerias: [
    { name: 'Programa de Parcerias', href: '#parcerias' },
    { name: 'Cadastre-se', href: '#parcerias' },
  ],
  redes: [
    { icon: Instagram, label: '@permarke', href: 'https://instagram.com/permarke' },
    { icon: Instagram, label: '@marialuizaemtr', href: 'https://instagram.com/marialuizaemtr' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/5512997206639' },
    { icon: Mail, label: 'E-mail', href: 'mailto:contato@permarke.com.br' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & tagline */}
          <div className="lg:col-span-1">
            <img src={logoBranca} alt="Permarke" className="h-8 w-auto mb-4" />
            <p className="font-heading text-sm italic text-primary-foreground/70 mb-1">O jurídico é branding.</p>
            <p className="font-body text-xs text-primary-foreground/50">De empresária para empresárias.</p>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-heading text-lg mb-4">Serviços</h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((s) => (
                <li key={s}>
                  <a href="#servicos" className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Parcerias */}
          <div>
            <h4 className="font-heading text-lg mb-4">Parcerias</h4>
            <ul className="space-y-2">
              {footerLinks.parcerias.map((p) => (
                <li key={p.name}>
                  <a href={p.href} className="text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="font-heading text-lg mb-4">Redes</h4>
            <ul className="space-y-3">
              {footerLinks.redes.map((r) => (
                <li key={r.label}>
                  <a href={r.href} target="_blank" rel="noopener" className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm font-body transition-colors">
                    <r.icon className="w-4 h-4" />
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/40 font-body">
            © 2025 Permarke · Proteção de Marcas e Ativos Intangíveis
          </p>
        </div>
      </div>
    </footer>
  );
}
