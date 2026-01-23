import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileText, Scale } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'REGISTRO DE MARCA',
    subtitle: '(INPI)',
    description: 'Proteção completa da sua marca junto ao INPI. Pesquisa de anterioridade e acompanhamento do processo.',
    link: '/servicos',
  },
  {
    icon: FileText,
    title: 'CONTRATOS ESTRATÉGICOS',
    description: 'Elaboração e revisão de contratos empresariais, licenciamento e acordos de confidencialidade.',
    link: '/servicos',
  },
  {
    icon: Scale,
    title: 'PROTEÇÃO DE DIREITOS AUTORAIS',
    description: 'Registro e defesa de obras intelectuais, software, designs e conteúdos criativos.',
    link: '/servicos',
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-wider uppercase">
            Serviços (Hub)
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-lg border border-border hover:border-primary transition-colors duration-300 group"
            >
              <div className="w-14 h-14 bg-pink-light rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-foreground text-lg font-heading mb-1">
                {service.title}
              </h3>
              {service.subtitle && (
                <span className="text-muted-foreground text-sm font-body block mb-3">
                  {service.subtitle}
                </span>
              )}
              <p className="text-muted-foreground text-sm font-body mb-4">
                {service.description}
              </p>
              <Link 
                to={service.link}
                className="text-primary text-sm font-body font-medium hover:underline"
              >
                SAIBA MAIS
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
