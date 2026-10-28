// ECOS — Acervo visual. Apenas fotografias com uma página de licenciamento consultada.
// Fotos externas dependem de internet. Pode substituir por caminho local /images/... .
// Wikimedia Commons usa uma URL estável de redirecionamento ao arquivo correspondente.
const commons = (name) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}`;
const page = (name) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name)}`;

export const artistArchive = {
  zeze: {file:'Zezé di Camargo e Luciano.jpg',credit:'Antônio Cruz / Agência Brasil',license:'CC BY 3.0 BR'},
  marilia: {file:'Marilia Mendonca 2019.jpg',credit:'Record Goiás',license:'CC BY 3.0'},
  flor: {file:'Flor Ribeirinha.jpg',credit:'Juliana Evellyn',license:'CC0'},
  almir: {file:'Almir Sater.jpg',credit:'Cesarpedia',license:'CC0'},
  tete: {file:'Tetê Espíndola - Ministério da Cultura - (128).jpg',credit:'Ministério da Cultura',license:'consulte a fonte'},
  legiao: {file:'Legião Urbana com Wagner Moura.jpg',credit:'Foto de apresentação posterior à formação original',license:'CC BY 2.0',note:'Registro de outra fase do grupo; não representa a formação clássica.'},
  capital: {file:'Capital Inicial.jpg',credit:'Roni1986',license:'CC BY-SA (ver fonte)'},
  plebe: {file:'Plebe rude 017.jpg',credit:'Registro de show',license:'CC BY-SA 2.5'},
  // Helena Meirelles: sem foto de licença confirmada, mantém a arte atual.
};

export const instrumentArchive = {
  viola: {file:'Viola Caipira.jpg',credit:'Gleysielle de Aquino',license:'CC BY-SA 4.0',action:'As cordas são dedilhadas ou ponteadas em pares, produzindo melodias e acompanhamento.'},
  cocho: {file:'Violadecocho.jpg',credit:'Brazdaviola',license:'Domínio público',action:'O instrumentista toca as cordas de uma caixa escavada na madeira, em rodas de cururu e siriri.'},
  sanfona: {file:'Acordeón.jpg',credit:'Xinzo.lvp',license:'CC BY-SA 4.0',action:'Ao abrir e fechar o fole, o músico controla o ar que faz vibrar as palhetas.'},
  ganza: {file:'Ganza 20cm.JPG',credit:'Alno',license:'CC BY-SA 3.0',action:'Sacudir o chocalho desloca pequenas partículas que marcam o ritmo.'},
  reco: {file:'Reco-reco metal.JPG',credit:'Alno',license:'CC BY-SA 3.0',action:'A baqueta raspa uma superfície estriada, criando ataques rítmicos sucessivos.'},
};

export const archiveUrl = (record) => record ? (record.local || commons(record.file)) : '';
export const archivePage = (record) => record ? page(record.file) : '';
