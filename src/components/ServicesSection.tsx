import { motion } from 'framer-motion';
import { Shield, FileText, Scale, PenTool, Lightbulb, Briefcase, Palette } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Registro de Marca',
    desc: 'Proteção completa da sua marca junto ao INPI.',
    items: ['Pesquisa de anterioridade', 'Protocolo e acompanhamento', 'Defesa em oposições'],
    featured: true,
  },
  {
    icon: FileText,
    title: 'Notificações Extrajudiciais',
    desc: 'Comunicação formal ao infrator — rápida e eficiente.',
    items: ['Análise da infração', 'Redação estratégica', 'Acompanhamento'],
  },
  {
    icon: Scale,
    title: 'Contratos Sob Medida',
    desc: 'Segurança jurídica para suas relações comerciais.',
    items: ['Elaboração personalizada', 'Revisão contratual', 'Licenciamento de marca'],
  },
  {
    icon: Palette,
    title: 'Registro de Desenho Industrial',
    desc: 'Proteção visual do seu produto.',
    items: ['Análise de registrabilidade', 'Protocolo no INPI', 'Defesa de design'],
  },
  {
    icon: PenTool,
    title: 'Proteção de Direitos Autorais',
    desc: 'Segurança para suas criações e conteúdos.',
    items: ['Registro de obras', 'Contratos de cessão', 'Defesa autoral'],
  },
  {
    icon: Lightbulb,
    title: 'Consultoria Estratégica',
    desc: 'Visão de marca para crescer com proteção.',
    items: ['Diagnóstico de portfólio', 'Estratégia de classes', 'Planejamento de PI'],
  },
  {
    icon: Briefcase,
    title: 'Assessoria Empresarial Continuada',
    desc: 'Plano mensal para quem quer crescer protegida.',
    items: ['Gestão contínua de marcas', 'Contratos recorrentes', 'Atendimento prioritário'],
  },
];

export function ServicesSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicos" className="section-padding bg-creme">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase">
            Serviços
          </span>
          <h2 className="text-foreground mt-3">
            A proteção que a sua marca
            <br />
            precisa para crescer.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`group rounded-lg p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer ${
                service.featured
                  ? 'bg-foreground text-primary-foreground sm:col-span-2 md:col-span-1 md:row-span-2 flex flex-col justify-between hover:shadow-2xl'
                  : 'bg-primary-foreground border border-border hover:border-primary'
              }`}
              onClick={() => scrollTo('#contato')}
            >
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                  service.featured ? 'bg-primary/20' : 'bg-rosa-light'
                }`}>
                  <service.icon className={`w-5 h-5 ${service.featured ? 'text-primary' : 'text-primary group-hover:text-primary'}`} />
                </div>
                <h3 className={`font-heading text-xl mb-2 ${service.featured ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {service.title}
                </h3>
                <p className={`font-body text-sm mb-4 ${service.featured ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {service.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className={`font-body text-sm flex items-center gap-2 ${
                      service.featured ? 'text-primary-foreground/60' : 'text-muted-foreground'
                    }`}>
                      <span className="text-primary text-xs">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {service.featured ? (
                <button
                  onClick={(e) => { e.stopPropagation(); scrollTo('#viabilidade'); }}
                  className="bg-primary text-primary-foreground font-body font-semibold px-6 py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark w-full text-sm"
                >
                  Quero registrar a minha marca.
                </button>
              ) : (
                <span className="text-primary font-body text-sm font-medium group-hover:underline">
                  Saiba mais →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
