import { motion } from 'framer-motion';
import aboutImage from '@/assets/about-image.jpg';

export function AboutSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-cream rounded-lg overflow-hidden">
              <img 
                src={aboutImage} 
                alt="Proteção de marca" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-foreground mb-6">
              Mais que um escritório,
              <br />
              um hub de estratégia.
            </h2>
            <div className="space-y-4 text-muted-foreground font-body">
              <p>
                A Permarke é um hub jurídico especializado em proteção de marcas 
                e propriedade intelectual. Unimos expertise jurídica com visão 
                estratégica para transformar a forma como empresas protegem 
                seus ativos mais valiosos.
              </p>
              <p>
                Nossa missão é democratizar o acesso à proteção de marcas, 
                oferecendo serviços jurídicos de excelência com atendimento 
                humanizado e processos transparentes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
