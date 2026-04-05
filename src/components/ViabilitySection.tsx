import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitToNotion } from '@/lib/api/notion';
import { allNCLClasses, segmentos, segmentToNCLs, findNCLsByKeywords } from './viability/nclData';
import { NCLToggleList } from './viability/NCLToggleList';
import permarkeIcon from '@/assets/permarke-icon.png';
import { LGPDConsent, LGPDDisclaimer } from '@/components/LGPDConsent';
import { logConsent } from '@/lib/api/consent';

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
  const [form, setForm] = useState({ marca: '', segmento: '', nome: '', whatsapp: '', email: '', como_encontrou: '', outroSegmento: '' });
  const [selectedNCLs, setSelectedNCLs] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loadingTextIdx, setLoadingTextIdx] = useState(0);
  const [showNCLs, setShowNCLs] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);

  // Update selected NCLs when segment changes
  useEffect(() => {
    if (form.segmento && form.segmento !== 'Outro') {
      setSelectedNCLs(segmentToNCLs[form.segmento] || []);
    } else if (form.segmento === 'Outro') {
      setSelectedNCLs([]);
    }
  }, [form.segmento]);

  // Auto-suggest NCLs when "Outro" text changes
  useEffect(() => {
    if (form.segmento === 'Outro' && form.outroSegmento.trim().length >= 3) {
      const suggested = findNCLsByKeywords(form.outroSegmento);
      setSelectedNCLs(suggested);
    }
  }, [form.outroSegmento, form.segmento]);

  const toggleNCL = (num: number) => {
    setSelectedNCLs((prev) => prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]);
  };

  const validate = () => {
    const errs: Record<string, boolean> = {};
    if (!form.marca.trim()) errs.marca = true;
    if (!form.segmento) errs.segmento = true;
    if (!form.nome.trim()) errs.nome = true;
    if (!form.whatsapp.trim()) errs.whatsapp = true;
    if (!form.email.trim()) errs.email = true;
    if (form.segmento === 'Outro' && !form.outroSegmento.trim()) errs.outroSegmento = true;
    if (!lgpdConsent) errs.lgpd = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep(2);
    const nclsString = selectedNCLs.sort((a, b) => a - b).join(', ');
    const segmentoFinal = form.segmento === 'Outro' ? form.outroSegmento : form.segmento;
    submitToNotion('viabilidade', {
      ...form,
      segmento: segmentoFinal,
      ncls_recomendadas: nclsString,
    }).catch((err) => console.error('Notion submit error:', err));
    logConsent('viabilidade', { nome: form.nome, email: form.email, telefone: form.whatsapp });
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
  const resultClasses = allNCLClasses.filter((c) => selectedNCLs.includes(c.num));

  return (
    <section id="viabilidade" className="py-12 md:py-24 lg:py-32 bg-foreground">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
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

                    {/* Segmento dropdown */}
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

                    {/* Campo "Outro" */}
                    {form.segmento === 'Outro' && (
                      <div>
                        <label className="text-primary-foreground/60 font-body text-xs uppercase tracking-wider block mb-1">
                          Descreva seu segmento *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: clínica veterinária, restaurante japonês..."
                          value={form.outroSegmento}
                          onChange={(e) => setForm({ ...form, outroSegmento: e.target.value })}
                          className={`w-full bg-primary-foreground/5 border ${errors.outroSegmento ? 'border-red-500' : 'border-primary-foreground/10'} text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30`}
                        />
                      </div>
                    )}

                    {/* NCL Toggle List */}
                    {form.segmento && (
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowNCLs(!showNCLs)}
                          className="flex items-center gap-2 text-primary font-body text-xs uppercase tracking-wider mb-2 hover:text-primary/80 transition-colors"
                        >
                          <svg className={`w-3 h-3 transition-transform ${showNCLs ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                          Classes NCL ({selectedNCLs.length} selecionada{selectedNCLs.length !== 1 ? 's' : ''})
                        </button>
                        {showNCLs && (
                          <NCLToggleList selectedNCLs={selectedNCLs} onToggle={toggleNCL} />
                        )}
                      </div>
                    )}

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

                    <div>
                      <LGPDConsent checked={lgpdConsent} onChange={(v) => { setLgpdConsent(v); if (v) setErrors(prev => { const e = {...prev}; delete e.lgpd; return e; }); }} error={!!errors.lgpd} theme="dark" />
                      {errors.lgpd && <p className="text-red-400 font-body text-xs mt-1">Esse campo é obrigatório</p>}
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-primary text-primary-foreground font-body font-semibold py-4 rounded-sm transition-all duration-300 hover:bg-rosa-dark hover:scale-[1.02] active:scale-100 mt-2"
                    >
                      Quero registrar a minha marca.
                    </button>
                    <LGPDDisclaimer theme="dark" />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <img src={permarkeIcon} alt="Permarke" className="w-20 h-20 animate-pulse-tm mb-8" />
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
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                    <h3 className="text-primary-foreground font-heading text-xl sm:text-2xl">
                      Análise para: <span className="text-primary">{form.marca}</span>
                    </h3>
                    <span className="bg-primary/20 text-primary font-body text-xs px-3 py-1 rounded-full">
                      {form.segmento === 'Outro' ? form.outroSegmento : form.segmento}
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
                    Classes NCL recomendadas ({resultClasses.length})
                  </p>
                  <div className="space-y-4 mb-8">
                    {resultClasses.map((cl) => (
                      <div key={cl.num} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-primary font-heading text-3xl font-bold">{cl.num}</span>
                          <span className="text-primary-foreground font-heading text-lg">{cl.nome}</span>
                        </div>
                        <p className="text-primary-foreground/60 font-body text-sm">{cl.descricao}</p>
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
