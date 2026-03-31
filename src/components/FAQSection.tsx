import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Quanto tempo leva o registro?',
    a: '18 a 36 meses. Mas a proteção começa no protocolo — você já pode usar o símbolo ® em trâmite.',
  },
  {
    q: 'Precisa ter CNPJ?',
    a: 'Não. Tanto pessoa física quanto pessoa jurídica podem registrar marca no INPI.',
  },
  {
    q: 'O que é classe?',
    a: 'Categoria que define o que a marca protege. Classe errada = janela aberta para concorrentes.',
  },
  {
    q: 'O que acontece se eu não registrar?',
    a: 'Qualquer pessoa pode registrar seu nome antes de você. Sem registro não tem marca, tem nome.',
  },
  {
    q: 'O que é notificação extrajudicial?',
    a: 'Comunicação formal ao infrator. Mais rápida que processo judicial. Muitas vezes resolve sem ação judicial.',
  },
  {
    q: 'Vocês atendem em todo o Brasil?',
    a: 'Sim. 100% digital. Atendemos empresas de todo o Brasil com a mesma agilidade.',
  },
  {
    q: 'Como funciona a assessoria continuada?',
    a: 'Plano mensal com contratos, gestão de marcas e atendimento prioritário. Ideal para quem quer crescer protegida.',
  },
  {
    q: 'Como funcionam as parcerias?',
    a: 'Você se cadastra, recebe um código exclusivo, registra indicações e ganha 10% via Pix em até 7 dias após o fechamento.',
  },
];

export function FAQSection() {
  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  return (
    <section id="faq" className="section-padding bg-creme">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase block mb-4">
            FAQ
          </span>
          <h2 className="text-foreground">
            Perguntas frequentes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[col1, col2].map((col, colIdx) => (
            <Accordion key={colIdx} type="single" collapsible className="space-y-2">
              {col.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${colIdx}-${i}`} className="bg-primary-foreground rounded-lg border border-border px-6">
                  <AccordionTrigger className="text-foreground font-body text-sm font-medium text-left hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
