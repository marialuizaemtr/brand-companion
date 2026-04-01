import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Shield, FileText, Scale } from 'lucide-react';

const stats = [
  { value: 500, suffix: '+', label: 'marcas protegidas' },
  { value: 98, suffix: '%', label: 'de aprovação' },
  { value: 5, suffix: '★', label: 'avaliação' },
];

const miniServices = [
  { icon: Shield, title: 'Registro de Marca', desc: 'Proteção completa no INPI' },
  { icon: FileText, title: 'Contratos Sob Medida', desc: 'Segurança jurídica real' },
  { icon: Scale, title: 'Consultoria Estratégica', desc: 'Visão para crescer' },
];

const marqueeTexts = [
  'O jurídico é branding.',
  'De empresária para empresárias.',
  'Dona da marca é quem registra.',
  'Sem registro você não tem uma marca.',
  'A burocracia fica com a gente.',
  'Chama a Permarke. A gente resolve.',
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-primary font-heading text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </span>
  );
}

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-foreground overflow-hidden pt-20">
      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-40 md:w-72 h-40 md:h-72 rounded-full bg-primary/20 blur-3xl animate-orb" />
      <div className="absolute bottom-20 right-10 md:right-20 w-60 md:w-96 h-60 md:h-96 rounded-full bg-primary/10 blur-3xl animate-orb-delay" />
      <div className="absolute top-1/2 left-1/2 w-32 md:w-48 h-32 md:h-48 rounded-full bg-primary/15 blur-2xl animate-orb-delay-2" />

      <div className="container-narrow relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-10 md:py-16 lg:py-24">
        {/* Left content */}
        <div className="flex-1 max-w-2xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-body text-sm font-semibold tracking-widest uppercase mb-6"
          >
            De empresária para empresárias.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-primary-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 md:mb-8"
          >
            O jurídico é
            <br />
            <span className="italic">branding.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-primary-foreground/70 text-base md:text-lg lg:text-xl mb-8 md:mb-10 font-body max-w-lg leading-relaxed"
          >
            Um pontinho rosa num oceano jurídico e burocrático.
            <br />
            A proteção que a sua marca precisa para crescer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <button
              onClick={() => scrollTo('#viabilidade')}
              className="bg-primary text-primary-foreground font-body font-semibold px-8 py-4 rounded-sm transition-all duration-300 hover:bg-rosa-dark hover:scale-105 active:scale-100 text-base"
            >
              Quero registrar a minha marca.
            </button>
            <button
              onClick={() => scrollTo('#servicos')}
              className="border border-primary-foreground/30 text-primary-foreground font-body font-medium px-8 py-4 rounded-sm transition-all duration-300 hover:bg-primary-foreground hover:text-foreground text-base"
            >
              Conheça os nossos serviços
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex gap-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-primary-foreground/50 font-body text-xs mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — mini service cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col gap-4 flex-shrink-0 w-80"
        >
          {miniServices.map((s, i) => (
            <div
              key={s.title}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <s.icon className="w-6 h-6 text-primary mb-3" />
              <h3 className="text-primary-foreground font-heading text-lg mb-1">{s.title}</h3>
              <p className="text-primary-foreground/50 font-body text-sm">{s.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
            <span key={i} className="text-primary-foreground font-body text-sm font-medium mx-8 inline-block">
              {text} <span className="mx-4 opacity-50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
