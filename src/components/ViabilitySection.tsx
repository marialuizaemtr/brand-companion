import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const segmentos = ['Moda', 'Cosméticos', 'Alimentos', 'Tech', 'Saúde', 'Criativos', 'Educação', 'E-commerce', 'Outro'];

const classesNCL: Record<string, { num: number; nome: string; protege: string; porque: string }[]> = {
  Moda: [
    { num: 25, nome: 'Vestuário', protege: 'Roupas, calçados, chapelaria', porque: 'Classe essencial para marcas de moda e vestuário' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, franquias, marketing', porque: 'Protege a operação comercial e venda dos produtos' },
  ],
  Cosméticos: [
    { num: 3, nome: 'Cosméticos', protege: 'Perfumaria, cuidados pessoais, maquiagem', porque: 'Classe principal para produtos de beleza' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, franquias, marketing', porque: 'Protege a operação comercial e venda' },
    { num: 44, nome: 'Serviços Médicos', protege: 'Serviços de beleza, estética, salões', porque: 'Protege serviços de estética e aplicação' },
  ],
  Alimentos: [
    { num: 29, nome: 'Alimentos Processados', protege: 'Carnes, laticínios, conservas', porque: 'Para alimentos de origem animal e processados' },
    { num: 30, nome: 'Alimentos Base', protege: 'Café, farinhas, doces, condimentos', porque: 'Para alimentos de origem vegetal e confeitaria' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, franquias, marketing', porque: 'Protege a operação comercial' },
  ],
  Tech: [
    { num: 42, nome: 'Tecnologia', protege: 'Software, SaaS, desenvolvimento, TI', porque: 'Classe essencial para empresas de tecnologia' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, plataformas, marketplace', porque: 'Protege a operação digital e comercial' },
  ],
  Saúde: [
    { num: 44, nome: 'Serviços Médicos', protege: 'Clínicas, consultórios, terapias', porque: 'Classe principal para profissionais de saúde' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, marketing de saúde', porque: 'Protege a operação comercial' },
  ],
  Criativos: [
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Agências, estúdios, consultorias', porque: 'Protege serviços criativos e comerciais' },
    { num: 41, nome: 'Educação e Entretenimento', protege: 'Cursos, conteúdo, produção cultural', porque: 'Para criadores de conteúdo e educadores' },
  ],
  Educação: [
    { num: 41, nome: 'Educação e Entretenimento', protege: 'Cursos, treinamentos, publicações', porque: 'Classe essencial para educadores' },
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, plataformas educacionais', porque: 'Protege a operação comercial' },
  ],
  'E-commerce': [
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio eletrônico, marketplace', porque: 'Classe essencial para e-commerce' },
    { num: 42, nome: 'Tecnologia', protege: 'Plataformas digitais, software', porque: 'Para a infraestrutura tecnológica' },
  ],
  Outro: [
    { num: 35, nome: 'Publicidade e Negócios', protege: 'Comércio, franquias, marketing', porque: 'Classe mais abrangente para negócios' },
    { num: 45, nome: 'Serviços Jurídicos e Pessoais', protege: 'Consultorias, serviços especializados', porque: 'Classe complementar para serviços' },
  ],
};

const genericTerms = ['marca', 'brasil', 'shop', 'store', 'plus', 'top', 'max', 'pro', 'gold', 'prime', 'premium'];
const loadingTexts = [
  'Identificando classes NCL...',
  'Analisando distintividade...',
  'Mapeando estratégia...',
  'Verificando anterioridades...',
  'Preparando recomendações...',
];

function checkAlerts(marca: string) {
  const lower = marca.toLowerCase().trim();
  const alerts: { type: 'red' | 'yellow'; msg: string }[] = [];

  if (/^[\d\s]+$/.test(lower)) alerts.push({ type: 'red', msg: 'Marcas compostas apenas por números não são registráveis.' });
  if (/[\u{1F300}-\u{1FAFF}]/u.test(lower)) alerts.push({ type: 'red', msg: 'Emojis não podem ser registrados como marca.' });
  if (lower.length <= 3 && lower.length > 0) alerts.push({ type: 'yellow', msg: 'Marcas com 1-3 letras têm menor distintividade e podem enfrentar dificuldades.' });
  genericTerms.forEach((term) => {
    if (lower.includes(term)) alerts.push({ type: 'yellow', msg: `O termo "${term}" é genérico e pode dificultar o registro.` });
  });

  return alerts;
}

export function ViabilitySection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ marca: '', segmento: '', nome: '', whatsapp: '', email: '', como_encontrou: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!form.marca.trim()) errs.marca = true;
    if (!form.segmento) errs.segmento = true;
    if (!form.nome.trim()) errs.nome = true;
    if (!form.whatsapp.trim()) errs.whatsapp = true;
    if (!form.email.trim()) errs.email = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep(2);
    localStorage.setItem('permarke_viabilidade', JSON.stringify({
      ...form, data: new Date().toISOString(), classes: classesNCL[form.segmento] || classesNCL['Outro'],
    }));
    setTimeout(() => setStep(3), 3500);
  };

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setLoadingTextIdx((prev) => (prev + 1) % loadingTexts.length);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [step]);

  const alerts = step === 3 ? checkAlerts(form.marca) : [];
  const classes = classesNCL[form.segmento] || classesNCL['Outro'];

  return (
    <section id="viabilidade" className="section-padding bg-foreground">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary-foreground mb-6">
              Dona da marca é
              <br />
              <span className="italic text-primary">quem registra.</span>
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg mb-8 leading-relaxed">
              Descubra se o seu nome está disponível — antes que outra pessoa registre.
            </p>
            <p className="text-primary-foreground/50 font-body text-sm mb-6">
              A análise de viabilidade identifica as classes corretas para o seu segmento e verifica a 
              distintividade da marca. É o primeiro passo para proteger o que é seu.
            </p>
            <ul className="space-y-4">
              {[
                'Sem registro, qualquer pessoa pode tomar sua marca.',
                'Cada segmento tem classes específicas — errar custa tempo e dinheiro.',
                'Uma análise correta economiza meses de processo.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary-foreground/60 font-body text-sm">
                  <span className="text-primary mt-0.5">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: funnel */}
          <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="text-primary-foreground font-heading text-2xl mb-6">
                    Descobrir se a minha marca está disponível.
                  </h3>
                  <div className="space-y-4">
                    {[
                      { key: 'marca', label: 'Sua marca *', placeholder: 'Nome da marca', type: 'text' },
                      { key: 'nome', label: 'Seu nome *', placeholder: 'Nome completo', type: 'text' },
                      { key: 'whatsapp', label: 'WhatsApp *', placeholder: '(00) 00000-0000', type: 'tel' },
                      { key: 'email', label: 'E-mail *', placeholder: 'seu@email.com', type: 'email' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-primary-foreground/60 font-body text-xs uppercase tracking-wider block mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={(form as any)[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className={`w-full bg-primary-foreground/5 border ${errors[field.key] ? 'border-red-500' : 'border-primary-foreground/10'} text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30`}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="text-primary-foreground/60 font-body text-xs uppercase tracking-wider block mb-1">
                        Segmento *
                      </label>
                      <select
                        value={form.segmento}
                        onChange={(e) => setForm({ ...form, segmento: e.target.value })}
                        className={`w-full bg-primary-foreground/5 border ${errors.segmento ? 'border-red-500' : 'border-primary-foreground/10'} text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none`}
                      >
                        <option value="" className="bg-foreground">Selecione o segmento</option>
                        {segmentos.map((s) => (
                          <option key={s} value={s} className="bg-foreground">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-primary-foreground/60 font-body text-xs uppercase tracking-wider block mb-1">
                        Como nos encontrou?
                      </label>
                      <select
                        value={form.como_encontrou}
                        onChange={(e) => setForm({ ...form, como_encontrou: e.target.value })}
                        className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="" className="bg-foreground">Selecione (opcional)</option>
                        {['@permarke', '@marialuizaemtr', 'Indicação', 'Google', 'Outro'].map((o) => (
                          <option key={o} value={o} className="bg-foreground">{o}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-primary text-primary-foreground font-body font-semibold py-4 rounded-sm transition-all duration-300 hover:bg-rosa-dark hover:scale-[1.02] active:scale-100 mt-2"
                    >
                      Quero registrar a minha marca.
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <div className="text-primary font-heading text-8xl animate-pulse-tm mb-8">™</div>
                  <div className="w-full max-w-xs bg-primary-foreground/10 rounded-full h-2 mb-6 overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-progress" />
                  </div>
                  <p className="text-primary-foreground/60 font-body text-sm animate-pulse">
                    {loadingTexts[loadingTextIdx]}
                  </p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-primary-foreground font-heading text-2xl">
                      Análise para: <span className="text-primary">{form.marca}</span>
                    </h3>
                    <span className="bg-primary/20 text-primary font-body text-xs px-3 py-1 rounded-full">
                      {form.segmento}
                    </span>
                  </div>

                  {/* Alerts */}
                  {alerts.map((alert, i) => (
                    <div key={i} className={`flex items-start gap-2 p-3 rounded-lg mb-3 font-body text-sm ${
                      alert.type === 'red' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      <span>{alert.type === 'red' ? '🚫' : '⚠️'}</span>
                      {alert.msg}
                    </div>
                  ))}

                  {/* Classes */}
                  <p className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider mb-4 mt-6">
                    Classes NCL recomendadas
                  </p>
                  <div className="space-y-4 mb-8">
                    {classes.map((cl) => (
                      <div key={cl.num} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-primary font-heading text-3xl font-bold">{cl.num}</span>
                          <span className="text-primary-foreground font-heading text-lg">{cl.nome}</span>
                        </div>
                        <p className="text-primary-foreground/60 font-body text-sm mb-1">Protege: {cl.protege}</p>
                        <p className="text-primary-foreground/40 font-body text-xs">{cl.porque}</p>
                      </div>
                    ))}
                  </div>

                  {/* Final card */}
                  <div className="bg-foreground border border-primary/30 rounded-lg p-6 mb-6">
                    <p className="text-primary-foreground font-body text-sm leading-relaxed">
                      <span className="text-primary font-semibold">✓ Análise registrada.</span> Nossa equipe entra em contato pelo WhatsApp 
                      em até 1 dia útil com análise completa, classes recomendadas e próximos passos.
                      <br /><br />
                      Segue <a href="https://instagram.com/permarke" target="_blank" rel="noopener" className="text-primary hover:underline">@permarke</a> no Instagram.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/5512997206639?text=Olá! Solicitei análise da marca ${encodeURIComponent(form.marca)} no site.`}
                      target="_blank"
                      rel="noopener"
                      className="flex-1 bg-primary text-primary-foreground font-body font-semibold py-3 px-6 rounded-sm text-center text-sm hover:bg-rosa-dark transition-colors"
                    >
                      Falar agora no WhatsApp →
                    </a>
                    <button
                      onClick={() => document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 border border-primary-foreground/20 text-primary-foreground font-body font-medium py-3 px-6 rounded-sm text-center text-sm hover:bg-primary-foreground/10 transition-colors"
                    >
                      Ver nossos serviços
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
