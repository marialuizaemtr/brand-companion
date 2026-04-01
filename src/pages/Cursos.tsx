import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Video, Award, Clock } from 'lucide-react';

const courses = [
  {
    title: 'Fundamentos do Registro de Marca',
    description: 'Aprenda tudo sobre o processo de registro de marca no INPI, desde a pesquisa até a concessão.',
    duration: '4 horas',
    level: 'Iniciante',
  },
  {
    title: 'Contratos para Empreendedores',
    description: 'Entenda os principais contratos que todo empreendedor precisa conhecer para proteger seu negócio.',
    duration: '6 horas',
    level: 'Intermediário',
  },
  {
    title: 'Propriedade Intelectual na Prática',
    description: 'Curso completo sobre direitos autorais, patentes, desenhos industriais e segredos de negócio.',
    duration: '8 horas',
    level: 'Avançado',
  },
];

const Cursos = () => {
  useEffect(() => {
    document.title = 'Cursos — Permarke | Aprenda sobre Registro de Marca';
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-primary-foreground mb-6">
                Cursos
              </h1>
              <p className="text-primary-foreground/80 text-lg font-body">
                Conhecimento jurídico acessível para empreendedores e profissionais que querem proteger suas marcas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-background border-b border-border">
          <div className="container-narrow">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-primary" />
                <span className="font-body">Aulas em vídeo</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="font-body">Material de apoio</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-body">Certificado</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" />
                <span className="font-body">Acesso vitalício</span>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
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
                Nossos Cursos
              </h2>
              <p className="text-muted-foreground font-body">
                Em breve, novos cursos disponíveis.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-8 rounded-lg border border-border"
                >
                  <div className="flex gap-4 mb-4">
                    <span className="text-xs font-body bg-pink-light text-primary px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs font-body bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="text-foreground text-xl font-heading mb-3">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-6">
                    {course.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    EM BREVE
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-foreground">
          <div className="container-narrow text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-background mb-6">
                Quer ser avisado sobre novos cursos?
              </h2>
              <p className="text-background/80 font-body text-lg max-w-2xl mx-auto mb-8">
                Cadastre-se e receba em primeira mão as novidades sobre nossos cursos e conteúdos exclusivos.
              </p>
              <Link to="/registrar-marca">
                <Button variant="pinkCta" size="xl">
                  CADASTRAR MEU INTERESSE
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

export default Cursos;
