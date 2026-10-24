# ECOS DO CENTRO-OESTE
## Museu Musical Digital Interativo — Mostra Cultural SENAC Mediotec

> **Cada canto tem uma história. Cada história tem um som.**

Experiência audiovisual educativa, desenvolvida para receber visitantes em computadores com fones de ouvido. Apresenta Goiás, Mato Grosso, Mato Grosso do Sul e Distrito Federal, com mapa interativo, estações culturais, linha do tempo, galeria de artistas, coleção de instrumentos, escuta e jogo de perguntas.

### 1. Como abrir o site

**Você precisa de:** Node.js 18 ou superior (recomendado 20+), npm e um navegador moderno (Firefox, Chrome, Edge).

Abra o terminal na pasta `ecos-centro-oeste` e execute:

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal, geralmente **http://localhost:5173**.

Para abrir em outro notebook/celular da **mesma rede local**, use o endereço de rede que o Vite mostrar, desde que o firewall permita. Não é necessário hospedar o projeto.

**Importante:** abrir `index.html` diretamente por duplo clique não executa esta versão React/Vite. Use os comandos acima ou gere uma versão estática como explicado a seguir.

### 2. Versão de exposição (recomendada)

Instale as dependências uma vez e crie a distribuição:

```bash
npm install
npm run build
npm run preview
```

O `build` cria a pasta `dist/`, que contém o site já compilado. A pasta `dist/` pode ser copiada para outros computadores e servida por qualquer servidor HTTP local. **Não exige acesso à internet** para imagens, textos, navegação e os áudios originais fornecidos. As fontes tipográficas da web são opcionais e, sem conexão, serão substituídas automaticamente por fontes disponíveis no computador.

Uma alternativa, se o computador tiver Python instalado:

```bash
cd dist
python3 -m http.server 8000
```

Abra **http://localhost:8000**.

Use o botão de **tela cheia** no topo ou a tecla **F11** do navegador para a Mostra Cultural.

### 3. Como fazer a visita

1. Visitante coloca o fone e clica em **Iniciar viagem sonora**.
2. A introdução apresenta as várias tradições, com narração opcional por voz do navegador e transcrição.
3. O mapa permite explorar os quatro territórios. Passe o mouse, clique ou use Tab + Enter.
4. Cada estação apresenta expressões culturais, curiosidades, marcos, artistas e um áudio demonstrativo funcional.
5. O visitante pode seguir pela linha do tempo, galeria e coleção de instrumentos.
6. O quiz opcional oferece quatro questões com áudio real, resposta e explicação.
7. Em **Explorar novamente** ou **Reiniciar visita**, a reprodução para e o museu volta ao começo.

O site tem navegação livre pelo menu superior. Funciona também em telas menores.

### 4. Áudios: o que está incluído e como substituir

**Os arquivos WAV incluídos são sons originais criados por síntese para testar e demonstrar a experiência. Não são gravações etnográficas, interpretações autênticas de viola, siriri ou chamamé, nem trechos de músicas de artistas comerciais.** Essa informação aparece claramente na interface.

Estão em `public/audio/`:

- `paisagem-goias.wav`, `paisagem-mato-grosso.wav`, `paisagem-mato-grosso-do-sul.wav`, `paisagem-distrito-federal.wav`: quatro estudos originais para as estações.
- `viola-caipira.wav`, `viola-cocho.wav`, `sanfona.wav`, `ganza.wav`, `reco-reco.wav`: cinco amostras sintéticas ilustrativas usadas nos instrumentos e no quiz.

Para substituir por **áudios de gravações autorizadas**:

1. Copie seu arquivo `.mp3`, `.ogg` ou `.wav` para `public/audio/`.
2. Abra `src/data/content.js`.
3. Na constante `tracks`, encontre a entrada correspondente e altere o campo `url`, por exemplo: `url:'/audio/viola-real-autorizada.mp3'`.
4. Atualize `title`, `artist`, `genre` e `note` com os créditos reais, licença/autorização e contexto da obra.
5. Salve. No modo `npm run dev`, a alteração aparece no site; para a versão de exposição, rode novamente `npm run build`.

**Não copie músicas comerciais de serviços de streaming nem redistribua gravações sem autorização.** Para uma mostra escolar, dê preferência a arquivos de autoria do grupo, registros cedidos pelas comunidades, gravações com licença adequada ou links oficiais externos. Em caso de autorização para execução pública, verifique também as regras aplicáveis à exposição.

O reprodutor global tem reproduzir/pausar, barra de progresso, volume e avançar/voltar entre as quatro paisagens da playlist. Só há um áudio ativo por vez.

### 5. Imagens e fotografias

Os arquivos estão em `public/images/`. Incluem:

- `cerrado-por-do-sol.jpg`: cenário cinematográfico original, criado especialmente para este site, **não** fotografia documental de um lugar específico.
- `goias.jpg`, `mato-grosso.jpg`, `mato-grosso-do-sul.jpg`, `distrito-federal.jpg`: ilustrações editoriais originais, **não** fotografias históricas.

As fichas de artistas foram criadas em estilo gráfico para evitar uso de retratos sem licença. Para inserir uma fotografia autorizada de um artista:

1. Crie `public/images/artistas/` e coloque a imagem em JPG/PNG/WebP.
2. Abra `src/data/content.js`, localize o artista em `artists` e adicione `photo:'/images/artistas/foto-autorizada.jpg'`.
3. Mantenha os créditos/licenças no texto da ficha ou no material de créditos do projeto.

A galeria usará automaticamente a foto fornecida. Preserve direitos autorais, imagem e atribuição.

### 6. Como editar conteúdo

O arquivo central é **`src/data/content.js`**:

| Seção do conteúdo | Variável |
|---|---|
| Quatro territórios | `states` |
| Artistas e grupos | `artists` |
| Instrumentos | `instruments` |
| Player e amostras | `tracks` |
| Linha do tempo | `timeline` |
| Quiz | `quiz` |
| Fontes | `sources` |

Os quatro capítulos de território são gerados a partir do mesmo componente, facilitando manutenção. O design principal está em `src/styles.css` e os elementos visuais SVG em `src/components/Illustrations.jsx`.

A personalização principal usa estas cores:

| Cor | Hex |
|---|---|
| Marrom profundo | `#43271D` |
| Terracota | `#A84F2B` |
| Dourado | `#D99D42` |
| Verde Cerrado | `#687750` |
| Bege areia | `#F1E4C8` |
| Creme claro | `#FAF3E6` |

### 7. Acessibilidade e operação presencial

- Navegação com mouse e teclado, focos visíveis, descrições de imagens, controles e texto alternativo.
- Mapa clicável e acessível por Tab + Enter/Espaço.
- Redução de animações pelo botão superior e respeito a `prefers-reduced-motion`.
- Ajuste de volume; opção de silenciar; narração não inicia automaticamente.
- Informações educativas não dependem de escutar o áudio.
- Quiz pulável e sem limite de tempo.
- **Reiniciar visita** interrompe áudio e narração, desfaz estado do jogo e devolve a tela inicial.
- Ideal para rodar em Firefox/Chrome com Zoom em 100%, resolução mínima recomendada de 1366×768 e um fone por estação.

**Teste antes de abrir a mostra:** navegador, áudio do sistema, fones, volume, telas, arquivos de música autorizados, Internet desnecessária, e o fluxo completo de reinício.

### 8. Fontes utilizadas na pesquisa

Consulte os links no final da experiência e a variável `sources` de `src/data/content.js`. As fontes incluem IBGE Educa, Iphan (patrimônio imaterial de MT/MS e registro da viola de cocho), Governo de Goiás, Sesc São Paulo, acervos sobre o rock brasiliense e site oficial da dupla Zezé Di Camargo & Luciano. Os textos foram redigidos de forma resumida para a Mostra Cultural, distinguindo manifestações, estilos, artistas e territórios.

### 9. Estrutura técnica

```text
ecos-centro-oeste/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── audio/              # 9 estudos sonoros WAV originais
│   └── images/             # cenários e ilustrações originais
└── src/
    ├── main.jsx
    ├── App.jsx              # telas, estados, navegação, player, quiz
    ├── styles.css          # identidade visual e responsividade
    ├── components/
    │   └── Illustrations.jsx
    └── data/
        └── content.js      # conteúdo histórico e mídias editáveis
```

Tecnologias: React 18, Vite, JavaScript, CSS e Lucide React. Não há API, login, banco de dados nem envio de dados pessoais.

**Nota de escopo:** O museu é um projeto educativo e uma experiência digital original. As paisagens e os painéis visuais incluídos são arte criada para a exposição; não devem ser apresentados como fotografias ou registros históricos dos artistas e comunidades. Para uma versão com fotografias documentais e fonogramas reais, o grupo precisa inserir materiais com direitos de uso verificados.

---

**Mostra Cultural SENAC Mediotec** · Música Brasileira — Região Centro-Oeste · Projeto Ecos do Centro-Oeste
