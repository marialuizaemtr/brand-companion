import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section-padding bg-primary">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary-foreground mb-6">
            Registro de Marca:
            <br />
            Seu maior ativo.
          </h2>
          <p className="text-primary-foreground/80 font-body text-lg max-w-2xl mx-auto mb-10">
            Proteja sua marca e garanta a exclusividade do seu negócio. 
            Nossa análise de viabilidade é gratuita.
          </p>
          <Link to="/registrar-marca">
            <Button variant="hero" size="xl">
              REGISTRAR MINHA MARCA
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
