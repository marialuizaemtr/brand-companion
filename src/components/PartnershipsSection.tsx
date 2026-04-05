import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitToNotion } from '@/lib/api/notion';
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
  const [cadastroForm, setCadastroForm] = useState({ nome: '', whatsapp: '', email: '', perfil: '', como_indica: '' });
  const [codigoGerado, setCodigoGerado] = useState('');
  const [indicacaoForm, setIndicacaoForm] = useState({ codigo: '', nome_indicado: '', whatsapp: '', email: '', servico: '', contexto: '' });
  const [indicacoes, setIndicacoes] = useState<any[]>([]);
  const [indicacaoConfirmada, setIndicacaoConfirmada] = useState('');
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null);

  const handleCadastro = () => {
    if (!cadastroForm.nome.trim() || !cadastroForm.whatsapp.trim() || !cadastroForm.email.trim()) return;
    const cod = `PERM${String(Math.floor(1000 + Math.random() * 9000))}`;
    submitToNotion('parceiros', { ...cadastroForm, tipo: 'cadastro' }).catch((err) => console.error('Notion submit error:', err));
    localStorage.setItem(`permarke_parceiro_${cod}`, JSON.stringify({ ...cadastroForm, codigo: cod }));
    setCodigoGerado(cod);
  };

  const validarCodigo = (cod: string) => {
    setIndicacaoForm({ ...indicacaoForm, codigo: cod });
    const parceiro = localStorage.getItem(`permarke_parceiro_${cod}`);
    setCodigoValido(!!parceiro);
  };

  const handleIndicacao = () => {
    if (!indicacaoForm.codigo || !codigoValido || !indicacaoForm.nome_indicado.trim() || !indicacaoForm.whatsapp.trim()) return;
    const id = `IND${Date.now()}`;
    const nova = { ...indicacaoForm, id, data: new Date().toISOString(), status: 'Em análise' };
    const updated = [...indicacoes, nova];
    setIndicacoes(updated);
    submitToNotion('parceiros', { ...indicacaoForm, nome: indicacaoForm.nome_indicado, tipo: 'indicacao' }).catch((err) => console.error('Notion submit error:', err));
    localStorage.setItem(`permarke_indicacoes_${indicacaoForm.codigo}`, JSON.stringify(updated));
    setIndicacaoConfirmada(id);
    setIndicacaoForm({ codigo: indicacaoForm.codigo, nome_indicado: '', whatsapp: '', email: '', servico: '', contexto: '' });
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
              {tab === 'cadastro' && !codigoGerado && (
                <div className="space-y-4">
                  <h3 className="text-primary-foreground font-heading text-xl mb-2">Cadastre-se como parceira</h3>
                  {[
                    { key: 'nome', label: 'Nome *', placeholder: 'Seu nome', type: 'text' },
                    { key: 'whatsapp', label: 'WhatsApp *', placeholder: '(00) 00000-0000', type: 'tel' },
                    { key: 'email', label: 'E-mail *', placeholder: 'seu@email.com', type: 'email' },
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
                  <button
                    onClick={handleCadastro}
                    className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark mt-2"
                  >
                    Cadastrar
                  </button>
                </div>
              )}

              {tab === 'cadastro' && codigoGerado && (
                <div className="text-center py-8">
                  <p className="text-primary font-heading text-lg mb-2">Seu código de parceira:</p>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4 inline-block">
                    <span className="text-primary font-heading text-4xl font-bold tracking-wider">{codigoGerado}</span>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(codigoGerado)}
                    className="block mx-auto text-primary-foreground/60 font-body text-sm hover:text-primary transition-colors mb-6"
                  >
                    📋 Copiar código
                  </button>
                  <a
                    href={`https://wa.me/5512997206639?text=Me cadastrei como parceira Permarke. Código ${codigoGerado}, nome ${cadastroForm.nome}.`}
                    target="_blank"
                    rel="noopener"
                    className="inline-block bg-primary text-primary-foreground font-body font-semibold py-3 px-8 rounded-sm hover:bg-rosa-dark transition-colors"
                  >
                    Confirmar no WhatsApp →
                  </a>
                </div>
              )}

              {tab === 'indicacao' && (
                <div className="space-y-4">
                  <h3 className="text-primary-foreground font-heading text-xl mb-2">Registrar indicação</h3>
                  <div>
                    <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">Código parceiro *</label>
                    <input
                      type="text"
                      placeholder="PERMXXXX"
                      value={indicacaoForm.codigo}
                      onChange={(e) => validarCodigo(e.target.value.toUpperCase())}
                      className={`w-full bg-primary-foreground/5 border ${
                        codigoValido === false ? 'border-red-500' : codigoValido ? 'border-green-500' : 'border-primary-foreground/10'
                      } text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-primary-foreground/30`}
                    />
                    {codigoValido === false && <p className="text-red-400 font-body text-xs mt-1">Código não encontrado</p>}
                  </div>
                  {[
                    { key: 'nome_indicado', label: 'Nome do indicado *', placeholder: 'Nome completo' },
                    { key: 'whatsapp', label: 'WhatsApp do indicado *', placeholder: '(00) 00000-0000' },
                    { key: 'email', label: 'E-mail (opcional)', placeholder: 'email@exemplo.com' },
                    { key: 'servico', label: 'Serviço de interesse', placeholder: 'Ex: Registro de Marca' },
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
                  <button
                    onClick={handleIndicacao}
                    className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark mt-2"
                  >
                    Registrar indicação
                  </button>

                  {indicacaoConfirmada && (
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                      <p className="text-primary-foreground font-body text-sm">
                        ✓ Indicação registrada: <span className="text-primary font-semibold">{indicacaoConfirmada}</span>
                      </p>
                    </div>
                  )}

                  {indicacoes.length > 0 && (
                    <div className="mt-6">
                      <p className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider mb-3">
                        Suas indicações ({indicacoes.length})
                      </p>
                      <div className="space-y-2">
                        {indicacoes.map((ind) => (
                          <div key={ind.id} className="bg-primary-foreground/5 rounded-lg p-3 flex items-center justify-between">
                            <div>
                              <p className="text-primary-foreground font-body text-sm">{ind.nome_indicado}</p>
                              <p className="text-primary-foreground/40 font-body text-xs">{ind.servico || 'Não especificado'}</p>
                            </div>
                            <span className="text-primary font-body text-xs bg-primary/10 px-2 py-1 rounded">{ind.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
