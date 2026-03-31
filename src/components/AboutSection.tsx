import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-creme rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary font-heading text-5xl italic">ML</span>
                  </div>
                  <p className="text-muted-foreground font-body text-sm">Foto Maria Luiza Monteiro</p>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-foreground/90 backdrop-blur-sm text-primary-foreground rounded-lg px-4 py-3">
                <p className="font-body text-xs font-semibold tracking-wider uppercase text-primary">Fundadora</p>
                <p className="font-body text-sm text-primary-foreground/80">Mestranda em PI — INPI</p>
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
            <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase block mb-4">
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
              <p className="text-primary font-heading text-2xl italic">
                De empresária para empresárias.
              </p>
            </div>

            {/* Card */}
            <div className="bg-foreground rounded-lg p-8 mt-8">
              <p className="text-primary-foreground font-heading text-2xl italic mb-3">
                "O jurídico é branding."
              </p>
              <p className="text-primary-foreground/60 font-body text-sm">
                — Maria Luiza Monteiro, fundadora
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
