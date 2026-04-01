import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Handshake, TrendingUp, Users, Award } from 'lucide-react';

const benefits = [
  {
    icon: Handshake,
    title: 'Parceria Estratégica',
    description: 'Trabalhe conosco em projetos de registro de marca e propriedade intelectual.',
  },
  {
    icon: TrendingUp,
    title: 'Comissionamento',
    description: 'Receba comissões por indicações que se convertam em contratos.',
  },
  {
    icon: Users,
    title: 'Rede de Contatos',
    description: 'Faça parte de nossa rede de parceiros e amplie suas oportunidades.',
  },
  {
    icon: Award,
    title: 'Capacitação',
    description: 'Acesso a treinamentos e materiais exclusivos sobre propriedade intelectual.',
  },
];

const Parcerias = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-foreground section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-background mb-6">
                Parcerias
              </h1>
              <p className="text-background/80 text-lg font-body mb-8">
                Junte-se ao hub jurídico que está transformando a forma como marcas são protegidas no Brasil.
              </p>
              <Link to="/registrar-marca">
                <Button variant="pinkCta" size="xl">
                  SEJA UM PARCEIRO
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-cream">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-foreground mb-4">
                Por que ser parceiro Permarke?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-foreground text-lg font-heading mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-narrow text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-foreground mb-6">
                Pronto para crescer conosco?
              </h2>
              <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8">
                Entre em contato para conhecer nosso programa de parcerias e descobrir como podemos trabalhar juntos.
              </p>
              <Link to="/registrar-marca">
                <Button variant="cta" size="xl">
                  FALE CONOSCO
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Parcerias;
