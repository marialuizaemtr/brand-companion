import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-lawyer.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Advogada Permarke"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-background text-5xl md:text-6xl lg:text-7xl leading-tight mb-8"
          >
            O jurídico é
            <br />
            branding.
            <br />
            <span className="italic">Sua marca</span>
            <br />
            merece mais
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-background/80 text-lg md:text-xl mb-10 font-body max-w-lg"
          >
            O hub jurídico que une proteção e potência para suas propriedades intelectuais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/registrar-marca">
              <Button variant="hero" size="xl" className="bg-primary text-primary-foreground hover:bg-pink-dark">
                REGISTRAR MINHA MARCA
              </Button>
            </Link>
            <Link to="/servicos">
              <Button variant="heroOutline" size="xl" className="border-background text-background hover:bg-background hover:text-foreground">
                CONHEÇA OS NOSSOS SERVIÇOS
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
