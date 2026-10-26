/** Conteúdo educativo resumido. Não confundir estudos sonoros sintetizados com gravações históricas. */
export const states = [
  {
    id: 'goias', code: 'GO', number: '01', title: 'Goiás', subtitle: 'Da viola às grandes vozes',
    tagline: 'Entre estradas de terra, rodas de viola e palcos que alcançaram o Brasil inteiro.',
    short: 'Viola caipira, catira e as muitas gerações do sertanejo.',
    image: '/images/goias.jpg', color: '#BD753C', imageAlt: 'Ilustração editorial de paisagem rural do Cerrado goiano, em tons alaranjados.',
    genres: [
      {name:'Moda de viola',type:'Expressão musical',text:'Narrativas cantadas em duplas, ligadas à cultura caipira e ao acompanhamento da viola.'},
      {name:'Catira',type:'Dança e música',text:'Dança coletiva marcada por palmas e sapateados, frequentemente acompanhada pela viola.'},
      {name:'Sertanejo',type:'Gênero musical',text:'Das matrizes rurais ao universo pop, um estilo que atravessou diferentes gerações.'},
    ],
    artists: ['zeze', 'marilia'],
    curiosity: 'A viola e a catira ajudam a contar uma história que vai muito além dos grandes espetáculos: a das comunidades e das festas locais.',
    milestones: [{year:'Século XX',label:'A tradição caipira ganha novas gravações e circulação.'},{year:'1991',label:'O sucesso de “É o Amor” projeta Zezé Di Camargo & Luciano.'},{year:'2016',label:'Marília Mendonça amplia a presença feminina no sertanejo popular.'}],
    track: 'goias-demo', source: 'https://zezedicamargoeluciano.com.br/'
  },
  {
    id: 'mato-grosso', code: 'MT', number: '02', title: 'Mato Grosso', subtitle: 'O som da beira do rio',
    tagline: 'Na Baixada Cuiabana, música, poesia, dança e saberes artesanais seguem em movimento.',
    short: 'Cururu, siriri, rasqueado e a viola de cocho.',
    image:'/images/mato-grosso.jpg',color:'#657A56',imageAlt:'Ilustração editorial com rios e vegetação da região de Mato Grosso.',
    genres: [
      {name:'Cururu',type:'Manifestação musical e religiosa',text:'Envolve canto, desafios poéticos e práticas festivas nas quais a viola de cocho é central.'},
      {name:'Siriri',type:'Dança popular',text:'Dança em pares ou fileiras, acompanhada por viola de cocho, reco-reco e percussão.'},
      {name:'Rasqueado cuiabano',type:'Gênero musical',text:'Estilo regional marcado pelo ritmo dançante e pela identidade musical cuiabana.'},
    ],
    artists:['flor'],
    curiosity:'O modo de fazer a viola de cocho foi registrado como Patrimônio Cultural do Brasil pelo Iphan em 2005.',
    milestones:[{year:'Gerações',label:'Mestres transmitem técnicas de construção, canto e dança.'},{year:'2005',label:'Iphan registra o modo de fazer a viola de cocho.'},{year:'Hoje',label:'Grupos culturais mantêm o siriri em circulação e renovação.'}],
    track:'mt-demo',source:'https://www.gov.br/iphan/pt-br/superintendencias/mato-grosso/patrimonio-imaterial'
  },
  {
    id:'mato-grosso-do-sul',code:'MS',number:'03',title:'Mato Grosso do Sul',subtitle:'A música encontra a fronteira',
    tagline:'Entre águas, campos e fronteiras, canções guardam encontros e deslocamentos.',
    short:'Música pantaneira, chamamé e diálogos com o Paraguai.',
    image:'/images/mato-grosso-do-sul.jpg',color:'#6F9189',imageAlt:'Ilustração editorial de áreas alagadas e capim no Pantanal.',
    genres:[
      {name:'Música pantaneira',type:'Universo musical',text:'Canções e criações ligadas à paisagem, às memórias e ao cotidiano do Pantanal.'},
      {name:'Chamamé',type:'Gênero e dança',text:'Expressão do universo musical fronteiriço, difundida entre Argentina, Paraguai e Brasil.'},
      {name:'Viola e canção regional',type:'Expressão musical',text:'Instrumentos de cordas acompanham composições sobre a natureza e as pessoas da região.'},
    ],
    artists:['almir','helena','tete'],
    curiosity:'Os limites dos estados não dividem completamente as tradições: o modo de fazer a viola de cocho circula por MT e MS.',
    milestones:[{year:'Século XX',label:'Violas, acordeões e cantos fronteiriços circulam pela região.'},{year:'1985',label:'Tetê Espíndola vence um grande festival com “Escrito nas Estrelas”.'},{year:'Hoje',label:'Artistas mantêm diálogos entre repertórios pantaneiros e urbanos.'}],
    track:'ms-demo',source:'https://www.gov.br/iphan/pt-br/superintendencias/mato-grosso-do-sul/patrimonio-imaterial'
  },
  {
    id:'distrito-federal',code:'DF',number:'04',title:'Distrito Federal',subtitle:'A cidade vira amplificador',
    tagline:'Entre a arquitetura modernista e os espaços de encontro, uma juventude criou novas vozes.',
    short:'Rock brasiliense, cena independente e música urbana.',
    image:'/images/distrito-federal.jpg',color:'#6B848F',imageAlt:'Ilustração editorial inspirada na arquitetura modernista de Brasília.',
    genres:[
      {name:'Rock brasiliense',type:'Cena musical',text:'A cena do punk e do pós-punk impulsionou bandas de repercussão nacional nos anos 1980.'},
      {name:'Música independente',type:'Cena musical',text:'Bandas, coletivos e espaços culturais mostram que a produção local vai além dos grandes nomes.'},
      {name:'Música urbana',type:'Expressões diversas',text:'Brasília também reúne hip-hop, música instrumental, popular e várias outras linguagens.'},
    ],
    artists:['legiao','capital','plebe'],
    curiosity:'Integrantes de bandas como Legião Urbana, Capital Inicial e Plebe Rude se encontravam e criavam no ambiente cultural de Brasília.',
    milestones:[{year:'1960',label:'A inauguração de Brasília inaugura também novos encontros culturais.'},{year:'Anos 1980',label:'A cena do rock brasiliense ganha projeção nacional.'},{year:'1985',label:'Legião Urbana lança seu primeiro álbum.'}],
    track:'df-demo',source:'https://www.correiobraziliense.com.br/app/noticia/especiais/brasilia-capital-do-rock/2013/03/05/dialogarparaliderar,352823/veja-como-o-correio-braziliense-contou-a-historia-do-rock-de-brasilia.shtml'
  }
];
export const artists = [
  {id:'zeze',name:'Zezé Di Camargo & Luciano',state:'goias',tag:'Sertanejo',era:'Anos 1990 em diante',tone:'#C88653',bio:'Os irmãos nasceram em Goiás e tornaram-se um dos nomes mais conhecidos do sertanejo brasileiro. Sua trajetória aproxima referências familiares do interior e a expansão do gênero nas rádios.',work:'É o Amor',curiosity:'Os dois são naturais de Capela do Rio do Peixe, distrito de Pirenópolis, em Goiás.',source:'https://zezedicamargoeluciano.com.br/'},
  {id:'marilia',name:'Marília Mendonça',state:'goias',tag:'Sertanejo / composição',era:'Anos 2010',tone:'#B56F67',bio:'Nascida em Cristianópolis e criada em Goiânia, destacou-se como compositora e cantora. Sua obra ajudou a ampliar o espaço de narrativas femininas na música sertaneja.',work:'Infiel',curiosity:'Antes de se projetar como intérprete, compôs músicas gravadas por outros artistas.',source:'https://agencia.go.gov.br/lancada-em-goiania-serie-documental-sobre-cantora-marilia-mendonca/'},
  {id:'flor',name:'Flor Ribeirinha',state:'mato-grosso',tag:'Siriri / tradição popular',era:'Tradição viva',tone:'#6C835C',bio:'Grupo cultural ligado à valorização e apresentação do siriri mato-grossense. Sua atuação oferece uma porta de entrada para as danças, figurinos e sonoridades da região.',work:'Apresentações de siriri',curiosity:'O siriri envolve dança coletiva: não é apenas um gênero que se escuta.',source:'https://www.gov.br/iphan/pt-br/superintendencias/mato-grosso/patrimonio-imaterial'},
  {id:'almir',name:'Almir Sater',state:'mato-grosso-do-sul',tag:'Música pantaneira / viola',era:'Anos 1980 em diante',tone:'#7E9A7C',bio:'Violeiro, cantor e compositor fortemente associado ao universo pantaneiro. Seu trabalho aproximou a viola de novos públicos e de diferentes linguagens da música brasileira.',work:'Tocando em Frente',curiosity:'A viola de dez cordas é uma presença marcante em sua produção.',source:'https://dicionariompb.com.br/artista/almir-sater/'},
  {id:'helena',name:'Helena Meirelles',state:'mato-grosso-do-sul',tag:'Viola / música de fronteira',era:'Século XX',tone:'#BB8A54',bio:'Violeira e compositora reconhecida por sua maneira singular de tocar, com repertório ligado às culturas rurais e fronteiriças de Mato Grosso do Sul.',work:'Gravações de viola e guarânias',curiosity:'Conquistou reconhecimento mais amplo depois de muitos anos dedicada à música.',source:'https://dicionariompb.com.br/artista/helena-meirelles/'},
  {id:'tete',name:'Tetê Espíndola',state:'mato-grosso-do-sul',tag:'MPB / experimentação',era:'Anos 1970 em diante',tone:'#9C7990',bio:'Nascida em Campo Grande, é conhecida pela voz de grande extensão, experimentação musical e diálogo com a paisagem sonora do Centro-Oeste.',work:'Escrito nas Estrelas',curiosity:'A canção “Escrito nas Estrelas” venceu o Festival dos Festivais em 1985.',source:'https://www.sescsp.org.br/editorial/tete-espindola-a-cantora-com-passaros-na-garganta/'},
  {id:'legiao',name:'Legião Urbana',state:'distrito-federal',tag:'Rock',era:'Anos 1980–1990',tone:'#7F9AA3',bio:'Formada em Brasília, tornou-se uma referência do rock brasileiro, articulando juventude, reflexão social e canções de grande circulação.',work:'Será',curiosity:'O álbum de estreia foi lançado em 1985.',source:'https://www.correiobraziliense.com.br/app/noticia/especiais/brasilia-capital-do-rock/2013/03/05/dialogarparaliderar,352823/veja-como-o-correio-braziliense-contou-a-historia-do-rock-de-brasilia.shtml'},
  {id:'capital',name:'Capital Inicial',state:'distrito-federal',tag:'Rock',era:'Anos 1980 em diante',tone:'#8296A0',bio:'Banda surgida em Brasília que cresceu a partir da energia do circuito local de rock e alcançou o público nacional.',work:'Música Urbana',curiosity:'Parte de sua formação artística se conecta à cena em torno do Aborto Elétrico.',source:'https://www.cl.df.gov.br/proposicao/-/documentos/PL_526_2023'},
  {id:'plebe',name:'Plebe Rude',state:'distrito-federal',tag:'Punk rock',era:'Anos 1980 em diante',tone:'#728387',bio:'Banda formada no circuito do rock de Brasília, com letras e sonoridade associadas à juventude e ao punk brasileiro.',work:'Até Quando Esperar',curiosity:'A banda se formou em Brasília no início dos anos 1980.',source:'https://www.cl.df.gov.br/proposicao/-/documentos/PL_526_2023'},
];
export const instruments=[
  {id:'viola',name:'Viola caipira',tag:'Cordas dedilhadas',state:'Goiás e outras regiões',track:'viola',detail:'Instrumento de cordas frequentemente organizado em cinco ordens duplas. Aparece em modas de viola, catira e múltiplos repertórios.',how:'As cordas vibram e a caixa de ressonância amplifica o som.',curiosity:'Um mesmo instrumento pode acompanhar canções, solos e danças.'},
  {id:'cocho',name:'Viola de cocho',tag:'Cordas / saber artesanal',state:'Mato Grosso e Mato Grosso do Sul',track:'cocho',detail:'Instrumento artesanal tradicional de comunidades da Baixada Cuiabana e áreas vizinhas, associado ao cururu e ao siriri.',how:'A caixa é escavada em madeira; as cordas vibram sobre essa estrutura.',curiosity:'Seu modo de fazer integra o patrimônio cultural reconhecido pelo Iphan.'},
  {id:'sanfona',name:'Sanfona',tag:'Fole e palhetas',state:'Múltiplas regiões',track:'sanfona',detail:'Também chamada acordeão, aparece em repertórios populares e de fronteira, com diferentes tradições de execução.',how:'O ar do fole faz vibrar palhetas metálicas selecionadas pelos botões ou teclas.',curiosity:'O músico controla a intensidade do som movendo o fole.'},
  {id:'ganza',name:'Ganzá',tag:'Percussão',state:'Cururu e outras práticas',track:'ganza',detail:'Chocalho de percussão que participa de várias manifestações brasileiras, entre elas práticas da região cuiabana.',how:'Pequenos elementos em seu interior se chocam com a superfície durante o movimento.',curiosity:'O gesto de sacudir pode sustentar a pulsação de uma roda.'},
  {id:'reco',name:'Reco-reco',tag:'Percussão raspada',state:'Siriri e outras práticas',track:'reco',detail:'Instrumento de percussão usado para marcar padrões rítmicos em manifestações populares.',how:'Uma haste raspa uma superfície com sulcos e produz uma sequência de atritos.',curiosity:'Seu timbre depende do material, do formato e da velocidade da raspagem.'},
];
export const tracks={
 'intro':{title:'Trilha de abertura — Ecos do Centro-Oeste',artist:'Composição instrumental original · sem voz sintética',genre:'Introdução instrumental',url:'/audio/intro-trilha.mp3',note:'Trilha original de ambientação; o texto da introdução está disponível na tela. Para ter narração natural, grave uma pessoa e atualize o arquivo.'},
 'goias-demo':{title:'Caminhos de corda',artist:'Estudo sonoro original',genre:'Cordas sintetizadas',url:'/audio/paisagem-goias.mp3',note:'Composição didática sintetizada para a mostra; não é gravação regional ou de artista comercial.'},
 'mt-demo':{title:'Rios em pulso',artist:'Estudo sonoro original',genre:'Cordas e percussão sintetizadas',url:'/audio/paisagem-mato-grosso.mp3',note:'Composição didática original. Para ouvir cururu ou siriri reais, adicione gravações autorizadas.'},
 'ms-demo':{title:'Vento sobre as águas',artist:'Estudo sonoro original',genre:'Acordes sintetizados',url:'/audio/paisagem-mato-grosso-do-sul.mp3',note:'Composição didática original; não reproduz uma performance tradicional de chamamé.'},
 'df-demo':{title:'Cidade em movimento',artist:'Estudo sonoro original',genre:'Riff sintetizado',url:'/audio/paisagem-distrito-federal.mp3',note:'Composição didática original, inspirada apenas na ideia de um riff. Não contém música de bandas comerciais.'},
 viola:{title:'Cordas dedilhadas — demonstração',artist:'Síntese didática',genre:'Cordas',url:'/audio/viola-caipira.mp3',note:'Áudio sintetizado. Não é a gravação de uma viola caipira real.'},
 cocho:{title:'Cordas graves — demonstração',artist:'Síntese didática',genre:'Cordas e pulso',url:'/audio/viola-cocho.mp3',note:'Síntese didática. Não substitui a escuta de mestres da viola de cocho.'},
 sanfona:{title:'Fole — demonstração',artist:'Síntese didática',genre:'Teclas e palhetas',url:'/audio/sanfona.mp3',note:'Simulação eletrônica do efeito de notas sustentadas; não é um acordeão gravado.'},
 ganza:{title:'Pulso de chocalho — demonstração',artist:'Síntese didática',genre:'Percussão',url:'/audio/ganza.mp3',note:'Ruído sintetizado para demonstrar o princípio rítmico de um chocalho.'},
 reco:{title:'Raspagem — demonstração',artist:'Síntese didática',genre:'Percussão',url:'/audio/reco-reco.mp3',note:'Ruído sintetizado para demonstrar a ideia da percussão raspada.'},
};
export const timeline=[
 {date:'Antes dos discos',kind:'Memória viva',headline:'A música já estava aqui.',description:'Cantos, saberes, festas e formas de transmissão oral existem muito antes da gravação comercial. São diversas tradições, não uma origem única.',state:null},
 {date:'Século XX',kind:'Circulação',headline:'A viola encontra novos caminhos.',description:'Gravações e rádios ampliam a circulação da música caipira e de repertórios do interior, ao lado de muitas tradições locais.',state:'goias'},
 {date:'1960',kind:'Novo território urbano',headline:'Brasília entra em cena.',description:'A inauguração da capital federal cria novos espaços de convivência, deslocamentos e intercâmbios culturais.',state:'distrito-federal'},
 {date:'1985',kind:'Rock e MPB',headline:'Vozes ganham o país.',description:'Legião Urbana lança seu álbum de estreia. No mesmo ano, Tetê Espíndola vence o Festival dos Festivais com “Escrito nas Estrelas”.',state:'distrito-federal'},
 {date:'1991',kind:'Sertanejo popular',headline:'Uma canção alcança milhões.',description:'“É o Amor” marca a projeção nacional de Zezé Di Camargo & Luciano e uma fase de grande expansão comercial do sertanejo.',state:'goias'},
 {date:'2005',kind:'Patrimônio cultural',headline:'Um saber é reconhecido.',description:'O Iphan registra o modo de fazer a viola de cocho, praticado em Mato Grosso e Mato Grosso do Sul.',state:'mato-grosso'},
 {date:'2016',kind:'Nova geração',headline:'Outras narrativas assumem o palco.',description:'A popularidade de Marília Mendonça impulsiona novas conversas sobre perspectivas femininas no sertanejo.',state:'goias'},
 {date:'Hoje',kind:'Culturas em movimento',headline:'A próxima nota ainda está sendo tocada.',description:'Artistas, mestres e coletivos continuam criando, transmitindo e transformando suas formas de expressão.',state:null},
];
export const quiz=[
 {question:'Qual instrumento é feito a partir de madeira escavada e se liga ao cururu e ao siriri?',track:'cocho',options:['Viola de cocho','Sanfona','Bateria eletrônica'],answer:0,explanation:'A viola de cocho tem sua caixa talhada na madeira e faz parte de saberes reconhecidos pelo Iphan.'},
 {question:'Qual demonstração lembra o princípio de um chocalho?',track:'ganza',options:['Violão','Ganzá','Piano'],answer:1,explanation:'O ganzá produz som quando partículas internas se chocam com o corpo do instrumento.'},
 {question:'Que instrumento usa o movimento de um fole para acionar palhetas?',track:'sanfona',options:['Reco-reco','Viola caipira','Sanfona'],answer:2,explanation:'Na sanfona, o ar movimentado pelo fole faz as palhetas vibrarem.'},
 {question:'Qual instrumento gera padrões por meio de uma raspagem?',track:'reco',options:['Reco-reco','Ganzá','Acordeão'],answer:0,explanation:'Uma haste esfregada em uma superfície com sulcos produz os sons do reco-reco.'},
];
export const sources=[
 {title:'IBGE Educa — Divisão territorial',url:'https://educa.ibge.gov.br/jovens/conheca-o-brasil/territorio/19637-divisao-territorial.html'},
 {title:'Iphan — Patrimônio imaterial em Mato Grosso',url:'https://www.gov.br/iphan/pt-br/superintendencias/mato-grosso/patrimonio-imaterial'},
 {title:'Iphan — Modo de fazer Viola-de-Cocho (registro 2005)',url:'https://bcr.iphan.gov.br/bens-culturais/modo-de-fazer-viola-de-cocho/'},
 {title:'Iphan — Patrimônio imaterial em Mato Grosso do Sul',url:'https://www.gov.br/iphan/pt-br/superintendencias/mato-grosso-do-sul/patrimonio-imaterial'},
 {title:'Governo de Goiás — trajetória de Marília Mendonça',url:'https://agencia.go.gov.br/lancada-em-goiania-serie-documental-sobre-cantora-marilia-mendonca/'},
 {title:'Site oficial — Zezé Di Camargo & Luciano',url:'https://zezedicamargoeluciano.com.br/'},
 {title:'Sesc SP — Tetê Espíndola',url:'https://www.sescsp.org.br/editorial/tete-espindola-a-cantora-com-passaros-na-garganta/'},
 {title:'Correio Braziliense — Brasília capital do rock',url:'https://www.correiobraziliense.com.br/app/noticia/especiais/brasilia-capital-do-rock/2013/03/05/dialogarparaliderar,352823/veja-como-o-correio-braziliense-contou-a-historia-do-rock-de-brasilia.shtml'},
 {title:'Câmara Legislativa do DF — História do rock de Brasília',url:'https://www.cl.df.gov.br/proposicao/-/documentos/PL_526_2023'},
];
