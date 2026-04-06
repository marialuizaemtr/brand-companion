import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import moniqueImg from '@/assets/testimonial-monique.png';
import pauloImg from '@/assets/testimonial-paulo.jpeg';

const testimonials = [
  {
    text: 'Procurei a Permarke por meio de uma indicação e o atendimento desde o primeiro contato foi impecável! Explicou tudo de forma muito simples e me encantou todo o cuidado. Indico demais!',
    name: 'Monique Fernandes',
    role: 'Arquitetura',
    avatar: moniqueImg,
  },
  {
    text: 'Recebi uma notificação de uma marca usando meu nome. A Permarke resolveu. Não precisei entender nada do processo.',
    name: 'Camila S.',
    role: 'Cosméticos',
  },
  {
    text: 'Indico a Permarke para todos os meus clientes. Eles ficam protegidos e eu ainda ganho por isso.',
    name: 'Lucas P.',
    role: 'Criativo',
  },
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="section-padding bg-creme">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase block mb-4">
            Depoimentos
          </span>
          <h2 className="text-foreground">
            Quem registrou,
            <br />
            <span className="italic">dormiu tranquila.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-primary-foreground rounded-xl p-8 border border-border hover:-translate-y-1.5 hover:shadow-xl hover:border-primary transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground font-body text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rosa-light flex items-center justify-center overflow-hidden">
                  {'avatar' in t && t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-primary font-heading text-sm font-bold">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-foreground font-body text-sm font-medium">{t.name}</p>
                  <p className="text-muted-foreground font-body text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
