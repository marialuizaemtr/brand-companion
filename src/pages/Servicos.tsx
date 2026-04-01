import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';
import { Shield, FileText, Scale, BookOpen, Gavel, Users } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Registro de Marca',
    description: 'Proteja sua marca junto ao INPI com nossa assessoria completa. Realizamos pesquisa de anterioridade, acompanhamento do processo e defesa em caso de oposições.',
  },
  {
    icon: FileText,
    title: 'Contratos Estratégicos',
    description: 'Elaboração e revisão de contratos empresariais, licenciamento de marca, franquias, acordos de confidencialidade e muito mais.',
  },
  {
    icon: Scale,
    title: 'Proteção de Direitos Autorais',
    description: 'Registro e defesa de obras intelectuais, software, designs e conteúdos criativos. Proteja suas criações originais.',
  },
  {
    icon: BookOpen,
    title: 'Consultoria em PI',
    description: 'Consultoria especializada em propriedade intelectual para empresas de todos os portes. Estratégias personalizadas para seu negócio.',
  },
  {
    icon: Gavel,
    title: 'Defesa de Marca',
    description: 'Atuação em processos de oposição, nulidade e contrafação. Proteja sua marca contra usos indevidos.',
  },
  {
    icon: Users,
    title: 'Assessoria Empresarial',
    description: 'Suporte jurídico completo para empreendedores e empresas. Due diligence, societário e compliance.',
  },
];

const Servicos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-primary-foreground mb-6">
                Nossos Serviços
              </h1>
              <p className="text-primary-foreground/80 text-lg font-body">
                Soluções jurídicas completas para proteger e potencializar sua marca.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-cream p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-pink-light rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-foreground text-xl font-heading mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Servicos;
