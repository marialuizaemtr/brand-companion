import { motion } from 'framer-motion';

export function CTASection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative section-padding bg-primary overflow-hidden">
      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-primary-foreground/5 font-heading text-[5rem] sm:text-[8rem] md:text-[16rem] lg:text-[20rem] font-bold tracking-tight whitespace-nowrap">
          PERMARKE
        </span>
      </div>

      <div className="container-narrow text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary-foreground mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl">
            Dona da marca é
            <br />
            <span className="italic">quem registra.</span>
          </h2>
          <p className="text-primary-foreground/80 font-body text-base sm:text-lg max-w-xl mx-auto mb-3 sm:mb-4">
            Sem registro você não tem uma marca. Comece agora.
          </p>
          <p className="text-primary-foreground/60 font-body text-sm mb-8 sm:mb-10 italic">
            De empresária para empresárias.
          </p>
          <button
            onClick={() => scrollTo('#viabilidade')}
            className="bg-foreground text-primary-foreground font-body font-semibold px-10 py-4 rounded-sm transition-all duration-300 hover:scale-105 active:scale-100 text-base"
          >
            Comece por aqui.
          </button>
        </motion.div>
      </div>
    </section>
  );
}
