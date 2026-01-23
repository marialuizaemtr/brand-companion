import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  nome: z.string().trim().min(1, 'Nome é obrigatório').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  telefone: z.string().trim().min(10, 'Telefone inválido').max(20),
  nomeMarca: z.string().trim().min(1, 'Nome da marca é obrigatório').max(200),
  segmento: z.string().trim().min(1, 'Segmento é obrigatório').max(200),
  descricao: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const RegistrarMarca = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    nomeMarca: '',
    segmento: '',
    descricao: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);
      console.log('Form submitted:', validatedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Formulário enviado com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        nomeMarca: '',
        segmento: '',
        descricao: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error('Erro ao enviar formulário. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="section-padding bg-cream">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-foreground mb-6">
                Registro de Marca:
                <br />
                Seu maior ativo.
              </h1>
              <div className="space-y-6 text-muted-foreground font-body">
                <div>
                  <h3 className="text-foreground font-heading text-xl mb-2">Proteção em todo o Brasil</h3>
                  <p>Sua marca protegida nacionalmente com validade de 10 anos, renovável indefinidamente.</p>
                </div>
                <div>
                  <h3 className="text-foreground font-heading text-xl mb-2">Aumente o Valor do Seu Negócio</h3>
                  <p>Marcas registradas valorizam sua empresa e atraem investidores e parceiros estratégicos.</p>
                </div>
                <div>
                  <h3 className="text-foreground font-heading text-xl mb-2">Segurança Jurídica Completa</h3>
                  <p>Exclusividade de uso e direito de impedir terceiros de utilizarem sua marca indevidamente.</p>
                </div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-background p-8 rounded-lg border border-border">
                <h2 className="text-foreground text-2xl font-heading mb-2">
                  Análise de viabilidade gratuita
                </h2>
                <p className="text-muted-foreground font-body mb-8">
                  Preencha o formulário e nossa equipe entrará em contato.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="nomeMarca">Nome da marca</Label>
                    <Input
                      id="nomeMarca"
                      name="nomeMarca"
                      value={formData.nomeMarca}
                      onChange={handleChange}
                      placeholder="Nome que deseja registrar"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="segmento">Segmento de atuação</Label>
                    <Input
                      id="segmento"
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleChange}
                      placeholder="Ex: Moda, Tecnologia, Alimentação..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição (opcional)</Label>
                    <Textarea
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      placeholder="Conte um pouco sobre sua marca..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="pinkCta" 
                    size="xl" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'SOLICITAR ANÁLISE GRATUITA'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrarMarca;
