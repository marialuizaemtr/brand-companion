import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Mail } from 'lucide-react';
import { submitToNotion } from '@/lib/api/notion';
import { LGPDConsent, LGPDDisclaimer } from '@/components/LGPDConsent';
import { logConsent } from '@/lib/api/consent';

const canais = [
  { icon: MessageCircle, label: 'WhatsApp', value: '(12) 99720-6639', href: 'https://wa.me/5512997206639' },
  { icon: Instagram, label: 'Instagram', value: '@permarke', href: 'https://instagram.com/permarke' },
  { icon: Mail, label: 'E-mail', value: 'contato@permarke.com.br', href: 'mailto:contato@permarke.com.br' },
];

export function ContactSection() {
  const [form, setForm] = useState({ nome: '', whatsapp: '', email: '', interesse: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [lgpdError, setLgpdError] = useState(false);

  const handleSubmit = () => {
    if (!form.nome.trim() || !form.whatsapp.trim() || !form.email.trim()) return;
    if (!lgpdConsent) { setLgpdError(true); return; }
    setLgpdError(false);
    submitToNotion('contato', form).catch((err) => console.error('Notion submit error:', err));
    logConsent('contato', { nome: form.nome, email: form.email, telefone: form.whatsapp });
    setEnviado(true);
  };

  return (
    <section id="contato" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-foreground">
            Chama a Permarke.
            <br />
            <span className="italic text-primary">A gente resolve.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {canais.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-4 bg-creme rounded-lg p-5 hover:border-primary border border-transparent transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-full bg-rosa-light flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-body text-sm font-medium">{c.label}</p>
                  <p className="text-muted-foreground font-body text-sm">{c.value}</p>
                </div>
              </a>
            ))}

            <div className="mt-6 bg-creme rounded-lg p-5">
              <p className="text-muted-foreground font-body text-sm">
                <strong className="text-foreground">TikTok e Instagram:</strong>{' '}
                <a href="https://instagram.com/marialuizaemtr" target="_blank" rel="noopener" className="text-primary hover:underline">@marialuizaemtr</a>
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {!enviado ? (
              <div className="bg-foreground rounded-xl p-5 sm:p-8 space-y-4">
                <h3 className="text-primary-foreground font-heading text-xl mb-2">Envie uma mensagem</h3>
                {[
                  { key: 'nome', label: 'Nome *', placeholder: 'Seu nome', type: 'text' },
                  { key: 'whatsapp', label: 'WhatsApp *', placeholder: '(00) 00000-0000', type: 'tel' },
                  { key: 'email', label: 'E-mail *', placeholder: 'seu@email.com', type: 'email' },
                  { key: 'interesse', label: 'Interesse', placeholder: 'Ex: Registro de Marca', type: 'text' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-primary-foreground/50 font-body text-xs uppercase tracking-wider block mb-1">Mensagem</label>
                  <textarea
                    rows={3}
                    placeholder="Como podemos ajudar?"
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="w-full bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground font-body text-sm rounded-sm px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-primary-foreground/30 resize-none"
                  />
                </div>
                <div>
                  <LGPDConsent checked={lgpdConsent} onChange={(v) => { setLgpdConsent(v); if (v) setLgpdError(false); }} error={lgpdError} theme="dark" />
                  {lgpdError && <p className="text-red-400 font-body text-xs mt-1">Esse campo é obrigatório</p>}
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-primary text-primary-foreground font-body font-semibold py-3 rounded-sm transition-all duration-300 hover:bg-rosa-dark"
                >
                  Quero registrar a minha marca.
                </button>
                <LGPDDisclaimer theme="dark" />
              </div>
            ) : (
              <div className="bg-foreground rounded-xl p-8 text-center">
                <div className="text-primary text-5xl mb-4">✓</div>
                <h3 className="text-primary-foreground font-heading text-xl mb-2">Mensagem enviada!</h3>
                <p className="text-primary-foreground/60 font-body text-sm mb-6">
                  Entraremos em contato pelo WhatsApp em até 1 dia útil.
                </p>
                <a
                  href={`https://wa.me/5512997206639?text=Olá! Enviei uma mensagem pelo site da Permarke. Meu nome é ${encodeURIComponent(form.nome)}.`}
                  target="_blank"
                  rel="noopener"
                  className="inline-block bg-primary text-primary-foreground font-body font-semibold py-3 px-8 rounded-sm hover:bg-rosa-dark transition-colors"
                >
                  Falar no WhatsApp →
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
