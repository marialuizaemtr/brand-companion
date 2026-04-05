import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import logoBranca from '@/assets/logo-branca.png';
import { Check } from 'lucide-react';

/* ── Phone mask helper ── */
function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/* ── Zod schema ── */
const guiaSchema = z.object({
  nome: z.string().trim().min(1, 'Esse campo é obrigatório').max(100),
  email: z.string().trim().min(1, 'Esse campo é obrigatório').email('E-mail inválido').max(255),
  whatsapp: z.string().min(1, 'Esse campo é obrigatório').refine(
    (v) => v.replace(/\D/g, '').length >= 10,
    'Número inválido — mínimo 10 dígitos'
  ),
  profissao: z.string().trim().min(1, 'Esse campo é obrigatório').max(100),
  tem_marca: z.enum(['Sim', 'Não'], { required_error: 'Esse campo é obrigatório' }),
  nome_marca: z.string().max(100).optional(),
  segmento: z.string().max(100).optional(),
  marca_registrada: z.string().optional(),
  interesse_registro: z.enum(['Sim', 'Não', 'Ainda estou pesquisando'], {
    required_error: 'Esse campo é obrigatório',
  }),
}).superRefine((data, ctx) => {
  if (data.tem_marca === 'Sim') {
    if (!data.nome_marca?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Esse campo é obrigatório', path: ['nome_marca'] });
    }
    if (!data.segmento?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Esse campo é obrigatório', path: ['segmento'] });
    }
    if (!data.marca_registrada) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Esse campo é obrigatório', path: ['marca_registrada'] });
    }
  }
});

type GuiaForm = z.infer<typeof guiaSchema>;

/* ── Radio Button Component ── */
function RadioOption({
  name, value, label, selected, onChange, error,
}: {
  name: string; value: string; label: string; selected: boolean;
  onChange: (v: string) => void; error?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-5 py-2.5 rounded-lg text-sm font-medium font-body transition-all duration-200 border ${
        selected
          ? 'bg-[#E73B97] text-white border-[#E73B97]'
          : `bg-white text-gray-700 ${error ? 'border-red-400' : 'border-gray-200'} hover:border-[#E73B97]`
      }`}
    >
      {label}
    </button>
  );
}

/* ── Field Error ── */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-body mt-1" style={{ color: '#D32F2F' }}>{message}</p>;
}

export default function Guia() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register, handleSubmit, watch, setValue, formState: { errors }, trigger,
  } = useForm<GuiaForm>({ resolver: zodResolver(guiaSchema) });

  const temMarca = watch('tem_marca');
  const marcaRegistrada = watch('marca_registrada');
  const interesseRegistro = watch('interesse_registro');

  const onSubmit = async (data: GuiaForm) => {
    setSubmitError('');
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('guia_leads').insert({
        nome: data.nome.trim(),
        email: data.email.trim(),
        whatsapp: data.whatsapp,
        profissao: data.profissao.trim(),
        tem_marca: data.tem_marca === 'Sim',
        nome_marca: data.tem_marca === 'Sim' ? data.nome_marca?.trim() || null : null,
        segmento: data.tem_marca === 'Sim' ? data.segmento?.trim() || null : null,
        marca_registrada: data.tem_marca === 'Sim' ? data.marca_registrada || null : null,
        interesse_registro: data.interesse_registro,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      setSubmitError('Algo deu errado. Tenta de novo ou me chama no Instagram @permarke.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── THANK YOU STATE ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9F6F1' }}>
        {/* Header */}
        <header className="w-full py-5" style={{ backgroundColor: '#E73B97' }}>
          <div className="max-w-[640px] mx-auto px-6">
            <img src={logoBranca} alt="Permarke" className="h-8" />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div
            className="max-w-[600px] w-full text-center animate-fade-in"
            style={{ animation: 'fadeIn 300ms ease forwards' }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-white font-body text-xs font-bold mb-6"
              style={{ backgroundColor: '#E73B97', fontSize: '12px' }}
            >
              SEU ACESSO ESTÁ LIBERADO
            </span>

            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
              Aqui está o seu Guia Jurídico<br />das Donas de Marcas.
            </h2>

            <p className="font-body text-base mb-8" style={{ color: '#555' }}>
              Assiste com calma — tem muito conteúdo aqui que pode
              mudar o rumo da sua marca. Se tiver dúvidas depois,
              é só chamar.
            </p>

            {/* YouTube Embed */}
            <div className="w-full max-w-[600px] mx-auto rounded-lg overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
                title="Guia Jurídico das Donas de Marcas"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <hr className="border-gray-200 mb-6" />

            <p className="font-body text-sm mb-4" style={{ color: '#888' }}>
              Gostou do conteúdo? A Permarke pode cuidar do registro
              da sua marca do começo ao fim.
            </p>

            <a
              href="https://wa.me/NUMERO_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-body font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-[0.98]"
              style={{
                border: '2px solid #E73B97',
                color: '#E73B97',
                backgroundColor: 'white',
              }}
            >
              Falar com a Permarke →
            </a>
          </div>
        </main>

        <footer className="py-6 text-center">
          <p className="font-body text-xs" style={{ color: '#999' }}>
            © Permarke Marcas e Propriedade Intelectual.<br />
            Todos os direitos reservados.
          </p>
        </footer>

        <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      </div>
    );
  }

  /* ── FORM STATE ── */
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F9F6F1' }}>
      {/* Header */}
      <header className="w-full py-5" style={{ backgroundColor: '#E73B97' }}>
        <div className="max-w-[640px] mx-auto px-6">
          <img src={logoBranca} alt="Permarke" className="h-8" />
        </div>
      </header>

      <main className="flex-1 px-6 py-10 md:py-16">
        <div className="max-w-[640px] mx-auto">
          {/* HERO */}
          <div className="text-center mb-10">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-white font-body font-bold mb-6"
              style={{ backgroundColor: '#E73B97', fontSize: '12px' }}
            >
              ACESSO GRATUITO
            </span>

            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              Guia Jurídico das<br />Donas de Marcas
            </h1>

            <p className="font-body text-lg mb-6" style={{ color: '#666' }}>
              Tudo o que você precisava saber sobre proteção de marca —
              sem juridiquês, sem enrolação.
            </p>

            <p className="font-body text-base mb-6 text-left md:text-center" style={{ color: '#444' }}>
              Você construiu uma marca com identidade, com produto validado,
              com presença. Mas juridicamente, ela ainda está vulnerável?
              Esse guia existe pra mudar isso. Preenche os dados abaixo e
              o acesso é seu agora.
            </p>

            <div className="flex flex-col items-start gap-2.5 mx-auto max-w-md mb-8">
              {[
                'Entenda como o registro de marca funciona na prática',
                'Descubra os riscos reais de operar sem proteção jurídica',
                'Saiba exatamente qual é o próximo passo para blindar o que você construiu',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Check size={18} className="mt-0.5 flex-shrink-0" style={{ color: '#E73B97' }} />
                  <span className="font-body text-sm text-left" style={{ color: '#444', fontSize: '15px' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl p-6 md:p-8 mb-8"
            style={{
              border: '1px solid #E0E0E0',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <h3 className="font-heading font-bold text-xl text-foreground mb-1">
              Preencha para liberar seu acesso
            </h3>
            <p className="font-body text-xs mb-6" style={{ color: '#999', fontSize: '13px' }}>
              É gratuito. Sem spam. Sem enrolação.
            </p>

            <div className="flex flex-col gap-5">
              {/* Nome */}
              <div>
                <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                  Nome completo
                </label>
                <input
                  {...register('nome')}
                  placeholder="Seu nome"
                  className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                    errors.nome ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                  }`}
                />
                <FieldError message={errors.nome?.message} />
              </div>

              {/* Email */}
              <div>
                <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                  E-mail
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="seu@email.com"
                  className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                    errors.email ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                  }`}
                />
                <FieldError message={errors.email?.message} />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                  WhatsApp
                </label>
                <input
                  {...register('whatsapp')}
                  placeholder="(00) 00000-0000"
                  onChange={(e) => {
                    const masked = applyPhoneMask(e.target.value);
                    setValue('whatsapp', masked, { shouldValidate: false });
                  }}
                  className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                    errors.whatsapp ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                  }`}
                />
                <FieldError message={errors.whatsapp?.message} />
              </div>

              {/* Profissão */}
              <div>
                <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                  Profissão
                </label>
                <input
                  {...register('profissao')}
                  placeholder="Ex: designer, empresária, influencer"
                  className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                    errors.profissao ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                  }`}
                />
                <FieldError message={errors.profissao?.message} />
              </div>

              {/* Tem marca? */}
              <div>
                <label className="block font-body text-xs font-medium mb-2" style={{ color: '#444', fontSize: '13px' }}>
                  Você já tem uma marca?
                </label>
                <div className="flex gap-3">
                  {['Sim', 'Não'].map((opt) => (
                    <RadioOption
                      key={opt}
                      name="tem_marca"
                      value={opt}
                      label={opt}
                      selected={temMarca === opt}
                      onChange={(v) => { setValue('tem_marca', v as 'Sim' | 'Não', { shouldValidate: true }); }}
                      error={!!errors.tem_marca}
                    />
                  ))}
                </div>
                <FieldError message={errors.tem_marca?.message} />
              </div>

              {/* Conditional fields */}
              {temMarca === 'Sim' && (
                <>
                  <div>
                    <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                      Nome da marca
                    </label>
                    <input
                      {...register('nome_marca')}
                      placeholder="Como ela se chama?"
                      className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                        errors.nome_marca ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                      }`}
                    />
                    <FieldError message={errors.nome_marca?.message} />
                  </div>

                  <div>
                    <label className="block font-body text-xs font-medium mb-1.5" style={{ color: '#444', fontSize: '13px' }}>
                      Segmento
                    </label>
                    <input
                      {...register('segmento')}
                      placeholder="Ex: moda, beleza, lifestyle, alimentação"
                      className={`w-full h-11 px-3 rounded-lg border font-body text-sm outline-none transition-colors ${
                        errors.segmento ? 'border-red-400' : 'border-gray-200 focus:border-[#E73B97]'
                      }`}
                    />
                    <FieldError message={errors.segmento?.message} />
                  </div>

                  <div>
                    <label className="block font-body text-xs font-medium mb-2" style={{ color: '#444', fontSize: '13px' }}>
                      Sua marca já está registrada no INPI?
                    </label>
                    <div className="flex gap-3">
                      {['Sim', 'Não', 'Não sei'].map((opt) => (
                        <RadioOption
                          key={opt}
                          name="marca_registrada"
                          value={opt}
                          label={opt}
                          selected={marcaRegistrada === opt}
                          onChange={(v) => { setValue('marca_registrada', v, { shouldValidate: true }); }}
                          error={!!errors.marca_registrada}
                        />
                      ))}
                    </div>
                    <FieldError message={errors.marca_registrada?.message} />
                  </div>
                </>
              )}

              {/* Interesse */}
              <div>
                <label className="block font-body text-xs font-medium mb-2" style={{ color: '#444', fontSize: '13px' }}>
                  Tem interesse em saber mais sobre registro de marca?
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Sim', 'Não', 'Ainda estou pesquisando'].map((opt) => (
                    <RadioOption
                      key={opt}
                      name="interesse_registro"
                      value={opt}
                      label={opt}
                      selected={interesseRegistro === opt}
                      onChange={(v) => {
                        setValue('interesse_registro', v as GuiaForm['interesse_registro'], { shouldValidate: true });
                      }}
                      error={!!errors.interesse_registro}
                    />
                  ))}
                </div>
                <FieldError message={errors.interesse_registro?.message} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] rounded-lg text-white font-body font-bold text-[15px] tracking-wide transition-all duration-200 hover:brightness-90 active:scale-[0.98] disabled:opacity-60"
                style={{ backgroundColor: '#E73B97', letterSpacing: '0.5px' }}
              >
                {isSubmitting ? 'Enviando...' : 'QUERO MEU ACESSO GRATUITO →'}
              </button>

              {submitError && (
                <p className="text-center font-body text-xs" style={{ color: '#D32F2F', fontSize: '13px' }}>
                  {submitError}
                </p>
              )}

              <p className="text-center font-body" style={{ color: '#999', fontSize: '11px' }}>
                Ao preencher, você concorda em receber conteúdos da Permarke.
                Você pode cancelar quando quiser.
              </p>
            </div>
          </form>

          {/* Social Proof */}
          <p className="text-center font-body mb-8" style={{ color: '#aaa', fontSize: '13px' }}>
            Mais de [X] empresárias já acessaram esse conteúdo.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="font-body text-xs" style={{ color: '#999' }}>
          © Permarke Marcas e Propriedade Intelectual.<br />
          Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
