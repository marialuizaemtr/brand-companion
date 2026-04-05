import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Privacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade — Permarke';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding bg-background">
        <div className="container-narrow max-w-3xl mx-auto">
          <h1 className="text-foreground mb-8">Política de Privacidade</h1>

          <div className="prose prose-sm max-w-none font-body text-muted-foreground space-y-8">
            <p className="text-foreground font-medium">
              A PERMARKE LTDA valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta Política de Privacidade explica como coletamos, utilizamos e protegemos as informações fornecidas por você ao acessar nosso site e preencher nossos formulários.
            </p>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">1. Coleta de Dados</h2>
              <p>Coletamos dados pessoais fornecidos diretamente por você, tais como:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nome completo</li>
                <li>E-mail</li>
                <li>Telefone/WhatsApp</li>
                <li>Profissão</li>
                <li>Informações sobre sua marca e negócio</li>
              </ul>
              <p>Esses dados são coletados por meio de formulários disponíveis em nosso site.</p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">2. Finalidade do Tratamento</h2>
              <p>Os dados coletados são utilizados para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Entrar em contato com você</li>
                <li>Enviar conteúdos informativos e educacionais</li>
                <li>Apresentar soluções e serviços jurídicos da PERMARKE LTDA</li>
                <li>Personalizar sua experiência e comunicação conosco</li>
              </ul>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">3. Base Legal</h2>
              <p>O tratamento dos seus dados é realizado com base no seu consentimento, nos termos do art. 7º, I, da Lei nº 13.709/2018 (LGPD).</p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">4. Consentimento</h2>
              <p>Ao preencher qualquer formulário em nosso site, você declara que leu esta Política de Privacidade e concorda com a coleta e utilização dos seus dados para as finalidades aqui descritas.</p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">5. Compartilhamento de Dados</h2>
              <p>A PERMARKE LTDA não comercializa dados pessoais.</p>
              <p>Seus dados poderão ser compartilhados com plataformas e ferramentas utilizadas para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Gestão de relacionamento com clientes (CRM)</li>
                <li>Automação de marketing</li>
                <li>Armazenamento seguro de informações</li>
              </ul>
              <p>Sempre respeitando os princípios da LGPD.</p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">6. Armazenamento e Segurança</h2>
              <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, perdas ou qualquer forma de tratamento inadequado.</p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">7. Direitos do Titular</h2>
              <p>Você pode, a qualquer momento:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Solicitar acesso aos seus dados</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o seu consentimento</li>
              </ul>
              <p>
                Para exercer seus direitos, entre em contato pelo e-mail:{' '}
                <a href="mailto:contato@permarke.com.br" className="text-primary hover:underline">contato@permarke.com.br</a>
              </p>
            </section>

            <section>
              <h2 className="text-foreground font-heading text-xl mb-3">8. Alterações</h2>
              <p>Esta Política de Privacidade poderá ser atualizada a qualquer momento, sendo recomendada sua consulta periódica.</p>
            </section>

            <hr className="border-border" />

            <p className="text-foreground font-medium text-center">
              PERMARKE LTDA<br />
              Protegendo marcas com estratégia e segurança jurídica.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
