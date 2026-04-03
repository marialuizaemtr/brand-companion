import { motion } from 'framer-motion';
import mariaLuizaImg from '@/assets/maria-luiza.jpeg';

export function AboutSection() {
  return (
    <section id="sobre" className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] max-h-[60vh] lg:max-h-none bg-creme rounded-lg overflow-hidden relative">
              <img 
                src={mariaLuizaImg} 
                alt="Maria Luiza Monteiro, fundadora da Permarke" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/90 backdrop-blur-sm text-primary-foreground rounded-lg px-4 py-3">
                <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary">Fundadora</p>
                <p className="font-body text-sm text-primary-foreground/80">Maria Luiza Monteiro | @marialuizaemtr</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-heading text-lg font-bold tracking-widest uppercase block mb-4">
              Sobre a Permarke
            </span>

            <div className="space-y-5 text-muted-foreground font-body leading-relaxed">
              <p>
                A Permarke nasceu de uma convicção simples: o jurídico deveria trabalhar a favor da 
                sua marca — não contra o seu tempo. Maria Luiza Monteiro, advogada e mestranda em PI 
                pelo INPI, criou a Permarke para ser diferente de tudo que existe no mercado.
              </p>
              <p>
                Sem distância. Sem juridiquês. Com estratégia de verdade.
              </p>
            </div>

            {/* Quote highlight */}
            <div className="my-8 pl-6 border-l-4 border-primary">
              <p className="text-primary text-2xl italic" style={{ fontFamily: "'Bois de Jasmin Script', cursive" }}>
                De empresária para empresárias.
              </p>
            </div>

            {/* Card */}
            <div className="bg-foreground rounded-lg p-8 mt-8">
              <p className="text-primary-foreground font-heading text-2xl italic mb-3">
                "O jurídico é branding."
              </p>
              <p className="text-primary-foreground/60 font-body text-sm">
                parte indispensável da estratégia e do posicionamento da marca.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
