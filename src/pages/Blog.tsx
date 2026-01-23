import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CTASection } from '@/components/CTASection';
import { Calendar } from 'lucide-react';

const posts = [
  {
    title: 'Como registrar sua marca no INPI: Guia completo',
    excerpt: 'Entenda todo o processo de registro de marca, desde a pesquisa de anterioridade até a concessão do registro.',
    date: '15 Jan 2026',
    category: 'Registro de Marca',
  },
  {
    title: '5 erros comuns ao registrar uma marca',
    excerpt: 'Conheça os principais erros que empreendedores cometem ao tentar registrar suas marcas e como evitá-los.',
    date: '10 Jan 2026',
    category: 'Dicas',
  },
  {
    title: 'A importância da proteção de marca para startups',
    excerpt: 'Por que proteger sua marca desde o início pode ser crucial para o sucesso do seu negócio.',
    date: '05 Jan 2026',
    category: 'Startups',
  },
  {
    title: 'Diferenças entre marca, patente e direito autoral',
    excerpt: 'Entenda as diferenças fundamentais entre os principais tipos de propriedade intelectual.',
    date: '28 Dez 2025',
    category: 'Educação',
  },
  {
    title: 'Quanto tempo demora um registro de marca?',
    excerpt: 'Saiba os prazos médios do INPI e o que pode acelerar ou atrasar seu processo de registro.',
    date: '20 Dez 2025',
    category: 'Registro de Marca',
  },
  {
    title: 'Marcas famosas que quase perderam seus registros',
    excerpt: 'Histórias de marcas conhecidas que enfrentaram batalhas jurídicas para proteger seus nomes.',
    date: '15 Dez 2025',
    category: 'Cases',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-cream section-padding">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-foreground mb-6">
                Blog
              </h1>
              <p className="text-muted-foreground text-lg font-body">
                Conteúdo sobre propriedade intelectual, registro de marca e proteção jurídica para o seu negócio.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding bg-background">
          <div className="container-narrow">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-cream p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                >
                  <span className="text-xs font-body bg-pink-light text-primary px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-foreground text-lg font-heading mt-4 mb-3 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body">{post.date}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
