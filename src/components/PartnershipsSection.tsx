import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { submitToNotion } from '@/lib/api/notion';
import { submitToGestao, validarCodigoParceiro } from '@/lib/api/gestao';
import { LGPDConsent, LGPDDisclaimer } from '@/components/LGPDConsent';
import { logConsent } from '@/lib/api/consent';

const perfis = [
  { emoji: '⚖️', nome: 'Consultores', desc: 'Profissionais jurídicos e financeiros' },
  { emoji: '📊', nome: 'Agências', desc: 'Marketing, branding e comunicação' },
  { emoji: '📱', nome: 'Criadores', desc: 'Influenciadores e criadores de conteúdo' },
  { emoji: '🚀', nome: 'Empreendedores', desc: 'Donos de negócios e startups' },
];

const passos = [
  { num: '01', title: 'Cadastre-se', desc: 'Receba seu código exclusivo' },
  { num: '02', title: 'Indique', desc: 'Compartilhe com sua rede' },
  { num: '03', title: 'Permarke fecha', desc: 'Atendemos seu indicado' },
  { num: '04', title: 'Receba 10%', desc: 'Pix em até 7 dias' },
];

export function PartnershipsSection() {
  const [tab, setTab] = useState<'cadastro' | 'indicacao'>('cadastro');

  // Cadastro
  const [cadastroForm, setCadastroForm] = useState({ nome: '', whatsapp: '', email: '', perfil: '' });
  const [cadastroEnviado, setCadastroEnviado] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);

  // Indicação
  const [indicacaoForm, setIndicacaoForm] = useState({ codigo: '', nome_indicado: '', whatsapp: '', email: '', nome_marca: '', observacoes: '' });
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null);
  const [codigoValidando, setCodigoValidando] = useState(false);
  const [nomeParceiro, setNomeParceiro] = useState('');
  const [indicacaoEnviada, setIndicacaoEnviada] = useState(false);
  const [lgpdConsentInd, setLgpdConsentInd] = useState(false);
  const [lgpdErrorInd, setLgpdErrorInd] = useState(false);

  const handleCadastro = () => {
    if (!cadastroForm.nome.trim() || !cadastroForm.whatsapp.trim() || !cadastroForm.email.trim()) return;
    if (!lgpdConsent) { setLgpdError(true); return; }
    setLgpdError(false);
    submitToNotion('parceiros', { ...cadastroForm, tipo: 'cadastro' }).catch((err) => console.error('Notion submit error:', err));
    console.warn('[DEBUG] chamando submitToGestao parceiros')
    submitToGestao('parceiros', { ...cadastroForm, tipo: 'cadastro' }).catch((err) => console.error('Gestao submit error:', err));
    logConsent('parceiros_cadastro', { nome: cadastroForm.nome, email: cadastroForm.email, telefone: cadastroForm.whatsapp });
    supabase.functions.invoke('notify-whatsapp', {
      body: { form_id: 'parceiros', lead: { nome: cadastroForm.nome, email: cadastroForm.email, whatsapp: cadastroForm.whatsapp } },
    }).catch((err) => console.error('WhatsApp notify error:', err));
    setCadastroEnviado(true);
  };

  const validarCodigo = async (cod: string) => {
    const codUpper = cod.toUpperCase();
    setIndicacaoForm(f => ({ ...f, codigo: codUpper }));
    if (codUpper.length < 8) { setCodigoValido(null); setNomeParceiro(''); return; }
    setCodigoValidando(true);
    const nome = await validarCodigoParceiro(codUpper);
    setCodigoValido(!!nome);
    setNomeParceiro(nome ?? '');
    setCodigoValidando(false);
  };

  const handleIndicacao = () => {
    if (!indicacaoForm.codigo || !codigoValido || !indicacaoForm.nome_indicado.trim() || !indicacaoForm.whatsapp.trim()) return;
    if (!lgpdConsentInd) { setLgpdErrorInd(true); return; }
    setLgpdErrorInd(false);
    submitToNotion('parceiros', {
      ...indicacaoForm,
      nome: indicacaoForm.nome_indicado,
      tipo: 'indicacao',
    }).catch((err) => console.error('Notion submit error:', err));
    submitToGestao('parceiros', {
      ...indicacaoForm,
      nome: indicacaoForm.nome_indicado,
      tipo: 'indicacao',
    }).catch((err) => console.error('Gestao submit error:', err));
    logConsent('parceiros_indicacao', { nome: indicacaoForm.nome_indicado, email: indicacaoForm.email, telefone: indicacaoForm.whatsapp });
    setIndicacaoEnviada(true);
    setIndicacaoForm(f => ({ ...f, nome_indicado: '', whatsapp: '', email: '', nome_marca: '', observacoes: '' }));
  };

  return (
    <section id="parcerias" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-body text-sm font-semibold tracking-widest uppercase block mb-4">
              Parcerias
            </span>
            <h2 className="text-foreground mb-4">
              Indique a Permarke.
              <br />
              Ganhe <span className="text-primary">10%</span> por fechamento.
            </h2>
            <p className="text-muted-foreground font-body mb-10">
              De empresária para empresárias — e para quem acredita nisso.
            </p>

            {/* 10% big typography */}
            <div className="text-primary/10 font-heading text-[12rem] leading-none font-bold select-none -mt-6 mb-6 hidden lg:block">
              10%
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {passos.map((p) => (
                <div key={p.num} className="bg-creme rounded-lg p-4">
                  <span className="text-primary font-heading text-2xl font-bold">{p.num}</span>
                  <h4 className="text-foreground font-heading text-sm mt-1">{p.title}</h4>
                  <p className="text-muted-foreground font-body text-xs">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Profiles */}
            <div className="grid grid-cols-2 gap-3">
              {perfis.map((p) => (
                <div key={p.nome} className="flex items-center gap-3 bg-creme rounded-lg p-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div>
                    <p className="text-foreground font-body text-sm font-medium">{p.nome}</p>
                    <p className="text-muted-foreground font-body text-xs">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-1 mb-6">
              <button
                onClick={() => setTab('cadastro')}
                className={`flex-1 font-body text-sm font-medium py-3 rounded-t-lg transition-colors ${
                  tab === 'cadastro' ? 'bg-foreground text-primary-foreground' : 'bg-creme text-muted-foreground hover:bg-border'
                }`}
              >
                Quero ser parceira
              </button>
              <button
                onClick={() => setTab('indicacao')}
                className={`flex-1 font-body text-sm font-medium py-3 rounded-t-lg transition-colors ${
                  tab === 'indicacao' ? 'bg-foreground text-primary-foreground' : 'bg-creme text-muted-foreground hover:bg-border'
                }`}
              >
                Registrar indicação
              </button>
            </div>

            <div className="bg-foreground rounded-b-xl rounded-tr-xl p-5 sm:p-8">
              {tab === 'cadastro' && !cadastroEnviado && (
                <div className="space-y-4">
                  <h3 className="text-primary-foreground font-heading text-xl mb-2">Cadastre-se como parceira</h3>
                  {[
                    { key: 'nome',     label: 'Nome *',                       placeholder: 'Seu nome',           type: 'text'  },
                    { key: 'whatsapp', label: 'WhatsApp / Telefone *',         placeholder: '+55 11 99999-9999',  type: 'tel'   },
                    { key: 'email',    label: 'E-mail *',                      placeholder: 'seu@email.com',      type: 'email' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={(cadastroForm as any)[f.key]}
                        onChange={(e) => setCadastroForm({ ...cadastroForm, [f.key]: e.target.value })}
                        className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">Perfil</label>
                    <select
                      value={cadastroForm.perfil}
                      onChange={(e) => setCadastroForm({ ...cadastroForm, perfil: e.target.value })}
                      className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="" className="bg-foreground">Selecione</option>
                      {perfis.map((p) => <option key={p.nome} value={p.nome} className="bg-foreground">{p.nome}</option>)}
                    </select>
                  </div>
                  <div>
                    <LGPDConsent checked={lgpdConsent} onChange={(v) => { setLgpdConsent(v); if (v) setLgpdError(false); }} error={lgpdError} theme="dark" />
                    {lgpdError && <p className="text-red-400 font-body text-xs mt-1">Esse campo é obrigatório</p>}
                  </div>
                  <button
                    onClick={handleCadastro}
                    className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark mt-2"
                  >
                    Cadastrar
                  </button>
                  <LGPDDisclaimer theme="dark" />
                </div>
              )}

              {tab === 'cadastro' && cadastroEnviado && (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary text-2xl">✓</span>
                  </div>
                  <p className="text-primary-foreground font-heading text-lg">Cadastro recebido!</p>
                  <p className="text-primary-foreground/60 font-body text-sm">
                    Em breve você receberá seu código de acesso e as instruções para começar a indicar.
                  </p>
                </div>
              )}

              {tab === 'indicacao' && !indicacaoEnviada && (
                <div className="space-y-4">
                  <h3 className="text-primary-foreground font-heading text-xl mb-2">Registrar indicação</h3>
                  <div>
                    <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">Código parceiro *</label>
                    <input
                      type="text"
                      placeholder="PERM0001"
                      value={indicacaoForm.codigo}
                      onChange={(e) => validarCodigo(e.target.value)}
                      className={`w-full bg-primary-foreground/5 border ${
                        codigoValido === false ? 'border-red-500' : codigoValido ? 'border-green-500' : 'border-primary-foreground/10'
                      } text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-primary-foreground/30`}
                    />
                    {codigoValidando && <p className="text-primary-foreground/40 font-body text-xs mt-1">Verificando…</p>}
                    {codigoValido && <p className="text-green-400 font-body text-xs mt-1">✓ Parceiro: {nomeParceiro}</p>}
                    {codigoValido === false && <p className="text-red-400 font-body text-xs mt-1">Código não encontrado</p>}
                  </div>
                  {[
                    { key: 'nome_indicado', label: 'Nome do indicado *',              placeholder: 'Nome completo'         },
                    { key: 'whatsapp',      label: 'WhatsApp / Telefone do indicado *', placeholder: '+55 11 99999-9999'   },
                    { key: 'email',         label: 'E-mail (opcional)',                placeholder: 'email@exemplo.com'    },
                    { key: 'nome_marca',    label: 'Nome da marca (opcional)',          placeholder: 'Ex: MinhaLoja'        },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={(indicacaoForm as any)[f.key]}
                        onChange={(e) => setIndicacaoForm({ ...indicacaoForm, [f.key]: e.target.value })}
                        className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">Observações (opcional)</label>
                    <textarea
                      placeholder="Contexto adicional que possa ajudar a equipe..."
                      rows={2}
                      value={indicacaoForm.observacoes}
                      onChange={(e) => setIndicacaoForm({ ...indicacaoForm, observacoes: e.target.value })}
                      className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30 resize-none"
                    />
                  </div>
                  <div>
                    <LGPDConsent checked={lgpdConsentInd} onChange={(v) => { setLgpdConsentInd(v); if (v) setLgpdErrorInd(false); }} error={lgpdErrorInd} theme="dark" />
                    {lgpdErrorInd && <p className="text-red-400 font-body text-xs mt-1">Esse campo é obrigatório</p>}
                  </div>
                  <button
                    onClick={handleIndicacao}
                    disabled={!codigoValido}
                    className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark disabled:opacity-40 mt-2"
                  >
                    Registrar indicação
                  </button>
                  <LGPDDisclaimer theme="dark" />
                </div>
              )}

              {tab === 'indicacao' && indicacaoEnviada && (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary text-2xl">✓</span>
                  </div>
                  <p className="text-primary-foreground font-heading text-lg">Indicação registrada!</p>
                  <p className="text-primary-foreground/60 font-body text-sm">
                    A equipe Permarke entrará em contato com o seu indicado em breve.
                  </p>
                  <button
                    onClick={() => setIndicacaoEnviada(false)}
                    className="text-primary font-body text-sm hover:underline"
                  >
                    Registrar outra indicação
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
