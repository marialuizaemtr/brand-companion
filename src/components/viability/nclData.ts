export interface NCLClass {
  num: number;
  nome: string;
  descricao: string;
  keywords: string[];
}

// Classificação de Nice — 13ª edição (atualizada)
export const allNCLClasses: NCLClass[] = [
  { num: 1, nome: 'Produtos Químicos', descricao: 'Produtos químicos para indústria, ciência, fotografia, agricultura', keywords: ['química', 'fertilizante', 'adesivo', 'resina', 'cola industrial'] },
  { num: 2, nome: 'Tintas e Vernizes', descricao: 'Tintas, vernizes, lacas, corantes, revestimentos', keywords: ['tinta', 'verniz', 'corante', 'pigmento', 'pintura'] },
  { num: 3, nome: 'Cosméticos e Limpeza', descricao: 'Perfumaria, cosméticos, produtos de limpeza, cuidados pessoais', keywords: ['cosmético', 'perfume', 'maquiagem', 'sabonete', 'shampoo', 'beleza', 'skincare', 'creme', 'limpeza'] },
  { num: 4, nome: 'Óleos e Combustíveis', descricao: 'Óleos e gorduras industriais, lubrificantes, combustíveis', keywords: ['óleo', 'combustível', 'lubrificante', 'vela', 'cera'] },
  { num: 5, nome: 'Produtos Farmacêuticos', descricao: 'Produtos farmacêuticos, veterinários, suplementos, higiene sanitária', keywords: ['farmácia', 'remédio', 'suplemento', 'vitamina', 'medicamento', 'saúde'] },
  { num: 6, nome: 'Metais Comuns', descricao: 'Metais comuns e ligas, materiais de construção metálicos', keywords: ['metal', 'aço', 'ferro', 'alumínio', 'construção metálica'] },
  { num: 7, nome: 'Máquinas e Ferramentas', descricao: 'Máquinas, máquinas-ferramentas, motores', keywords: ['máquina', 'motor', 'ferramenta industrial', 'equipamento'] },
  { num: 8, nome: 'Ferramentas Manuais', descricao: 'Ferramentas e instrumentos manuais, cutelaria, aparelhos de barbear', keywords: ['faca', 'tesoura', 'ferramenta manual', 'cutelaria', 'barbear'] },
  { num: 9, nome: 'Eletrônicos e Software', descricao: 'Aparelhos eletrônicos, computadores, software, apps', keywords: ['eletrônico', 'computador', 'software', 'app', 'aplicativo', 'celular', 'tecnologia', 'dispositivo'] },
  { num: 10, nome: 'Aparelhos Médicos', descricao: 'Aparelhos e instrumentos cirúrgicos, médicos, odontológicos', keywords: ['médico', 'cirúrgico', 'odontológico', 'ortopédico', 'prótese'] },
  { num: 11, nome: 'Iluminação e Climatização', descricao: 'Aparelhos de iluminação, aquecimento, refrigeração, ventilação', keywords: ['iluminação', 'ar condicionado', 'refrigeração', 'aquecimento', 'fogão'] },
  { num: 12, nome: 'Veículos', descricao: 'Veículos, aparelhos de locomoção terrestre, aérea ou aquática', keywords: ['carro', 'moto', 'bicicleta', 'veículo', 'transporte', 'automóvel'] },
  { num: 13, nome: 'Armas de Fogo e Pirotecnia', descricao: 'Armas de fogo, munições, projéteis, explosivos, fogos de artifício', keywords: ['arma', 'munição', 'explosivo', 'fogos', 'pirotecnia'] },
  { num: 14, nome: 'Joalheria e Relojoaria', descricao: 'Metais preciosos, joalheria, bijuteria, relojoaria', keywords: ['joia', 'bijuteria', 'relógio', 'ouro', 'prata', 'anel', 'colar'] },
  { num: 15, nome: 'Instrumentos Musicais', descricao: 'Instrumentos musicais, acessórios e peças', keywords: ['música', 'instrumento', 'guitarra', 'piano', 'violão'] },
  { num: 16, nome: 'Papelaria e Impressos', descricao: 'Papel, papelão, impressos, material de escritório, embalagens', keywords: ['papel', 'papelaria', 'livro', 'revista', 'impressão', 'embalagem', 'editorial'] },
  { num: 17, nome: 'Borracha e Plástico', descricao: 'Borracha, guta-percha, plástico, materiais de vedação', keywords: ['borracha', 'plástico', 'vedação', 'isolante'] },
  { num: 18, nome: 'Couro e Malas', descricao: 'Couro, imitações de couro, malas, bolsas, guarda-chuvas', keywords: ['couro', 'bolsa', 'mala', 'carteira', 'mochila', 'guarda-chuva'] },
  { num: 19, nome: 'Materiais de Construção', descricao: 'Materiais de construção não-metálicos, cimento, vidro', keywords: ['construção', 'cimento', 'tijolo', 'vidro', 'madeira', 'imobiliário'] },
  { num: 20, nome: 'Móveis e Utensílios', descricao: 'Móveis, espelhos, molduras, recipientes de madeira', keywords: ['móveis', 'espelho', 'moldura', 'decoração', 'mobiliário'] },
  { num: 21, nome: 'Utensílios Domésticos', descricao: 'Utensílios de cozinha, recipientes, vidro, porcelana, cerâmica', keywords: ['cozinha', 'utensílio', 'porcelana', 'cerâmica', 'cristal', 'panela'] },
  { num: 22, nome: 'Cordas e Fibras', descricao: 'Cordas, barbantes, redes, tendas, toldos, lonas', keywords: ['corda', 'rede', 'tenda', 'lona', 'fibra'] },
  { num: 23, nome: 'Fios Têxteis', descricao: 'Fios e linhas para uso têxtil', keywords: ['fio', 'linha', 'têxtil', 'bordado'] },
  { num: 24, nome: 'Tecidos', descricao: 'Tecidos, coberturas de cama, coberturas de mesa', keywords: ['tecido', 'lençol', 'toalha', 'cobertor', 'cortina'] },
  { num: 25, nome: 'Vestuário', descricao: 'Roupas, calçados, chapelaria', keywords: ['roupa', 'moda', 'calçado', 'sapato', 'vestido', 'camiseta', 'chapéu', 'vestuário', 'confecção'] },
  { num: 26, nome: 'Aviamentos', descricao: 'Rendas, bordados, fitas, botões, flores artificiais', keywords: ['renda', 'botão', 'fita', 'aviamento', 'bordado'] },
  { num: 27, nome: 'Tapetes e Revestimentos', descricao: 'Tapetes, capachos, revestimentos de piso e parede', keywords: ['tapete', 'carpete', 'revestimento', 'piso'] },
  { num: 28, nome: 'Jogos e Brinquedos', descricao: 'Jogos, brinquedos, artigos de ginástica e esporte', keywords: ['brinquedo', 'jogo', 'esporte', 'ginástica', 'recreação', 'fitness'] },
  { num: 29, nome: 'Alimentos Processados', descricao: 'Carnes, peixes, laticínios, conservas, ovos', keywords: ['carne', 'laticínio', 'conserva', 'queijo', 'leite', 'embutido', 'alimento'] },
  { num: 30, nome: 'Alimentos Base', descricao: 'Café, chá, farinhas, doces, condimentos, massas', keywords: ['café', 'chá', 'farinha', 'doce', 'chocolate', 'pão', 'macarrão', 'confeitaria', 'padaria'] },
  { num: 31, nome: 'Produtos Agrícolas', descricao: 'Grãos, frutas, verduras, sementes, plantas, flores naturais', keywords: ['fruta', 'verdura', 'semente', 'planta', 'flor', 'agrícola', 'hortifruti'] },
  { num: 32, nome: 'Bebidas Não-Alcoólicas', descricao: 'Cervejas, águas minerais, sucos, refrigerantes', keywords: ['cerveja', 'água', 'suco', 'refrigerante', 'bebida', 'energético'] },
  { num: 33, nome: 'Bebidas Alcoólicas', descricao: 'Bebidas alcoólicas (exceto cervejas), vinhos, destilados', keywords: ['vinho', 'cachaça', 'whisky', 'vodka', 'licor', 'destilado', 'gin'] },
  { num: 34, nome: 'Tabaco', descricao: 'Tabaco, artigos para fumantes, fósforos', keywords: ['tabaco', 'cigarro', 'fumo', 'narguilé', 'vape'] },
  { num: 35, nome: 'Publicidade e Negócios', descricao: 'Comércio, franquias, marketing, administração', keywords: ['comércio', 'franquia', 'marketing', 'loja', 'varejo', 'e-commerce', 'marketplace', 'administração', 'negócio', 'consultoria empresarial'] },
  { num: 36, nome: 'Seguros e Finanças', descricao: 'Seguros, finanças, operações monetárias, imobiliárias', keywords: ['seguro', 'banco', 'financeiro', 'investimento', 'imobiliária', 'cripto', 'fintech'] },
  { num: 37, nome: 'Construção e Reparos', descricao: 'Construção civil, reparos, instalação', keywords: ['construção', 'reforma', 'reparo', 'instalação', 'manutenção', 'pintura'] },
  { num: 38, nome: 'Telecomunicações', descricao: 'Telecomunicações, transmissão de dados', keywords: ['telecomunicação', 'internet', 'provedor', 'comunicação', 'streaming'] },
  { num: 39, nome: 'Transporte e Logística', descricao: 'Transporte, embalagem, armazenamento, viagens', keywords: ['transporte', 'logística', 'frete', 'mudança', 'viagem', 'turismo', 'entrega'] },
  { num: 40, nome: 'Tratamento de Materiais', descricao: 'Tratamento de materiais, impressão, processamento', keywords: ['impressão 3d', 'tratamento', 'processamento', 'alfaiataria', 'gráfica'] },
  { num: 41, nome: 'Educação e Entretenimento', descricao: 'Educação, treinamento, cultura, esporte, entretenimento', keywords: ['educação', 'curso', 'treinamento', 'escola', 'entretenimento', 'evento', 'academia', 'conteúdo', 'infoproduto', 'mentoria'] },
  { num: 42, nome: 'Tecnologia e Ciência', descricao: 'Software, SaaS, desenvolvimento, pesquisa, design', keywords: ['software', 'saas', 'desenvolvimento', 'pesquisa', 'design', 'TI', 'startup', 'inteligência artificial', 'programação'] },
  { num: 43, nome: 'Alimentação e Hospedagem', descricao: 'Restaurantes, bares, hotéis, catering', keywords: ['restaurante', 'bar', 'hotel', 'buffet', 'catering', 'hospedagem', 'pousada', 'delivery', 'cafeteria', 'lanchonete', 'pizzaria', 'hamburgueria', 'sorveteria', 'padaria', 'confeitaria', 'food'] },
  { num: 44, nome: 'Serviços Médicos e Estéticos', descricao: 'Serviços médicos, veterinários, estética, saúde', keywords: ['clínica', 'consultório', 'estética', 'terapia', 'psicologia', 'nutrição', 'veterinário', 'salão', 'spa', 'dentista', 'fisioterapia'] },
  { num: 45, nome: 'Serviços Jurídicos e Pessoais', descricao: 'Serviços jurídicos, segurança, serviços pessoais', keywords: ['advocacia', 'jurídico', 'segurança', 'detetive', 'funeral', 'serviço pessoal', 'consultoria'] },
];

// Mapeamento segmento → NCLs pré-selecionadas
export const segmentToNCLs: Record<string, number[]> = {
  Moda: [25, 35],
  Cosméticos: [3, 35, 44],
  Alimentos: [29, 30, 35],
  Tech: [42, 35],
  Saúde: [44, 35],
  Criativos: [35, 41],
  Educação: [41, 35],
  'E-commerce': [35, 42],
  Outro: [],
};

export const segmentos = ['Moda', 'Cosméticos', 'Alimentos', 'Tech', 'Saúde', 'Criativos', 'Educação', 'E-commerce', 'Outro'];

export function findNCLsByKeywords(text: string): number[] {
  const lower = text.toLowerCase();
  const matches: number[] = [];
  allNCLClasses.forEach((ncl) => {
    if (ncl.keywords.some((kw) => lower.includes(kw))) {
      matches.push(ncl.num);
    }
  });
  return matches.length > 0 ? matches : [35]; // fallback to class 35
}
