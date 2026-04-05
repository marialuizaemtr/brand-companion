// ================================================================
// NCL 13 (2026) — Base completa, todas as 45 classes
// ================================================================

export interface NCLClass {
  num: number;
  nome: string;
  descricao: string;
  keywords: string[];
}

// ── utilitário interno ──────────────────────────────────────────
export function normalizar(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
}

// ── base de classes ─────────────────────────────────────────────
export const allNCLClasses: NCLClass[] = [
  {
    num: 1,
    nome: "Produtos Químicos",
    descricao: "Produtos químicos para indústria, ciência, fotografia, agricultura",
    keywords: [
      "quimica","quimico","fertilizante","adesivo","resina","cola","agroquimico",
      "pesticida","herbicida","fungicida","inseticida","solvente","detergente industrial",
      "desinfetante industrial","reagente","catalisador","aditivo","conservante",
      "pigmento quimico","glicerina","acido","base quimica","sal quimico","enzima",
      "amonia","cloro industrial","soda caustica","peroxido","sulfato","nitrato",
      "fosfato","silicone quimico","epoxi","poliuretano quimico","resina epoxi",
      "cola epoxi","impermeabilizante quimico","selante","massa plastica",
      "produto quimico","insumo quimico","materia prima quimica","biocida",
      "algicida","bactericida","produto para piscina","cloro para piscina",
      "tratamento de agua","coagulante","floculante","antiespumante","dispersante",
      "emulsificante industrial","estabilizante industrial","corante industrial",
      "toner","comburente","oxidante","redutor","acido cloridrico","acido sulfurico",
      "acido nitrico","hidroxido de sodio","carbonato","bicarbonato","silicato",
      "fosfato de calcio","ureia quimica","amido industrial","dextrina",
      "celulose quimica","acetona","eter","alcool industrial","metanol",
      "etanol industrial","glicol","propilenoglicol","surfactante","tensoativo",
      "emulsao quimica","produto de limpeza industrial","desengordurante industrial",
      "removedor","decapante","desengraxante"
    ]
  },
  {
    num: 2,
    nome: "Tintas e Vernizes",
    descricao: "Tintas, vernizes, lacas, corantes, revestimentos superficiais",
    keywords: [
      "tinta","verniz","laca","corante","pigmento","pintura","revestimento superficial",
      "esmalte","primer","selador","coating","spray de tinta","tinta automotiva",
      "tinta decorativa","tinta artistica","aguarras","diluente","tinta para tecido",
      "tinta para madeira","tinta epoxi","tinta acrilica","tinta latex","tinta pva",
      "tinta a oleo","guache","aquarela","acrilica artistica","tinta para parede",
      "tinta para metal","tinta para piso","tinta antiferrugem","tinta martelada",
      "tinta eletrostatica","tinta em po","powder coating","verniz para madeira",
      "verniz automotivo","envernizamento","laqueado","colorir","coloracao superficial",
      "revestimento decorativo","acabamento superficial","textura decorativa",
      "textura para parede","grafiato","cimento queimado efeito","tinta metalizada",
      "tinta perolada","tinta fosca","tinta acetinada","tinta brilhante",
      "tinta para artesanato","tinta para pintura em tela","pintura artistica",
      "bela arte","arte"
    ]
  },
  {
    num: 3,
    nome: "Cosméticos e Limpeza",
    descricao: "Perfumaria, cosméticos, produtos de limpeza e higiene pessoal",
    keywords: [
      "cosmetico","perfume","maquiagem","sabonete","shampoo","beleza","skincare",
      "creme","condicionador","hidratante","serum","tonico","esfoliante","mascara facial",
      "base maquiagem","batom","rimel","delineador","sombra","blush","iluminador",
      "protetor solar","bronzeador","autobronzeador","desodorante","antitranspirante",
      "creme de barbear","apos barba","locao corporal","oleo corporal","body splash",
      "colonia","eau de parfum","eau de toilette","fragancia","perfumaria",
      "produto capilar","leave in","ampola capilar","queratina","progressiva",
      "escova progressiva","alisamento","tintura capilar","coloracao capilar",
      "produto de beleza","cuidados com a pele","cuidados com o cabelo",
      "higiene pessoal","beauty","gloss","contorno","paleta","kit de maquiagem",
      "removedor de maquiagem","agua micelar","tonico facial","acido hialuronico",
      "retinol","vitamina c facial","niacinamida","gel de limpeza","foam de limpeza",
      "sabonete liquido","sabonete em barra","sabonete artesanal","sabonete natural",
      "oleo essencial cosmetico","aromaterapia cosmetica","kit skincare","rotina de beleza",
      "maquiagem vegana","cosmetico natural","cosmetico organico","clean beauty",
      "cruelty free","sem parabenos","dermocosmetico","cosmecetico",
      "micropigmentacao","tatuagem cosmetica","henna","sobrancelha","lash","cilios posticos",
      "salao de beleza produto","cabeleireiro produto","tratamento capilar",
      "reconstrucao capilar","ativador de cachos","mousse capilar","spray fixador",
      "pomada capilar","cera capilar","finalizador","protetor termico",
      "produto de limpeza","limpeza domestica","multiuso","desengordurante domest",
      "limpa vidros","alvejante","amaciante de roupa","sabao em po","sabao liquido",
      "detergente","agua sanitaria","limpador","desinfetante domestico",
      "higienizante","tira manchas","pre lavagem","amaciante concentrado",
      "capsula de limpeza","limpeza ecologica","esmalte de unhas","base de unhas",
      "top coat","removedor de esmalte","nail art","unhas decoradas","gel para unhas",
      "acrilico para unhas","manicure","pedicure","estetica produto","spa produto",
      "cuidado pessoal"
    ]
  },
  {
    num: 4,
    nome: "Óleos e Combustíveis",
    descricao: "Óleos industriais, lubrificantes, combustíveis, velas, ceras",
    keywords: [
      "oleo industrial","combustivel","lubrificante","vela de parafina","cera",
      "graxas","parafina","biodiesel","etanol combustivel","gasolina","diesel",
      "querosene","nafta","oleo de motor","fluido de freio","fluido hidraulico",
      "fluido de transmissao","oleo de corte","oleo de usinagem","oleo dieletrico",
      "oleo textil","biocombustivel","gnv","gas natural veicular","oleo lubrificante",
      "cera de abelha","cera de carnauba","cera para assoalho","cera para moveis",
      "cera automotiva","vela de cera de soja","vela aromatica industrial"
    ]
  },
  {
    num: 5,
    nome: "Produtos Farmacêuticos",
    descricao: "Medicamentos, suplementos, veterinários, higiene sanitária",
    keywords: [
      "farmacia","remedio","suplemento","vitamina","medicamento","farmaceutico",
      "antibiotico","analgesico","antiinflamatorio","antialergico","vacina",
      "probiotico","prebiotico","whey protein","creatina","suplemento alimentar",
      "suplemento esportivo","produto veterinario","racao terapeutica",
      "absorvente higienico","fralda descartavel","curativo","band aid","antisseptico",
      "alcool gel","mascara cirurgica","luva cirurgica","produto hospitalar",
      "homeopatia","fitoterapico","nutraceutico","colageno","omega 3",
      "multivitaminico","proteina em po","barra de proteina","comprimido","capsula",
      "xarope medicamento","pomada","gel medicinal","patch transdermico","spray nasal",
      "colirio","solucao oftalmica","produto odontologico","fluor","colutorio",
      "enxaguante bucal","fio dental","pasta de dente","preservativo","contraceptivo",
      "diu","teste de gravidez","teste rapido","glicosilometro","fraldas geriatricas",
      "produto para estomia","dermocosmetico farmacia","repelente de insetos",
      "creme protetor","produto saude","saude","antipulgas","anticarrapato",
      "vermifugo","vacina animal","suplemento animal","produto para pet saude",
      "coleira antiparasitaria","medicamento veterinario"
    ]
  },
  {
    num: 6,
    nome: "Metais Comuns",
    descricao: "Metais comuns, ligas metálicas, materiais de construção metálicos",
    keywords: [
      "metal","aco","ferro","aluminio","cobre","latao","zinco","bronze","titanio",
      "liga metalica","metalurgia","ferragem","estrutura metalica","chapa metalica",
      "tubo metalico","perfil metalico","parafuso","porca","rebite","solda",
      "fundicao","forjaria","trefilaria","laminacao","galvanizacao","zincagem",
      "inox","aco inoxidavel","aco carbono","aco galvanizado","ferro fundido",
      "cano de ferro","cano de aco","grade metalica","alambrado","tela metalica",
      "arame","cabo de aco","corrente metalica","mola","dobradica","fechadura metalica",
      "puxador metalico","perfil de aluminio","esquadria metalica","porta metalica",
      "portao metalico","cobertura metalica","telha metalica","telhado metalico",
      "container metalico","tanque metalico","silo metalico","estrutura de aco",
      "galpao metalico","serralheria","metalmecanica"
    ]
  },
  {
    num: 7,
    nome: "Máquinas e Equipamentos Industriais",
    descricao: "Máquinas-ferramentas, motores, equipamentos industriais e agrícolas",
    keywords: [
      "maquina industrial","motor eletrico","ferramenta industrial","equipamento industrial",
      "maquinario","turbina","compressor industrial","bomba industrial","gerador",
      "torno mecanico","fresadora","injetora","extrusora","prensa","cortadora industrial",
      "soldadora","robotica","automacao industrial","equipamento agricola",
      "colheitadeira","trator","implemento agricola","drone agricola","pulverizador",
      "maquina de costura industrial","escavadeira","guindaste","empilhadeira",
      "paleteira","retroescavadeira","motoniveladora","compactador","rolo compactador",
      "betoneira","misturador industrial","triturador industrial","moinho","britador",
      "correia transportadora","esteira industrial","elevador de carga",
      "maquina de embalagem","envasadora","seladora industrial","rotuladora",
      "encaixotadora","maquina de lavar industrial","centrifuga industrial",
      "secador industrial","forno industrial","camara frigorifica industrial",
      "maquina de cafe industrial","dispensador industrial","equipamento de panificacao",
      "maquina de sorvete industrial","pasteurizador","homogeneizador",
      "caldeira","boiler industrial","chiller","torre de resfriamento",
      "motor de combustao","motor a gas","motor diesel industrial",
      "grupo gerador","motogerador","motocompressor","moto bomba"
    ]
  },
  {
    num: 8,
    nome: "Ferramentas Manuais e Cutelaria",
    descricao: "Ferramentas manuais, cutelaria, instrumentos de corte e barbear",
    keywords: [
      "faca","tesoura","ferramenta manual","cutelaria","barbear","alicate",
      "chave de fenda","martelo","serrote","formao","bisturi","canivete","navalha",
      "aparelho de barbear","lamina de barbear","cutelo","talheres cutelaria",
      "machadinha","machado","pa manual","enxada","foice","facao","podao",
      "tesoura de poda","tesoura de cabelo","tesoura cirurgica","lanceta",
      "faca de cozinha","faca chef","faca de pao","faca de churrasco","kit de facas",
      "amolador de facas","chaira","pedra de amolar","abridor de ostras",
      "descascador","mandoline","cortador manual","espatula manual","colher manual",
      "garfo manual","faca de mesa","talheres de mesa","kit talheres"
    ]
  },
  {
    num: 9,
    nome: "Eletrônicos, Software e Tecnologia",
    descricao: "Eletrônicos, computadores, software, apps, instrumentos científicos",
    keywords: [
      "eletronico","computador","celular","smartphone","tablet","notebook","laptop",
      "desktop","servidor","hardware","periferico","teclado","mouse","monitor",
      "headphone","fone de ouvido","camera","camera fotografica","camera de seguranca",
      "cftv","camera ip","drone","gps","console","videogame","controle de videogame",
      "oculos de realidade virtual","vr","ar","realidade aumentada","smartwatch",
      "wearable","iot","sensor","microcontrolador","arduino","raspberry",
      "placa eletronica","chip","semicondutor","bateria","carregador","cabo usb",
      "roteador","modem","switch de rede","hub","firewall hardware","antena",
      "rastreador veicular","leitor biometrico","scanner","impressora","projetor",
      "televisao","tv","caixa de som","amplificador","receiver","home theater",
      "sintonizador","soundbar","subwoofer","fone bluetooth","speaker bluetooth",
      "leitor de codigo de barras","leitor de qr code","terminal pos","maquininha",
      "balanca eletronica","termometro eletronico","medidor","analisador",
      "osciloscopio","multimetro","fonte de alimentacao","no break","ups",
      "estabilizador","hd externo","ssd","pen drive","memoria ram","processador",
      "gpu","placa de video","webcam","microfone","placa de som","placa de captura",
      "e reader","kindle","leitor digital","gps esportivo","smartband",
      "fitness tracker","software","app","aplicativo","tecnologia","sistema",
      "programa","jogo eletronico","game digital","aplicativo movel","plugin",
      "extensao","firmware","sistema operacional","inteligencia artificial","ia",
      "machine learning","algoritmo","modelo de ia","saas","plataforma digital",
      "erp","crm","software empresarial","software educacional","software medico",
      "software financeiro","software juridico","software contabil","software de design",
      "software de edicao","software de automacao","rpa","chatbot","assistente virtual",
      "ia generativa","llm","api","sdk","framework","startup tech","startup",
      "deep tech","web3","blockchain","nft digital","criptomoeda plataforma",
      "exchange crypto","fintech software","insurtech software","healthtech",
      "edtech","legaltech","agtech software","proptech software",
      "desenvolvimento de software","programacao","codigo","open source",
      "plataforma de streaming","ott","iptv","podcast app","audiobook app",
      "ecommerce software","marketplace software","plataforma de vendas digital",
      "solucao digital","produto digital","curso online plataforma","lms",
      "instrumento cientifico","instrumento de medicao","equipamento de laboratorio",
      "microscopio","telescopio","espectrometro","cromatografo","centrifugadora laboratorial",
      "medidor de ph","condutivimetro","refratometro","densimetro","viscosimetro",
      "equipamento de pesquisa","tech","tecnologia da informacao","ti","digital"
    ]
  },
  {
    num: 10,
    nome: "Aparelhos Médicos e Cirúrgicos",
    descricao: "Aparelhos cirúrgicos, médicos, odontológicos, ortopédicos",
    keywords: [
      "aparelho medico","equipamento medico","instrumento cirurgico","odontologico",
      "ortopedico","protese","bisturi cirurgico","stent","marcapasso","desfibrilador",
      "endoscopio","tomografo","ressonancia magnetica","raio x","ultrassom","ecografo",
      "aparelho ortodontico","implante dentario","cadeira odontologica","aparelho auditivo",
      "lente de contato","oculos de grau","armacao de oculos","andador","cadeira de rodas",
      "muleta","bengala ortopedica","cama hospitalar","maca","nebulizador medico",
      "oximetro","medidor de pressao arterial","esfigmomanometro","glicosilometro",
      "bomba de insulina","cateter","canula","agulha medica","seringa","luva medica",
      "mascara cirurgica medica","avental cirurgico","campo cirurgico",
      "parafuso ortopedico","placa ortopedica","implante ortopedico",
      "protese de quadril","protese de joelho","protese dentaria","coroa dentaria",
      "lente intraocular","protese ocular","protese vascular","stent vascular",
      "valvula cardiaca","monitor cardiaco","holter","eletrocardiograma",
      "eletroencefalografo","eletromiografia","equipamento fisioterapia",
      "laser terapeutico","ultrassom terapeutico","tens","fes","concentrador de oxigenio",
      "cpap","bipap","ventilador mecanico","incubadora neonatal","monitor multiparametrico",
      "bomba de infusao","seringa automatica","kit diagnostico","equipamento hospitalar",
      "equipamento odontologico","material odontologico","dental","dentista equipamento"
    ]
  },
  {
    num: 11,
    nome: "Iluminação e Climatização",
    descricao: "Iluminação, aquecimento, refrigeração, ventilação, aparelhos sanitários",
    keywords: [
      "iluminacao","ar condicionado","refrigeracao","aquecimento","fogao","luminaria",
      "lampada","led","lustre","arandela","spot","refletor","ventilador","exaustor",
      "purificador de ar","umidificador","desumidificador","aquecedor","lareira",
      "chuveiro","aquecedor de agua","boiler residencial","filtro de agua domest",
      "purificador de agua domest","geladeira","freezer","camara fria residencial",
      "maquina de gelo domestica","climatizador de ar","split","janela de ar condicionado",
      "ar condicionado portatil","ar condicionado inverter","mini split","vrf",
      "sistema hvac","fita de led","luminaria de led","painel led","lampada fluorescente",
      "lampada halogena","spot de led","perfil de led","iluminacao decorativa",
      "iluminacao de jardim","pisca pisca","mangueira de led","neon flex","lampada smart",
      "iluminacao inteligente","automacao residencial iluminacao","dimmer",
      "interruptor inteligente","forno eletrico","microondas","fogao eletrico","cooktop",
      "inducao","churrasqueira eletrica","air fryer","fritadeira eletrica","torradeira",
      "grill eletrico","aquecedor de ambiente","aquecedor a gas","lareira eletrica",
      "bomba de calor","energia solar","painel solar","inversor solar",
      "aquecedor solar","coletor solar","sanitario","vaso sanitario","pia","banheira",
      "chuveiro eletrico","registro de agua","torneira","valvula hidraulica"
    ]
  },
  {
    num: 12,
    nome: "Veículos",
    descricao: "Veículos e meios de locomoção terrestre, aérea ou aquática",
    keywords: [
      "carro","moto","bicicleta","veiculo","automovel","caminhao","onibus","van",
      "utilitario","suv","pickup","veiculo eletrico","carro eletrico","moto eletrica",
      "patinete eletrico","scooter","triciclo","quadriciclo","barco","lancha",
      "jet ski","aviao","helicoptero","aeronave","ultralight","planador",
      "drone de transporte","trator agricola","maquina autopropelida","trailer",
      "motorhome","caravan","reboque","semirreboque","trem","locomotiva",
      "vagao","metro","onibus eletrico","caminhao eletrico","van eletrica",
      "moto aquatica","bote","canoa","caiaque motorizado","lancha de pesca",
      "iate","veleiro","catamaras","hovercraft","hidroaviao","parapente motorizado",
      "kart","buggy","atv","quadriciclo off road","peca automotiva","acessorio veicular",
      "pneu","roda","escapamento","para choque","paralama","espelho retrovisor",
      "banco automotivo","tapete automotivo","pelicula automotiva","envelopamento",
      "kit de som automotivo","alarme automotivo","rastreador veicular","camera de re",
      "autopeca","oficina","mecanica","concessionaria","automoveis","automovelismo",
      "mobilidade","mobilidade urbana","bike","e bike","bicicleta eletrica"
    ]
  },
  {
    num: 13,
    nome: "Armas e Pirotecnia",
    descricao: "Armas de fogo, munições, explosivos, fogos de artifício",
    keywords: [
      "arma","municao","explosivo","fogos de artificio","pirotecnia","armamento",
      "projetil","pistola","rifle","espingarda","revolver","fuzil","carabina",
      "polvora","fogos","show pirotecnico","sinalizador de socorro","fogo de artificio",
      "petardo","morteiro pirotecnico","bengala de fogo","arma de pressao","airsoft",
      "paintball","arma de defesa pessoal","taser","spray de pimenta","municao esportiva",
      "tiro esportivo","clube de tiro","stand de tiro"
    ]
  },
  {
    num: 14,
    nome: "Joalheria e Relojoaria",
    descricao: "Metais preciosos, joalheria, bijuteria, relojoaria",
    keywords: [
      "joia","bijuteria","relogio","ouro","prata","anel","colar","pulseira","brinco",
      "joalheria","joias","diamante","pedra preciosa","rubi","esmeralda","safira",
      "platina","ouro branco","ouro rose","cravejado","semijoias","semijoia",
      "relojoaria","cronografo","relogio de luxo","relogio esportivo","relogio vintage",
      "corrente de ouro","pingente","alianca","anel de noivado","anel de compromisso",
      "anel de formatura","pulseira de ouro","pulseira de prata","tornozeleira",
      "gargantilha","choker","tiara","broche","alfinete de lapela","abotoaduras",
      "porta joias","estojo para joias","kit joias","conjunto de joias","presente de luxo",
      "alianca de casamento","alianca de ouro","alianca de platina","alianca de prata",
      "piercing de ouro","piercing de prata","joalheria artesanal",
      "joalheria contemporanea","design de joias","ourives","bijuteria fina",
      "bijuteria artesanal","bijuteria de resina","bijuteria natural",
      "relogio de pulso","relogio de bolso","relogio de parede luxo","relogio de mesa luxo"
    ]
  },
  {
    num: 15,
    nome: "Instrumentos Musicais",
    descricao: "Instrumentos musicais e acessórios para instrumentos",
    keywords: [
      "instrumento musical","guitarra","piano","violao","bateria","baixo","violino",
      "viola","saxofone","trompete","flauta","clarinete","teclado musical",
      "sintetizador","dj","controlador dj","mesa de som","microfone","pedal de guitarra",
      "amplificador musical","corda de violao","palheta","baqueta","partitura",
      "instrumento de percussao","tambor","pandeiro","berimbau","cavaquinho",
      "ukulele","acordeao","sanfona","gaita","harmonica","oboe","fagote","tuba",
      "trombone","bandolim","harpa","xilofone","marimba","vibrafone","kalimba",
      "cajon","djembe","congas","bongos","timbales","chocalho","agogo","reco reco",
      "triangulo","bumbo","chimbal","prato de bateria","estante de partitura",
      "suporte de guitarra","case para instrumento","afinador","metronomo",
      "capotraste","slide de guitarra","pastilha para guitarra","captador",
      "caixa acustica","gabinete","pedaleira","loop station","looper","delay",
      "reverb","efeitos","processador de voz","sampler","sequenciador","drum machine",
      "viola caipira","rabeca","sitar","musica instrumento","luthier"
    ]
  },
  {
    num: 16,
    nome: "Papelaria e Material de Escritório",
    descricao: "Papel, papelão, impressos, papelaria, material de escritório",
    keywords: [
      "papel","papelaria","livro","revista","impressao","embalagem papel","caderno",
      "bloco de notas","agenda","planner","caneta","lapis","borracha","regua",
      "fichario","pasta","encadernacao","post it","adesivo de papel","rotulo",
      "etiqueta","calendario","cartao de visita","panfleto","flyer","catalogo",
      "folder","banner impresso","jornal","publicacao","material impresso",
      "livro didatico","livro tecnico","obra literaria","dicionario",
      "material escolar","material de escritorio","papelao","caixa de papelao",
      "embalagem de papelao","copo descartavel de papel","guardanapo de papel",
      "caneta esferografica","caneta hidrografica","caneta permanente","marcador",
      "marca texto","pincel atomico","giz","giz de cera","lapis de cor",
      "borracha escolar","apontador","compasso","transferidor",
      "esquadro","tesoura escolar","cola escolar","cola bastao","fita adesiva",
      "durex","fita crepe","fita dupla face","grampeador","grampo","perfurador",
      "clipe","prendedor","organizador de mesa","bandeja de correspondencia",
      "porta caneta","arquivador","capa para encadernacao","espiral para encadernacao",
      "documento","formulario","nota fiscal bloco","recibo","livro contabil",
      "cartilha","apostila","guia","manual impresso","album de fotos","scrapbook",
      "scrapbooking","papel fotografico","papel kraft","papel craft","papel vegetal",
      "papel milimetrado","papel de origami","papel de seda","papel crepom",
      "papel contact","editorial","editora","publicacao impressa"
    ]
  },
  {
    num: 17,
    nome: "Borracha e Plástico",
    descricao: "Borracha, plástico, materiais isolantes e de vedação semi-processados",
    keywords: [
      "borracha","plastico","vedacao","isolante","gaxeta","mangueira","tubo plastico",
      "perfil de borracha","polimero","elastomero","silicone industrial","ptfe","pvc",
      "poliuretano","embalagem plastica","filme plastico","sacola plastica",
      "embalagem stretch","filme stretch","plastico bolha","isopor","eps",
      "espuma de poliuretano","espuma eva","eva","borracha natural","borracha sintetica",
      "borracha nitrilica","borracha de silicone","vedante","selante plastico",
      "tubo de silicone","perfil de vedacao","junta de vedacao","anel de vedacao",
      "oring","gaxeta mecanica","retentor","mangueira hidraulica","mangueira pneumatica",
      "mangueira de jardim","mangueira de pvc","mangote","material isolante eletrico",
      "fita isolante","tubo corrugado","conduite plastico","caixa de passagem plastica",
      "polietileno","polipropileno","poliestireno","abs plastico","nylon industrial",
      "pet industrial","policarbonato"
    ]
  },
  {
    num: 18,
    nome: "Couro, Bolsas e Artigos de Viagem",
    descricao: "Couro, imitações de couro, malas, bolsas, guarda-chuvas",
    keywords: [
      "couro","bolsa","mala","carteira","mochila","guarda chuva","bolsa de couro",
      "mala de viagem","mochila escolar","mochila de trabalho","cinto","porta documentos",
      "pasta de couro","clutch","pochete","necessaire","kit de viagem","bagagem",
      "trolley","porta cedulas","carteira masculina","carteira feminina","bolsa feminina",
      "bolsa masculina","couro sintetico","couro vegano","eco leather","vegan leather",
      "bolsa de praia","sacola de praia","bolsa de ginastica","mochila de academia",
      "bag","tote bag","bolsa tote","shopper bag","shoulder bag","crossbody bag",
      "fanny pack","belt bag","mini bag","bolsa de couro artesanal","marroquinaria",
      "artigo em couro","cinto de couro","cinto de tecido","suspensorio",
      "bolsa de grife","bolsa de luxo","bolsa premium","guarda chuva automatico",
      "guarda chuva compacto","sombrinha","case para laptop","case para tablet",
      "sleeve para notebook","organizador de viagem","porta passaporte",
      "necessaire de viagem","porta fone","capa para celular em couro",
      "porta cartoes","card holder","key holder","porta chaves","moda acessorios",
      "acessorios de moda","bolsa fashion"
    ]
  },
  {
    num: 19,
    nome: "Materiais de Construção Não-Metálicos",
    descricao: "Materiais de construção não-metálicos: cimento, vidro, madeira, cerâmica",
    keywords: [
      "construcao","cimento","tijolo","vidro","madeira","argamassa","revestimento ceramico",
      "azulejo","porcelanato","granito","marmore","pedra","areia","brita","gesso",
      "drywall","telha","telhado","esquadria","janela","porta","piso","piso laminado",
      "deck","pergolado","madeirite","compensado","mdf","mdp","material de acabamento",
      "piso vinilico","piso de madeira","material para reforma","bloco de concreto",
      "bloco de alvenaria","tijolo refratario","tijolo aparente","pedra natural",
      "pedra artificial","pedra decorativa","pedra de revestimento","marmore sintetico",
      "quartzo","porcelanato polido","porcelanato tecnico","ceramica para piso",
      "ceramica para parede","pastilha","mosaico","vidro temperado","vidro laminado",
      "bloco de vidro","vidro jateado","espelho para obra","esquadria de aluminio",
      "esquadria de pvc","janela de aluminio","janela de pvc","porta de madeira",
      "porta de aluminio","porta de vidro","batente","moldura para construcao",
      "rodape","sanca","forro","forro de pvc","forro de gesso","laje","viga de concreto",
      "pilar","fundacao","estaca","impermeabilizante para construcao","manta asfaltica",
      "cimento cola","rejunte","grout","argamassa colante",
      "argamassa de revestimento","reboco","estuque","massa corrida","selador de parede",
      "fundo preparador","material para construcao","construcao civil"
    ]
  },
  {
    num: 20,
    nome: "Móveis e Decoração",
    descricao: "Móveis, espelhos, molduras, objetos de decoração, artigos domésticos",
    keywords: [
      "moveis","espelho","moldura","decoracao","mobiliario","sofa","mesa","cadeira",
      "cama","armario","guarda roupa","estante","rack","prateleira","escrivaninha",
      "comoda","criado mudo","cabeceira","poltrona","banco","banqueta","puff",
      "tapete decorativo","quadro","escultura","vaso decorativo","enfeite",
      "objeto de decoracao","design de interiores","design de moveis","movel planejado",
      "marcenaria","loja de decoracao","casa e decoracao","home decor","interiores",
      "decor","ambientacao","mesa posta","objeto decorativo","artesanato decorativo",
      "luminaria decorativa","vela decorativa","incenso","difusor de ambiente",
      "aromatizador","moldura para espelho","espelho decorativo","espelho bisote",
      "espelho de corpo inteiro","espelho de banheiro","espelho redondo",
      "painel decorativo","painel de madeira","painel ripado","lambri",
      "nicho decorativo","aparador","buffet","cristaleira","vitrines","armario vitrine",
      "movel para tv","painel para tv","suporte para tv","home office movel",
      "mesa de jantar","mesa de centro","mesa lateral","mesa de escritorio",
      "cadeira de escritorio","cadeira gamer","cadeira de bebe","berco","mini cama",
      "caminha infantil","movel infantil","beliche","cama solteiro","cama casal",
      "cama queen","cama king","colchao","box","cama box",
      "movel de banheiro","gabinete de banheiro","bancada de banheiro",
      "floreira","jardineira decorativa","cestaria decorativa","cesta decorativa",
      "bandeja decorativa","porta objetos","caixinha decorativa",
      "relogio de parede","relogio de mesa"
    ]
  },
  {
    num: 21,
    nome: "Utensílios Domésticos e de Cozinha",
    descricao: "Utensílios de cozinha, recipientes, vidro, porcelana, cerâmica doméstica",
    keywords: [
      "cozinha","utensilio","porcelana","ceramica","cristal","panela","frigideira",
      "wok","cacerola","chaleira","bule","cafeteira","coador","prensa francesa",
      "xicara","prato","tigela","bowl","copo","caneca","garrafa","jarra","recipiente",
      "pote","tupperware","tabua de corte","escorredor","peneira","ralador",
      "abridor de lata","espremedor","leiteira","assadeira","forma de bolo",
      "utensilio de churrasco","espeto","grelha","colher de pau","espatula de cozinha",
      "fouet","batedor","mixer manual","cesta de palha","cestaria","vaso de ceramica",
      "artesanato utilitario","kit de cozinha","conjunto de panelas","set de panelas",
      "utensilios de cozinha","utensilios de mesa","utensilios de bar",
      "decanter","saca rolhas","balde de gelo","coqueteleira","dosador",
      "taca","taca de vinho","taca de champagne","copo de cerveja","canudo",
      "garrafa termica","squeeze","marmita","bentô","lunch box",
      "prato de ceramica","prato de porcelana","louça","aparelho de jantar",
      "faqueiro","jogo de talheres","jogo de copos","jogo de xicaras",
      "travessa","sopeira","molheira","saladeira","fruteira","bomboniere",
      "pote hermetico","pote de vidro","pote de plastico","organizador de cozinha"
    ]
  },
  {
    num: 22,
    nome: "Cordas, Redes e Toldos",
    descricao: "Cordas, barbantes, redes, tendas, toldos, lonas, fibras têxteis",
    keywords: [
      "corda","rede","tenda","lona","fibra","barbante","cabo textil","sisal",
      "juta","redes de pesca","rede de dormir","hammock","toldo","cobertura textil",
      "tela textil","tecido para vela","vela nautica","sacaria","saco de estopa",
      "saco de juta","saco de algodao","palha","enchimento","acolchoamento",
      "estopa","fibra de coco","fibra natural","fibra sintetica","fio de nylon",
      "corda de nylon","corda de polipropileno","laco","amarra","fita de amarracao",
      "rede de protecao","rede de seguranca","rede esportiva","rede de volei",
      "rede de futebol","rede de tenis","toldos residenciais","toldos comerciais",
      "coberturas para eventos","lona plastica","encerado"
    ]
  },
  {
    num: 23,
    nome: "Fios Têxteis",
    descricao: "Fios e linhas para uso têxtil",
    keywords: [
      "fio","linha","textil","bordado","fio de algodao","fio de la","fio de seda",
      "fio de linho","fio sintetico","fio de poliester","fio de nylon textil",
      "linha de costura","linha de bordar","fio de croche","fio de trico",
      "novelo","meada","bobina de fio","fio elastico","fio metalizado",
      "fio de lurex","barbante artesanal","macrame","fio para tecelagem",
      "fio para malharia"
    ]
  },
  {
    num: 24,
    nome: "Tecidos",
    descricao: "Tecidos, coberturas de cama, coberturas de mesa, têxteis para o lar",
    keywords: [
      "tecido","lencol","toalha","cobertor","cortina","malha","algodao","seda",
      "linho","cetim","chiffon","organza","renda tecido","tule","voal","brim",
      "denim","jeans tecido","oxford","tricoline","viscose","poliester",
      "microfibra","flanela","moletom tecido","neoprene tecido","lycra","elastano",
      "tecido estampado","tecido liso","tecido para decoracao","tecido para cortina",
      "tecido para estofado","roupa de cama","jogo de cama","edredom",
      "travesseiro","fronha","colcha","manta","plaid","cobertura de mesa",
      "toalha de mesa","guardanapo de tecido","pano de prato","pano de copa",
      "tecido nao tecido","tnt","feltro"
    ]
  },
  {
    num: 25,
    nome: "Vestuário",
    descricao: "Roupas, calçados, chapelaria",
    keywords: [
      "roupa","moda","calcado","sapato","vestido","camiseta","chapeu","vestuario",
      "confeccao","tenis","bota","sandalia","chinelo","sapatilha","mocassim",
      "scarpin","tamanco","salto alto","rasteirinha","alpargata","slip on",
      "loafer","sneaker","chuteira","coturno",
      "calca","jeans","bermuda","short","saia","blusa","camisa","camiseta polo",
      "regata","body","top","cropped","moletom","jaqueta","blazer","terno",
      "gravata","pijama","lingerie","calcinha","sutia","cueca","meia","meia calca",
      "cachecol","echarpe","lenco","bone","gorro","viseira","boina","bandana",
      "faixa","luva","avental","uniforme","farda","jaleco","scrub",
      "roupa fitness","legging","top fitness","roupa de banho","biquini","maio",
      "sunga","saida de praia","moda praia","streetwear","fast fashion",
      "slow fashion","moda sustentavel","alta costura","pret a porter","atelier",
      "estilista","grife","marca de roupa","colecao","lookbook","desfile",
      "fashion","trend","estilo","outfit"
    ]
  },
  {
    num: 26,
    nome: "Aviamentos",
    descricao: "Rendas, bordados, fitas, botões, flores artificiais, acessórios para cabelo",
    keywords: [
      "renda","botao","fita","aviamento","bordado acessorio","ziper","velcro",
      "elastico","entretela","galao","passamanaria","franja","pompom","tassel",
      "aplique","patch","broche","fivela","colchete","presilha","grampo de cabelo",
      "tiara","arco de cabelo","elastico de cabelo","rabico","piranha de cabelo",
      "xuxinha","laco de cabelo","fita de cabelo","flor artificial","planta artificial",
      "guirlanda artificial","coroa de flores artificial","arranjo artificial",
      "alfinete","agulha","dedal","linha de costura acessorio","bobina de linha",
      "carretel","etiqueta de roupa","tag","cabide","manequim"
    ]
  },
  {
    num: 27,
    nome: "Tapetes e Revestimentos",
    descricao: "Tapetes, capachos, revestimentos de piso e parede têxteis",
    keywords: [
      "tapete","carpete","revestimento","piso textil","capacho","passadeira",
      "tapete persa","tapete oriental","tapete moderno","tapete geometrico",
      "tapete shaggy","tapete sisal","tapete de fibra","tapete antiderrapante",
      "tapete de banheiro","tapete de cozinha","tapete de quarto","tapete de sala",
      "carpete residencial","carpete comercial","forracao","revestimento de parede textil",
      "papel de parede textil","linoleo","grama sintetica","piso esportivo",
      "tatame","colchonete academia","tapete de yoga","mat de pilates"
    ]
  },
  {
    num: 28,
    nome: "Jogos e Brinquedos",
    descricao: "Jogos, brinquedos, artigos de ginástica e esporte",
    keywords: [
      "brinquedo","jogo","esporte","ginastica","recreacao","fitness","boneco",
      "boneca","pelucia","carrinho","pista","quebra cabeca","puzzle","lego",
      "blocos de montar","jogo de tabuleiro","jogo de cartas","baralho","xadrez",
      "dama","domino","bingo","jogo educativo","brinquedo educativo",
      "brinquedo de madeira","brinquedo montessori","brinquedo sensorial",
      "bola","bola de futebol","bola de basquete","bola de volei","bola de tenis",
      "raquete","raquete de tenis","prancha de surf","stand up paddle","sup","skate",
      "longboard","patins","roller","patinete",
      "equipamento de academia","halter","anilha","barra","esteira","eliptico",
      "corda de pular","faixa elastica","kettlebell",
      "luva de boxe","saco de pancada","protetor bucal","caneleira",
      "oculos de natacao","touca de natacao","pe de pato","snorkel",
      "vara de pesca","molinete","carretilha","isca","anzol","linha de pesca",
      "barraca de camping","saco de dormir","colchao inflavel",
      "videogame console","controle","joystick","jogo de video game",
      "action figure","cosplay","fantasia","mascara","decoracao de festa",
      "balao","piscina inflavel","escorregador","cama elastica","playground"
    ]
  },
  {
    num: 29,
    nome: "Alimentos Processados",
    descricao: "Carnes, peixes, laticínios, conservas, ovos, óleos comestíveis",
    keywords: [
      "carne","laticinio","conserva","queijo","leite","embutido","alimento",
      "peixe","frutos do mar","camarao","atum","sardinha","salmao","bacalhau",
      "presunto","salame","linguica","salsicha","mortadela","bacon","peito de peru",
      "charque","carne seca","carne de sol","hamburguer","almondega",
      "frango","porco","cordeiro",
      "iogurte","manteiga","margarina","creme de leite","requeijao",
      "cream cheese","ricota","mussarela","parmesao","provolone",
      "gorgonzola","brie","camembert","gouda","cheddar","coalho",
      "ovo","ovos","azeite","oleo de oliva","oleo de coco","oleo vegetal",
      "gelatina","geleia","compota","conserva de legumes","picles","azeitona",
      "palmito","cogumelo","milho enlatado","ervilha enlatada","tomate pelado",
      "extrato de tomate","molho de tomate","catchup","maionese",
      "mostarda","amendoim","castanha","nozes","amendoa","macadamia",
      "frutas secas","passas","mix de nuts","granola",
      "proteina vegetal","tofu","tempeh","leite vegetal","bebida vegetal",
      "leite de soja","leite de amendoa","leite de aveia","leite de coco"
    ]
  },
  {
    num: 30,
    nome: "Alimentos Base",
    descricao: "Café, chá, farinhas, doces, condimentos, massas, padaria",
    keywords: [
      "cafe","cha","farinha","doce","chocolate","pao","macarrao","confeitaria",
      "padaria","biscoito","bolacha","bolo","torta","brownie","cupcake",
      "cookie","waffle","panqueca","crepe","tapioca","cuscuz",
      "arroz","feijao","lentilha","grao de bico","quinoa","aveia",
      "trigo","milho","centeio","cevada","chia","linhaca",
      "granola","cereal matinal","acucar","mel","melado","rapadura",
      "adocante","cacau","achocolatado","chocolate em po",
      "bombom","trufa","barra de chocolate","fondant",
      "massa de pizza","massa de pastel","massa de lasanha","massa fresca",
      "nhoque","ravioli","capeletti","spaghetti",
      "tempero","condimento","sal","pimenta","oregano","manjericao","alecrim",
      "canela","cravo","noz moscada","curcuma","gengibre em po",
      "paprica","cominho","curry","vinagre","molho de soja",
      "shoyu","wasabi","sriracha",
      "pizza","sanduiche","salgado","coxinha","pastel",
      "empada","esfiha","quibe","pao de queijo","snack","salgadinho","chips",
      "pipoca","sorvete","picole","acai","frozen yogurt",
      "sobremesa","pudim","mousse","flan","brigadeiro","beijinho",
      "macaron","eclair","croissant","churros","sonho","donut"
    ]
  },
  {
    num: 31,
    nome: "Produtos Agrícolas",
    descricao: "Grãos, frutas, verduras, sementes, plantas, flores naturais, rações",
    keywords: [
      "fruta","verdura","semente","planta","flor","agricola","hortifruti",
      "legume","hortalica","erva","grama","arvore","muda","arbusto",
      "orquidea","rosa","girassol","tulipa","lirio","margarida",
      "violeta","suculenta","cacto","samambaia","palmeira",
      "bonsai","arranjo floral","buque","floricultura",
      "garden center","viveiro","estufa","jardinagem","paisagismo produto",
      "fertilizante organico","adubo","composto organico","substrato",
      "terra vegetal","humus","turfa","vermiculita","perlita",
      "semente de grama","semente de flor","semente de hortalica",
      "muda de arvore","muda de frutifera",
      "racao animal","racao para cachorro","racao para gato","racao para passaro",
      "racao para peixe","petisco para animal","osso para cachorro",
      "areia para gato","feno","alfafa","silagem",
      "animal vivo","gado","cavalo","ovelha","cabra","galinha",
      "peixe ornamental","passaro","hamster","coelho","tartaruga"
    ]
  },
  {
    num: 32,
    nome: "Bebidas Não-Alcoólicas",
    descricao: "Cervejas, águas minerais, sucos, refrigerantes, energéticos",
    keywords: [
      "cerveja","agua","suco","refrigerante","bebida","energetico",
      "agua mineral","agua com gas","agua saborizada","agua de coco",
      "suco de laranja","suco de uva","suco verde","suco detox","smoothie",
      "limonada","cha gelado","ice tea","kombucha","kefir de agua",
      "isotonico","repositor hidroeletrolitico","pre treino bebida",
      "bebida esportiva","bebida funcional","bebida vegetal",
      "refrigerante cola","refrigerante guarana",
      "tonica","ginger ale","club soda","soda","xarope para bebida",
      "concentrado de fruta","polpa de fruta","nectar","refresco",
      "cerveja artesanal","cerveja ipa","cerveja lager","cerveja pilsen",
      "cerveja stout","cerveja porter","cerveja weiss","cerveja ale",
      "cerveja sem alcool","cerveja zero","chopp","chope","malte","lupulo",
      "cervejaria","brewpub","homebrew"
    ]
  },
  {
    num: 33,
    nome: "Bebidas Alcoólicas",
    descricao: "Bebidas alcoólicas (exceto cervejas), vinhos, destilados",
    keywords: [
      "vinho","cachaca","whisky","vodka","licor","destilado","gin",
      "rum","tequila","mezcal","conhaque","cognac","brandy","armagnac",
      "grappa","sake","soju","absinto","amaretto","limoncello","sambuca",
      "campari","aperol","fernet","vermouth","porto",
      "marsala","moscatel","prosecco","champagne",
      "espumante","cava","lambrusco","rose","vinho branco","vinho tinto",
      "vinho verde","vinho suave","vinho seco",
      "vinho organico","vinho biodinamico","vinho natural","vinicola",
      "adega","sommelier","enologia","degustacao","harmonizacao",
      "coquetel","drink","cocktail","bartender","mixologia",
      "cachaca artesanal","cachaca envelhecida","pinga","aguardente",
      "licor de frutas","creme de licor","hidromel","sidra"
    ]
  },
  {
    num: 34,
    nome: "Tabaco",
    descricao: "Tabaco, artigos para fumantes, cigarros eletrônicos",
    keywords: [
      "tabaco","cigarro","fumo","narguile","vape","cigarrilha","charuto",
      "cachimbo","tabacaria","fumante","tabaqueira","piteira","isqueiro",
      "fosforo","cinzeiro","cortador de charuto","umidificador de charuto",
      "humidor","cigarro eletronico","pod","juice","essencia vape",
      "atomizador","coil","resistencia vape","dispositivo eletronico fumo",
      "seda","papel de enrolar","filtro cigarro","tabaco de mascar",
      "rape","snus","nicotina","acessorio para fumo"
    ]
  },
  {
    num: 35,
    nome: "Publicidade e Negócios",
    descricao: "Comércio, franquias, marketing, administração, varejo, e-commerce",
    keywords: [
      "comercio","franquia","marketing","loja","varejo","e commerce","marketplace",
      "administracao","negocio","consultoria empresarial","publicidade",
      "propaganda","agencia de publicidade","gestao de negocios","contabilidade",
      "assessoria","auditoria","relacoes publicas","branding","identidade visual",
      "design grafico","design de marca","pesquisa de mercado","analise de dados",
      "business intelligence","bi","crm servico","erp servico",
      "importacao","exportacao","trading","representacao comercial",
      "distribuicao","atacado","atacadista","licitacao","compras",
      "gestao de estoque","supply chain","cadeia de suprimentos",
      "merchandising","visual merchandising","trade marketing",
      "marketing digital","seo","sem","midia social","social media",
      "influencer","influenciador","conteudo digital","copywriting",
      "email marketing","inbound marketing","outbound marketing",
      "performance","trafego pago","google ads","meta ads","anuncio",
      "telemarketing","call center","atendimento ao cliente","sac",
      "secretariado","coworking","escritorio virtual","sala de reuniao",
      "producao de eventos","organizacao de feiras","stand","exposicao",
      "convencao","congresso","feira","evento corporativo",
      "recursos humanos","rh","recrutamento","selecao","headhunter",
      "treinamento corporativo","coaching empresarial","mentoria empresarial",
      "gestao de pessoas","departamento pessoal","folha de pagamento",
      "terceirizacao","outsourcing","bpo","backoffice",
      "loja virtual","ecommerce","plataforma de venda","ponto de venda",
      "pdv","comercio eletronico","dropshipping","marketplace digital",
      "loja fisica","shopping","galeria","quiosque","pop up store",
      "supermercado","hipermercado","minimercado","emporio","armazem",
      "mercearia","conveniencia","farmacia comercio","drogaria comercio",
      "pet shop","loja de roupa","boutique","brecho","loja de calcados",
      "loja de acessorios","loja de joias","loja de brinquedos",
      "loja de moveis","loja de eletronicos","loja de informatica",
      "loja de materiais de construcao","home center","loja de tintas",
      "loja de cosmeticos","perfumaria loja","loja de instrumentos musicais"
    ]
  },
  {
    num: 36,
    nome: "Seguros e Finanças",
    descricao: "Seguros, finanças, operações monetárias, imobiliárias, criptomoedas",
    keywords: [
      "seguro","banco","financeiro","investimento","imobiliaria","cripto","fintech",
      "cartao de credito","cartao de debito","conta bancaria","conta digital",
      "pix","transferencia","boleto","pagamento","gateway de pagamento",
      "maquininha de cartao","adquirente","subadquirente",
      "emprestimo","financiamento","consorcio","leasing","factoring",
      "antecipacao de recebiveis","capital de giro","credito",
      "fundo de investimento","acao","acoes","bolsa de valores",
      "renda fixa","renda variavel","tesouro direto","cdb","lci","lca",
      "debenture","cri","cra","fii","fundo imobiliario","etf","bdr",
      "criptomoeda","bitcoin","ethereum","token","stablecoin","defi",
      "exchange","corretora","assessoria de investimentos","wealth management",
      "private banking","asset management","gestora de fundos",
      "seguro de vida","seguro saude","seguro auto","seguro residencial",
      "seguro empresarial","seguro viagem","previdencia","previdencia privada",
      "pensao","aposentadoria","capitalizacao","titulo de capitalizacao",
      "corretor de imoveis","avaliacao de imoveis",
      "administracao de condominios","incorporadora",
      "crowdfunding","equity crowdfunding","p2p lending","open banking",
      "open finance","conta corrente","poupanca","cambio","remessa internacional"
    ]
  },
  {
    num: 37,
    nome: "Construção e Reparos",
    descricao: "Construção civil, reparos, instalação, manutenção",
    keywords: [
      "construcao civil","reforma","reparo","instalacao","manutencao","pintura",
      "empreiteira","construtora","engenharia civil","pedreiro","mestre de obras",
      "eletricista","encanador","bombeiro hidraulico","serralheiro","vidraceiro",
      "gesseiro","azulejista","piso instalacao","revestimento instalacao",
      "impermeabilizacao","drenagem","terraplanagem","fundacao servico",
      "estrutura servico","alvenaria servico","telhado servico","cobertura servico",
      "fachada","restauracao","retrofit","remodelacao",
      "ar condicionado instalacao","aquecedor instalacao","energia solar instalacao",
      "automacao residencial instalacao","alarme instalacao","cftv instalacao",
      "elevador manutencao","portao eletronico",
      "dedetizacao","desinsetizacao","desratizacao","controle de pragas",
      "limpeza de fachada","limpeza pos obra","limpeza industrial",
      "jardinagem servico","paisagismo servico","poda de arvore",
      "mecanica automotiva","funilaria","pintura automotiva","polimento",
      "martelinho de ouro","borracharia","troca de oleo","revisao automotiva",
      "assistencia tecnica","conserto de eletrodomestico","conserto de celular",
      "conserto de computador","reparos domesticos","handyman","faz tudo",
      "marcenaria servico","carpintaria servico","estofamento","tapecaria"
    ]
  },
  {
    num: 38,
    nome: "Telecomunicações",
    descricao: "Telecomunicações, transmissão de dados, internet, streaming",
    keywords: [
      "telecomunicacao","internet","provedor","comunicacao","streaming",
      "telefonia","banda larga","fibra optica","5g","4g","wifi",
      "radio","televisao transmissao","transmissao ao vivo","live",
      "broadcast","podcasting","webcast","videoconferencia","voip",
      "mensagem","sms","email servico","correio eletronico",
      "rede social plataforma","chat","mensageiro",
      "cdn","data center","cloud","hospedagem de site","hosting",
      "dominio","registro de dominio","vpn","proxy",
      "iot comunicacao","m2m","telemetria","satelite","antena comunicacao",
      "torre de celular","infraestrutura telecom"
    ]
  },
  {
    num: 39,
    nome: "Transporte e Logística",
    descricao: "Transporte, embalagem, armazenamento, viagens, turismo",
    keywords: [
      "transporte","logistica","frete","mudanca","viagem","turismo","entrega",
      "transportadora","frota","caminhoneiro","motorista","uber","taxi",
      "motoboy","bike courier","courier","entregas rapidas","same day delivery",
      "last mile","express","sedex","correios","envio","despacho",
      "importacao logistica","exportacao logistica","desembaraco aduaneiro",
      "despachante aduaneiro","agente de carga","freight forwarder",
      "navio","porto","container transporte","terminal portuario",
      "aeroporto","companhia aerea","voo","passagem aerea","fretamento",
      "charter","rodoviario","ferroviario","multimodal","intermodal",
      "armazenagem","armazem logistico","centro de distribuicao",
      "fulfillment","picking","packing","cross docking",
      "mudanca residencial","mudanca comercial","guarda moveis",
      "agencia de viagens","operadora de turismo","pacote turistico",
      "excursao","cruzeiro","transfer","traslado",
      "aluguel de carro","locadora de veiculos","rent a car",
      "estacionamento","valet","garagem","parking"
    ]
  },
  {
    num: 40,
    nome: "Tratamento de Materiais",
    descricao: "Tratamento de materiais, impressão, processamento, reciclagem",
    keywords: [
      "impressao 3d","tratamento","processamento","alfaiataria","grafica",
      "impressao grafica","offset","serigrafia","silk screen","sublimacao",
      "tampografia","flexografia","rotogravura","impressao digital",
      "plotagem","recorte","corte a laser","gravacao a laser","cnc",
      "usinagem","torneamento","fresamento","retifica","soldagem servico",
      "fundicao servico","forjaria servico","tratamento termico",
      "galvanizacao servico","zincagem servico","cromagem","niquelagem",
      "anodizacao","pintura industrial servico","jateamento","polimento industrial",
      "corte de tecido","costura industrial","faccao","confeccao servico",
      "bordado servico","estamparia","tinturaria","lavanderia industrial",
      "beneficiamento textil","acabamento textil",
      "processamento de alimentos","embalagem servico","envasamento servico",
      "rotulagem servico","pasteurizacao servico","liofilizacao",
      "desidratacao","defumacao","moagem","refinacao",
      "reciclagem","tratamento de residuos","incineracao","compostagem",
      "tratamento de agua servico","tratamento de efluentes","descontaminacao",
      "marcenaria servico industrial","carpintaria","curtimento de couro",
      "lapidacao","ourivesaria servico","relojoaria servico"
    ]
  },
  {
    num: 41,
    nome: "Educação e Entretenimento",
    descricao: "Educação, treinamento, cultura, esporte, entretenimento, mídia",
    keywords: [
      "educacao","curso","treinamento","escola","entretenimento","evento",
      "academia educacao","conteudo","infoproduto","mentoria",
      "universidade","faculdade","pos graduacao","mba","mestrado","doutorado",
      "ead","ensino a distancia","ensino online","plataforma de ensino",
      "videoaula","aula particular","tutoria","reforco escolar","preparatorio",
      "pre vestibular","concurso","coaching","palestra","workshop","seminario",
      "congresso educacional","simposio","conferencia",
      "idiomas","ingles","espanhol","frances","alemao","italiano","japones",
      "mandarim","portugues para estrangeiros","libras",
      "musica ensino","danca ensino","teatro ensino","cinema ensino",
      "fotografia ensino","artes ensino","pintura ensino",
      "artesanato ensino","culinaria ensino","gastronomia ensino",
      "yoga ensino","meditacao ensino","pilates ensino","personal trainer",
      "educacao fisica","esporte ensino","artes marciais","karate","judo",
      "jiu jitsu","muay thai","boxing ensino","capoeira","taekwondo",
      "editora","publicacao digital","revista digital","jornal digital",
      "blog","canal youtube","podcast","audiobook","ebook",
      "show","concerto","festival","espetaculo","peca de teatro",
      "musical","circo","stand up","comedy","comedia",
      "cinema","filme","serie","documentario","animacao","producao audiovisual",
      "producao de video","producao de audio","estudio de gravacao",
      "gravadora","selo musical","distribuidora musical",
      "parque de diversao","parque tematico","parque aquatico",
      "escape room","boliche","arcade","laser tag",
      "clube","associacao","recreacao",
      "museu","galeria de arte","exposicao cultural","biblioteca","acervo"
    ]
  },
  {
    num: 42,
    nome: "Tecnologia e Ciência",
    descricao: "Software, SaaS, desenvolvimento, pesquisa, design, consultoria de TI",
    keywords: [
      "software servico","saas","desenvolvimento","pesquisa","design","ti",
      "startup servico","inteligencia artificial servico","programacao servico",
      "desenvolvimento de software","desenvolvimento web","desenvolvimento mobile",
      "desenvolvimento de app","full stack","front end","back end","devops",
      "cloud computing","computacao em nuvem","infraestrutura como servico",
      "iaas","paas","plataforma como servico","microservicos","api servico",
      "integracao de sistemas","arquitetura de software","consultoria de ti",
      "seguranca da informacao","cybersecurity","pentest","auditoria de seguranca",
      "compliance digital","lgpd consultoria","gdpr","protecao de dados",
      "hosting servico","hospedagem servico","servidor dedicado","vps",
      "certificado ssl","backup","disaster recovery","monitoramento de sistemas",
      "suporte tecnico","help desk","service desk","noc","soc",
      "ux","ui","user experience","user interface","design de produto",
      "design de interface","prototipagem","wireframe","figma",
      "pesquisa cientifica","laboratorio","ensaio","teste de qualidade",
      "certificacao","norma tecnica","metrologia","calibracao",
      "engenharia","engenharia mecanica","engenharia eletrica","engenharia quimica",
      "engenharia de producao","engenharia ambiental","engenharia civil servico",
      "arquitetura","urbanismo","paisagismo projeto","design de interiores servico",
      "projeto","cad","bim","modelagem 3d","renderizacao","visualizacao",
      "blockchain servico","web3 servico","nft servico","metaverso",
      "machine learning servico","deep learning","nlp","visao computacional",
      "robotica servico","automacao servico","rpa servico","chatbot servico",
      "data science","big data","analytics","business analytics",
      "iot servico","internet das coisas","smart home","smart city",
      "agtech","proptech","healthtech servico","edtech servico","legaltech servico",
      "regtech","govtech","insurtech","martech","adtech","hrtech",
      "biotecnologia","nanotecnologia","cleantech","greentech"
    ]
  },
  {
    num: 43,
    nome: "Alimentação e Hospedagem",
    descricao: "Restaurantes, bares, hotéis, catering, food service",
    keywords: [
      "restaurante","bar","hotel","buffet","catering","hospedagem","pousada",
      "delivery","cafeteria","lanchonete","pizzaria","hamburgueria","sorveteria",
      "padaria servico","confeitaria servico","food","food truck","food service",
      "chef","cozinheiro","gastronomia","culinaria","bistro","brasserie",
      "steakhouse","churrascaria","rodizio","sushi","comida japonesa",
      "comida chinesa","comida italiana","comida mexicana","comida arabe",
      "comida indiana","comida tailandesa","comida coreana","comida peruana",
      "comida brasileira","comida regional","comida caseira","comida natural",
      "comida fit","comida vegana","comida vegetariana","comida organica",
      "acai loja","juice bar","smoothie bar","tea house","casa de cha",
      "doceria","casa de doces","chocolate shop","gelateria",
      "pub","cervejaria servico","wine bar","cocktail bar","speakeasy",
      "rooftop","beach club","lounge","nightclub","balada","casa noturna",
      "hotel boutique","resort","hostel","airbnb","albergue",
      "motel","flat","apart hotel","lodge","chale","cabana",
      "camping servico","glamping","spa hotel","hotel fazenda",
      "casa de repouso","cantina","refeitorio",
      "restaurante self service","restaurante por quilo","fast food",
      "take away","grab and go","dark kitchen","ghost kitchen","cloud kitchen"
    ]
  },
  {
    num: 44,
    nome: "Serviços Médicos e Estéticos",
    descricao: "Serviços médicos, veterinários, estética, saúde, beleza",
    keywords: [
      "clinica","consultorio","estetica","terapia","psicologia","nutricao",
      "veterinario","salao","spa","dentista","fisioterapia",
      "medico","medicina","cirurgia","ortopedia","cardiologia","dermatologia",
      "oftalmologia","otorrinolaringologia","ginecologia","obstetricia",
      "pediatria","geriatria","neurologia","psiquiatria","urologia",
      "gastroenterologia","endocrinologia","reumatologia","oncologia",
      "radiologia","patologia","anestesiologia","pneumologia",
      "nefrologia","hematologia","infectologia","alergologia",
      "medicina do trabalho","medicina esportiva","medicina estetica",
      "cirurgia plastica","lipoaspiracao","abdominoplastia","rinoplastia",
      "blefaroplastia","mamoplastia","preenchimento facial","botox",
      "harmonizacao facial","bioestimulador","fios de sustentacao",
      "peeling","microagulhamento","laser dermatologico","depilacao a laser",
      "depilacao","fotodepilacao","design de sobrancelha",
      "manicure servico","pedicure servico","nail designer","podologia",
      "cabeleireiro","barbeiro","barbearia","hair stylist",
      "colorista","visagista","tricologia","tratamento capilar servico",
      "salao de beleza","studio de beleza","centro de estetica",
      "esteticista","cosmetologia","biomedicina estetica",
      "massagem","massoterapia","shiatsu","reflexologia","drenagem linfatica",
      "quick massage","thai massage","ayurveda","reiki","acupuntura",
      "quiropraxia","osteopatia","pilates terapeutico","rpg fisioterapia",
      "fonoaudiologia","terapia ocupacional","musicoterapia","arteterapia",
      "psicanalise","terapia cognitivo comportamental","tcc","coaching saude",
      "nutricionista","nutrologo","dieta","reeducacao alimentar",
      "personal diet","consultoria nutricional",
      "veterinaria","pet","animal","clinica veterinaria","hospital veterinario",
      "banho e tosa","pet grooming","hotel para animais","creche para animais",
      "adestramento","comportamento animal","fisioterapia animal",
      "odontologia veterinaria","dermatologia veterinaria",
      "jardim botanico","horto","floricultura servico",
      "terapia florestal","garden therapy"
    ]
  },
  {
    num: 45,
    nome: "Serviços Jurídicos e Pessoais",
    descricao: "Serviços jurídicos, segurança, serviços pessoais, propriedade intelectual",
    keywords: [
      "advocacia","juridico","seguranca","detetive","funeral","servico pessoal",
      "consultoria juridica","advogado","escritorio de advocacia","law firm",
      "direito empresarial","direito trabalhista","direito civil","direito penal",
      "direito tributario","direito ambiental","direito digital","direito imobiliario",
      "direito de familia","direito do consumidor","direito internacional",
      "propriedade intelectual","registro de marca","patente","direito autoral",
      "copyright","trade mark","marca registrada","pi","inpi",
      "mediacao","arbitragem","conciliacao","resolucao de conflitos",
      "compliance","governanca corporativa","due diligence","auditoria juridica",
      "contrato","elaboracao de contrato","revisao de contrato","parecer juridico",
      "certidao","cartorio","tabelionato","registro civil","registro de imoveis",
      "reconhecimento de firma","autenticacao","apostilamento",
      "seguranca patrimonial","vigilancia","monitoramento","portaria","vigia",
      "seguranca eletronica","alarme servico","cftv servico","controle de acesso",
      "seguranca pessoal","escolta","seguranca executiva","bodyguard",
      "investigacao","detetive particular","pericia","perito",
      "bombeiro civil","brigada de incendio","socorrista",
      "funeraria","cemiterio","crematorio","servico funerario","plano funerario",
      "cerimonialista","celebrante","casamento servico","assessoria de casamento",
      "organizacao de casamento","wedding planner",
      "personal organizer","personal stylist","personal shopper",
      "concierge","mordomo","servico domestico","diarista","faxineira",
      "baba","cuidador de idosos","acompanhante","au pair",
      "astrologia","numerologia","tarot","horoscopo",
      "genealogia","pesquisa genealogica","arvore genealogica",
      "servico religioso","capelania","aconselhamento espiritual",
      "ong","terceiro setor","filantropia","voluntariado","associacao servico"
    ]
  },
];

// Mapeamento segmento → NCLs pré-selecionadas
export const segmentToNCLs: Record<string, number[]> = {
  Moda: [25, 35],
  Cosméticos: [3, 35, 44],
  Alimentos: [29, 30, 35, 43],
  Tech: [9, 42, 35],
  Saúde: [5, 10, 44, 35],
  Criativos: [35, 41, 42],
  Educação: [41, 35],
  'E-commerce': [35, 42],
  Outro: [],
};

export const segmentos = ['Moda', 'Cosméticos', 'Alimentos', 'Tech', 'Saúde', 'Criativos', 'Educação', 'E-commerce', 'Outro'];

/**
 * Verifica se uma keyword aparece como palavra inteira no texto.
 * Evita falsos positivos como "automoveis" matchando "moveis".
 */
function matchWholeWord(text: string, keyword: string): boolean {
  // Escapa chars especiais de regex na keyword
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|\\s)${escaped}($|\\s)`, 'i');
  return regex.test(text);
}

/**
 * Para keywords compostas (ex: "oficina mecanica"), verifica se
 * TODAS as palavras individuais aparecem como palavras inteiras no texto.
 */
function matchCompoundKeyword(text: string, keyword: string): boolean {
  const kwWords = keyword.split(/\s+/).filter(w => w.length > 2);
  if (kwWords.length === 0) return false;
  // Todas as palavras significativas da keyword devem estar presentes
  return kwWords.every(word => matchWholeWord(text, word));
}

export function findNCLsByKeywords(text: string): number[] {
  const lower = normalizar(text);
  const inputWords = lower.split(/\s+/).filter(w => w.length > 2);
  const scored: { num: number; score: number }[] = [];

  allNCLClasses.forEach((ncl) => {
    let score = 0;
    ncl.keywords.forEach((kw) => {
      const kwNorm = normalizar(kw);
      // Match 1: keyword composta aparece inteira no texto do usuário
      if (matchCompoundKeyword(lower, kwNorm)) {
        score += kwNorm.split(/\s+/).length; // mais palavras = mais relevante
      }
      // Match 2: palavra do usuário é exatamente uma keyword
      else if (inputWords.some(w => w === kwNorm)) {
        score += 1;
      }
      // Match 3: keyword de 5+ chars aparece como palavra inteira no input
      else if (kwNorm.length >= 5 && matchWholeWord(lower, kwNorm)) {
        score += 1;
      }
    });

    if (score > 0) {
      scored.push({ num: ncl.num, score });
    }
  });

  // Ordena por score decrescente e pega os com score relevante
  scored.sort((a, b) => b.score - a.score);
  const matches = scored.filter(s => s.score >= 1).map(s => s.num);

  // Always include 35 (business/commerce) as it's relevant for most businesses
  if (matches.length > 0 && !matches.includes(35)) matches.push(35);
  return matches.length > 0 ? matches : [35];
}
