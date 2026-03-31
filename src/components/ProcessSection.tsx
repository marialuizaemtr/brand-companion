import { motion } from 'framer-motion';

const steps = [
  { emoji: '🗣️', title: 'Conversa', desc: 'Entendemos a sua marca e seu negócio' },
  { emoji: '🔍', title: 'Análise', desc: 'Pesquisa de viabilidade e classes NCL' },
  { emoji: '📤', title: 'Protocolo', desc: 'Registro junto ao INPI' },
  { emoji: '👁️', title: 'Acompanhamento', desc: 'Monitoramos todo o processo' },
  { emoji: '🏆', title: 'Sua marca registrada', desc: 'Proteção garantida' },
];

export function ProcessSection() {
  return (
    <section id="processo" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase block mb-4">
            Como funciona
          </span>
          <h2 className="text-foreground">
            Do primeiro contato
            <br />
            <span className="italic">ao registro.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="w-24 h-24 rounded-full bg-creme mx-auto flex items-center justify-center relative z-10 border-4 border-background">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                <h4 className="text-foreground font-heading text-sm mt-4 mb-1">{step.title}</h4>
                <p className="text-muted-foreground font-body text-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
