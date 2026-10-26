import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, AudioLines, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Compass, Disc3, ExternalLink, Headphones, Info, Maximize2, Menu, Mic2, Music2, Pause, Play, RotateCcw, SkipBack, SkipForward, SlidersHorizontal, Volume2, VolumeX, X, MoveUpRight, Captions } from 'lucide-react';
import { states, artists, instruments, tracks, timeline, quiz, sources } from './data/content';
import { SoundWave, RecordArt, InstrumentArt, RegionMap } from './components/Illustrations';

const asset=(p)=>`${import.meta.env.BASE_URL}${p.replace(/^\//,'')}`;
const routeFromHash=()=>{const hash=decodeURIComponent(location.hash.slice(1)); if(hash.startsWith('state/'))return {page:'state',id:hash.substring(6)}; return {page: ['home','intro','map','timeline','artists','instruments','quiz','final'].includes(hash)?hash:'home'};};
const mainPages=['home','intro','map','timeline','artists','instruments','quiz','final'];
const labels={home:'Início',intro:'Introdução',map:'Explorar',state:'Território',timeline:'Linha do tempo',artists:'Artistas',instruments:'Instrumentos',quiz:'Quiz',final:'Encerramento'};
const zero=(n)=>String(Math.floor(Number.isFinite(n)?n:0)).padStart(2,'0');
const duration=(s)=>`${zero((s||0)/60)}:${zero((s||0)%60)}`;

function SmallLabel({children,light=false}){return <div className={`eyebrow ${light?'eyebrow-light':''}`}><span className="eyebrow-mark"/>{children}</div>}
function Brand({onClick}){return <button className="brand" onClick={onClick} aria-label="Ir para o início"><span className="brand-symbol"><AudioLines size={27} strokeWidth={1.65}/></span><span className="brand-type">ECOS <small>DO CENTRO-OESTE</small></span></button>}
function FancyArrow({light=false}){return <span className={`arrow-round ${light?'light':''}`}><ArrowRight size={19}/></span>}
function SectionIntro({chapter,kicker,title,description}) { return <header className="section-intro"><div className="section-overline"><SmallLabel>{kicker}</SmallLabel><span>{chapter}</span></div><h1 className="display-title">{title}</h1><p>{description}</p></header> }

// ECOS_SPOTIFY_ARTISTAS_2026 — faixas oficiais incorporadas sem armazenar arquivos comerciais.
const museumSongs = {
  zeze: { title: 'É o Amor', id: '2UchMkUxan22i7cHTbUjLp' },
  marilia: { title: 'Infiel', id: '6UYrC5DlTARibZ62U1r59K' },
  flor: { title: 'Siriri: Quebrando Milho', id: '1vp1adPEvUey0sXMAWfL3L' },
  almir: { title: 'Tocando em Frente', id: '3ZRRIlSvOctKY5NqlRESgA' },
  helena: { title: 'Quatro Horas da Madrugada', id: '0qrOMKe7GBUtPcWfQ9QTu8' },
  tete: { title: 'Escrito nas Estrelas', id: '4OUzN70Gf32FUhm0U5FipL' },
  legiao: { title: 'Tempo Perdido', id: '3p71m3r3cFSiatmxrtywHo' },
  capital: { title: 'Primeiros Erros (Chove) — ao vivo', id: '1UmZ5x2HiFs8rqVFTOo0Xm' },
  plebe: { title: 'Até Quando Esperar', id: '4qXPxKH9dljeTvLuI6jMB0' },
};

function ArtistListening({ artist }) {
  const song = museumSongs[artist.id];
  if (!song) return null;
  const songUrl = `https://open.spotify.com/track/${song.id}`;
  return (
    <section className="artist-listening" aria-label={`Escuta oficial: ${artist.name}`}>
      <div className="artist-listening-head">
        <span>ESTAÇÃO DE ESCUTA · ACERVO MUSICAL</span>
        <h3>Ouça a voz desta história.</h3>
        <p>{song.title} · {artist.name}</p>
      </div>
      <iframe
        key={artist.id}
        title={`Spotify — ${song.title}, ${artist.name}`}
        src={`https://open.spotify.com/embed/track/${song.id}?utm_source=generator`}
        width="100%"
        height="152"
        style={{ border: 0, display: 'block', borderRadius: '12px' }}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <div className="artist-listening-bottom">
        <p>Reprodução oficial via Spotify. Requer internet; conforme a conta e a faixa, pode tocar só uma prévia.</p>
        <a href={songUrl} target="_blank" rel="noopener noreferrer">ABRIR NO SPOTIFY ↗</a>
      </div>
    </section>
  );
}

export default function App(){
 const [route,setRoute]=useState(routeFromHash);
 const [menuOpen,setMenuOpen]=useState(false);
 const [reduceMotion,setReduceMotion]=useState(()=>localStorage.getItem('ecos-reduce-motion')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [muted,setMuted]=useState(false);
 const [activeTrack,setActiveTrack]=useState(null),[playing,setPlaying]=useState(false),[audioError,setAudioError]=useState(false);
 const [currentTime,setCurrentTime]=useState(0),[audioLength,setAudioLength]=useState(0),[volume,setVolume]=useState(.74);
 const [featuredRegion,setFeaturedRegion]=useState('mato-grosso');
 const [selectedEra,setSelectedEra]=useState(0);
 const [artistFilter,setArtistFilter]=useState('all'),[selectedArtist,setSelectedArtist]=useState(null);
 const [selectedInstrument,setSelectedInstrument]=useState('cocho');
 const [quizIndex,setQuizIndex]=useState(0),[quizChoice,setQuizChoice]=useState(null),[score,setScore]=useState(0),[quizDone,setQuizDone]=useState(false);
 const [fullscreen,setFullscreen]=useState(false);
 const audioRef=useRef(null), mainRef=useRef(null);

 useEffect(()=>{const onHash=()=>{setRoute(routeFromHash());setMenuOpen(false);window.scrollTo({top:0,behavior:'instant'})};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash)},[]);
 useEffect(()=>{document.documentElement.classList.toggle('reduced-motion',reduceMotion);localStorage.setItem('ecos-reduce-motion',reduceMotion?'1':'0')},[reduceMotion]);
 useEffect(()=>{if(audioRef.current) audioRef.current.volume=volume},[volume]);
 useEffect(()=>{
  if(audioRef.current) audioRef.current.muted = muted;
},[muted]);
 useEffect(()=>{const onKey=(e)=>{if(e.key==='Escape'){setSelectedArtist(null);setMenuOpen(false);stopNarration()}};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)},[activeTrack]);
 useEffect(()=>{const onFullscreen=()=>setFullscreen(Boolean(document.fullscreenElement));document.addEventListener('fullscreenchange',onFullscreen);return()=>document.removeEventListener('fullscreenchange',onFullscreen)},[]);
 useEffect(()=>{document.title=`${labels[route.page]} | Ecos do Centro-Oeste`},[route]);
const navigate=(page,id)=>{
  const target=page==='state' ? `state/${id}` : page;
  // Ao deixar a introdução, a trilha inicial para; outras faixas seguem no player.
  if (activeTrack === 'intro' && page !== 'intro') stopAudio();
  if(location.hash!==`#${target}`){
    location.hash=target;
  } else {
    setRoute(routeFromHash());
    window.scrollTo({top:0,behavior:'smooth'});
  }
  setMenuOpen(false);
};
 const stopAudio = () => {
  const audio = audioRef.current;
  if (audio) {
   audio.pause();
   audio.removeAttribute('src');
   audio.load();
  }
  setActiveTrack(null);
  setPlaying(false);
  setCurrentTime(0);
  setAudioLength(0);
  setAudioError(false);
 };

 const stopNarration = () => {
  if (activeTrack === 'intro') stopAudio();
 };

 const reset = () => {
  stopAudio();
  setQuizIndex(0);
  setQuizChoice(null);
  setScore(0);
  setQuizDone(false);
  setSelectedArtist(null);
  setArtistFilter('all');
  setSelectedEra(0);
  setFeaturedRegion('mato-grosso');
  navigate('home');
 };

 const playTrack = async (id) => {
  const item = tracks[id];
  const audio = audioRef.current;
  if (!item || !audio) return;

  setAudioError(false);
  if (activeTrack === id) {
   if (audio.paused) {
    try { await audio.play(); } catch { setPlaying(false); setAudioError(true); }
   } else {
    audio.pause();
   }
   return;
  }

  audio.pause();
  audio.src = asset(item.url);
  audio.load();
  setActiveTrack(id);
  setCurrentTime(0);
  setAudioLength(0);
  if (muted) {
   setMuted(false);
   audio.muted = false;
  }
  try {
   await audio.play();
  } catch {
   setPlaying(false);
   setAudioError(true);
  }
 };

 // Abertura usa trilha instrumental local, sem voz sintetizada.
 const toggleNarration = () => playTrack('intro');

 const selectInstrument = (id) => {
  setSelectedInstrument(id);
  if (window.innerWidth <= 1350) {
   window.requestAnimationFrame(() => {
    document.getElementById('instrument-detail')?.scrollIntoView({
     behavior: reduceMotion ? 'auto' : 'smooth',
     block: 'start'
    });
   });
  }
 };
 const doFullscreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{/* browsers may disallow fullscreen */}};
 const progressMap={home:0,intro:1,map:2,state:3,timeline:4,artists:5,instruments:6,quiz:7,final:8};
 const routeState=states.find(s=>s.id===route.id)||states[0];
 const featured=states.find(s=>s.id===featuredRegion)||states[0];
 const selectedI=instruments.find(i=>i.id===selectedInstrument)||instruments[0];
 const filteredArtists=artistFilter==='all'?artists:artists.filter(a=>a.state===artistFilter);
 const quizQuestion=quiz[quizIndex];
 const currentTrack=activeTrack?tracks[activeTrack]:null;
 const guide=mainPages.filter(k=>k!=='home');
 const playlistIds=['goias-demo','mt-demo','ms-demo','df-demo'];
 const inPlaylist=playlistIds.includes(activeTrack);
 const narrating=playing && activeTrack==='intro';
 const changeTrack=(delta)=>{const i=playlistIds.indexOf(activeTrack);if(i!==-1)playTrack(playlistIds[(i+delta+playlistIds.length)%playlistIds.length]);};
  useEffect(() => {
    if (selectedArtist && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
  }, [selectedArtist]);


 return <div className={`app-shell ${route.page==='home'?'at-home':''}`}>
  <a href="#main" className="skip-link">Pular para o conteúdo</a>
  <audio
   ref={audioRef}
   preload="metadata"
   onPlay={()=>setPlaying(true)}
   onPause={()=>setPlaying(false)}
   onTimeUpdate={e=>setCurrentTime(e.currentTarget.currentTime)}
   onLoadedMetadata={e=>setAudioLength(e.currentTarget.duration||0)}
   onEnded={()=>setPlaying(false)}
   onError={()=>{ if(activeTrack) { setAudioError(true); setPlaying(false); } }}
  />
  <header className={`site-header ${route.page==='home'?'home-header':''}`}>
    <div className="header-container"><Brand onClick={()=>navigate('home')} />
    <nav className="desktop-nav" aria-label="Navegação principal">
      {['home','map','timeline','artists','instruments'].map(p=><button key={p} onClick={()=>navigate(p)} className={(route.page===p||(p==='map'&&route.page==='state'))?'active':''}>{labels[p]}</button>)}
    </nav>
    <div className="header-actions">
      <button className="icon-button sound-button" onClick={()=>setMuted(!muted)} aria-label={muted?'Ativar áudio':'Silenciar áudio'} title={muted?'Ativar som':'Silenciar som'}>{muted?<VolumeX size={19}/>:<Volume2 size={19}/>}</button>
      <button className="icon-button" onClick={()=>setReduceMotion(!reduceMotion)} title="Alternar animações" aria-label={reduceMotion?'Ativar animações':'Reduzir animações'}><SlidersHorizontal size={19}/></button>
      <button className="icon-button fullscreen-button" onClick={doFullscreen} title="Modo exposição em tela cheia" aria-label={fullscreen?'Sair da tela cheia':'Ativar tela cheia'}><Maximize2 size={18}/></button>
      <button className="icon-button mobile-menu" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button>
      <span className="header-index">{String(progressMap[route.page]+1).padStart(2,'0')} / 09</span>
    </div></div>
    {menuOpen&&<nav className="mobile-nav" aria-label="Menu compacto">{['home','intro','map','timeline','artists','instruments','quiz','final'].map(p=><button key={p} onClick={()=>navigate(p)}>{labels[p]} <ArrowRight size={17}/></button>)}<button onClick={reset}>Reiniciar visita <RotateCcw size={17}/></button></nav>}
  </header>
  <div className="journey-track" aria-hidden="true"><span style={{width:`${progressMap[route.page]/8*100}%`}}/></div>
  <main id="main" ref={mainRef} tabIndex="-1">
   {route.page==='home'&&<>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-photo" role="img" aria-label="Paisagem cinematográfica criada para o projeto: Cerrado ao pôr do sol com árvore e horizonte dourado" />
      <div className="hero-grain" aria-hidden="true"/>
      <div className="hero-content container">
        <div className="hero-copy"><SmallLabel light>MUSEU MUSICAL INTERATIVO — REGIÃO CENTRO-OESTE</SmallLabel>
        <h1 id="hero-title">ECOS <em>DO</em><br/>CENTRO-OESTE<span className="hero-dot">.</span></h1>
        <div className="hero-quote">Cada canto tem uma história.<br/>Cada história tem um som.</div>
        <p>Das rodas de viola aos palcos do rock, uma viagem pelas vozes, paisagens e memórias que fazem o coração do Brasil pulsar.</p>
        <button className="button-primary button-large" onClick={()=>navigate('intro')}>INICIAR VIAGEM SONORA <ArrowRight size={20}/></button>
        <div className="headphone-note"><Headphones size={22} strokeWidth={1.6}/><span>Para uma melhor experiência,<br/>coloque seus fones de ouvido.</span></div>
        </div>
        <div className="hero-vertical"><span>16° S · 53° O</span><span>UMA EXPERIÊNCIA DE ESCUTA</span></div>
      </div>
      <div className="hero-bottom container"><span>EXPOSIÇÃO CULTURAL · SENAC MEDIOTEC</span><span className="scroll-suggestion">DESCUBRA OS SONS DO BRASIL <ChevronDown size={19}/></span><span>VISITA • 5–8 MIN</span></div>
    </section>
    <section className="home-after container"><SmallLabel>O QUE TE ESPERA</SmallLabel><div className="home-after-grid"><h2>Um Brasil.<br/><em>Muitas formas de ouvir.</em></h2><div><p>Quatro territórios, vozes marcantes, instrumentos e histórias que se encontram. A próxima descoberta começa com um clique.</p><button className="text-link" onClick={()=>navigate('map')}>IR DIRETO AO MAPA <ArrowRight size={18}/></button></div></div></section>
   </>}

   {route.page==='intro'&&<>
    <section className="intro-scene paper-scene"><div className="container intro-grid">
      <div className="intro-copy"><SmallLabel>CAPÍTULO 01 — O ENCONTRO</SmallLabel><h1 className="display-title">UM TERRITÓRIO.<br/><em>MUITAS VOZES.</em></h1>
       <p className="intro-lead">No coração do Brasil, a música se faz de encontros. Cada estrada, cidade, rio e comunidade carrega uma maneira própria de cantar e de contar histórias.</p>
       <p>Tradições indígenas, afro-brasileiras, europeias, rurais, urbanas e fronteiriças participam dessa diversidade — com histórias diferentes, que merecem ser ouvidas sem serem reduzidas a um único som.</p>
       <div className="narration-box"><div className="narration-icon"><Mic2 size={21}/></div><div><strong>Ouça o som desta história</strong><span>Trilha instrumental · leia a apresentação abaixo</span></div><button className="round-play" onClick={toggleNarration} aria-label={narrating?'Pausar trilha de abertura':'Ouvir trilha de abertura'}>{narrating?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor"/>}</button></div>
       <details className="transcript"><summary><Captions size={16}/> LER O CONTEXTO DA INTRODUÇÃO <ChevronDown size={15}/></summary><p>O Centro-Oeste é um território de muitas vozes. Das tradições indígenas e afro-brasileiras às culturas rurais, fronteiriças e urbanas, seus sons contam histórias diversas. Em Goiás, a viola e o sertanejo. Em Mato Grosso, cururu e siriri. Em Mato Grosso do Sul, música pantaneira e chamamé. No Distrito Federal, uma cena urbana que fez história.</p></details>
       <button className="button-primary" onClick={()=>navigate('map')}>CONHECER OS SONS DA REGIÃO <ArrowRight size={18}/></button>
      </div>
      <div className="intro-collage"><div className="intro-large-img"><img src={asset('/images/cerrado-por-do-sol.jpg')} alt="Paisagem criada de Cerrado ao entardecer"/></div><div className="intro-patch"><span>04</span><small>TERRITÓRIOS</small></div><div className="intro-artline"><SoundWave/></div><div className="intro-mini-img"><img src={asset('/images/mato-grosso.jpg')} alt="Ilustração de paisagem com rio"/></div><div className="intro-stamp">O SOM<br/>TAMBÉM<br/>É MEMÓRIA.</div></div>
    </div></section>
    <section className="intro-strip"><div className="container"><span>UM MAPA, QUATRO UNIVERSOS</span><div className="intro-regions">{states.map(s=><button key={s.id} onClick={()=>navigate('state',s.id)}><span>{s.code}</span> {s.title} <MoveUpRight size={17}/></button>)}</div></div></section>
   </>}

   {route.page==='map'&&<section className="map-scene dark-scene"><div className="container map-layout">
     <div className="map-info"><SmallLabel light>CAPÍTULO 02 — O TERRITÓRIO</SmallLabel><h1 className="display-title">OS SONS<br/>TÊM <em>ENDEREÇO.</em></h1><p>Uma região, quatro territórios e inúmeras maneiras de fazer música. Escolha um ponto do mapa e descubra o que ele tem para contar.</p>
      <div className="map-region-list">{states.map(s=><button className={featuredRegion===s.id?'current':''} key={s.id} onClick={()=>navigate('state',s.id)} onMouseEnter={()=>setFeaturedRegion(s.id)} onFocus={()=>setFeaturedRegion(s.id)}><span className="region-index">{s.number}</span><span>{s.title}<small>{s.short}</small></span><ArrowRight size={18}/></button>)}</div>
     </div>
     <div className="map-visual"><div className="map-compass"><Compass size={23}/><span>MAPA CULTURAL · ILUSTRATIVO</span></div><RegionMap active={featuredRegion} onFocusRegion={setFeaturedRegion} onSelect={id=>navigate('state',id)} />
       <div className="map-card"><img src={asset(featured.image)} alt={featured.imageAlt} /><div className="map-card-text"><span>{featured.code} / NO CORAÇÃO DO BRASIL</span><h2>{featured.title}</h2><p>{featured.short}</p><button className="text-link" onClick={()=>navigate('state',featured.id)}>EXPLORAR ESSE TERRITÓRIO <ArrowRight size={17}/></button></div></div>
     </div>
   </div></section>}

   {route.page==='state'&&<>
    <section className="state-hero"><img className="state-hero-image" src={asset(routeState.image)} alt={routeState.imageAlt}/><div className="state-overlay"/><div className="container state-hero-inner"><button className="breadcrumb" onClick={()=>navigate('map')}><ArrowLeft size={18}/> VOLTAR AO MAPA</button><SmallLabel light>ESTAÇÃO {routeState.number} / {routeState.code}</SmallLabel><h1 className="display-title">{routeState.title.toUpperCase()}</h1><p>{routeState.tagline}</p><div className="state-hero-foot"><span>UM TERRITÓRIO. MUITAS CAMADAS SONORAS.</span><SoundWave count={26}/></div></div></section>
    <section className="state-content paper-scene"><div className="container">
      <div className="state-heading"><div><SmallLabel>O QUE ECOA POR AQUI</SmallLabel><h2 className="display-title">{routeState.subtitle}<span className="period">.</span></h2></div><p>Descubra manifestações culturais, pessoas e acontecimentos sem pressa. Os sons apresentados são estudos didáticos originais.</p></div>
      <div className="genres-grid">{routeState.genres.map((g,i)=><article className="genre-card" key={g.name}><span className="genre-number">0{i+1} <Disc3 size={18}/></span><div><small>{g.type}</small><h3>{g.name}</h3><p>{g.text}</p></div></article>)}</div>
      <div className="station-audio"><div className="station-vinyl"><RecordArt spinning={playing&&activeTrack===routeState.track}/></div><div className="station-listen"><SmallLabel>ESTAÇÃO DE ESCUTA</SmallLabel><h3>Uma paisagem para <em>ouvir.</em></h3><p>Este trecho foi criado para demonstrar a interação do museu. Não substitui gravações de artistas e comunidades reais.</p><div className="station-track-line"><span className="tiny-disc"><Music2 size={18}/></span><div><strong>{tracks[routeState.track].title}</strong><span>Estudo sonoro original · {tracks[routeState.track].genre}</span></div><button className="circle-action" onClick={()=>playTrack(routeState.track)} aria-label={(playing&&activeTrack===routeState.track)?'Pausar estudo sonoro':'Reproduzir estudo sonoro'}>{playing&&activeTrack===routeState.track?<Pause size={22} fill="currentColor"/>:<Play size={22} fill="currentColor"/>}</button></div></div></div>
      <div className="facts-grid"><div><SmallLabel>VOCÊ SABIA?</SmallLabel><blockquote>“{routeState.curiosity}”</blockquote><a href={routeState.source} target="_blank" rel="noreferrer" className="quiet-link">CONFERIR UMA FONTE <ExternalLink size={15}/></a></div><div><SmallLabel>PEQUENA HISTÓRIA</SmallLabel>{routeState.milestones.map((m,i)=><div className="local-history" key={i}><strong>{m.year}</strong><span>{m.label}</span></div>)}</div></div>
      <div className="state-people"><div><SmallLabel>AS VOZES DESSE TERRITÓRIO</SmallLabel><h2 className="display-title">Pessoas que deixam marcas.</h2></div><div className="state-artists">{routeState.artists.map(id=>{const a=artists.find(x=>x.id===id);return <button key={id} className="state-artist-card" onClick={()=>setSelectedArtist(a)}><span className="artist-circle" style={{background:a.tone}}><Mic2 size={24}/></span><span><strong>{a.name}</strong><small>{a.tag}</small></span><ArrowUpIcon/></button>})}</div></div>
      <div className="station-next"><button className="text-link" onClick={()=>navigate('map')}><ArrowLeft size={18}/> ESCOLHER OUTRO TERRITÓRIO</button><button className="button-primary" onClick={()=>navigate('timeline')}>CONTINUAR A VIAGEM <ArrowRight size={18}/></button></div>
    </div></section>
   </>}

   {route.page==='timeline'&&<section className="timeline-scene paper-scene"><div className="container"><SectionIntro chapter="CAPÍTULO 03 / 08" kicker="LINHA DO TEMPO" title={<>O TEMPO PASSA.<br/><em>A MÚSICA PERMANECE.</em></>} description="Das tradições transmitidas entre gerações aos palcos nacionais: alguns marcos de uma história que continua sendo escrita."/>
     <div className="timeline-track" role="tablist" aria-label="Escolha um período da linha do tempo">{timeline.map((item,i)=><button role="tab" id={`era-tab-${i}`} aria-controls="era-details" aria-selected={selectedEra===i} key={i} className={`era ${selectedEra===i?'active':''}`} onClick={()=>setSelectedEra(i)}><span className="era-dot"/><span className="era-date">{item.date}</span></button>)}</div>
     <div className="timeline-detail" id="era-details" role="tabpanel" aria-labelledby={`era-tab-${selectedEra}`}><div className="timeline-paper-art"><img src={asset(timeline[selectedEra].state?(states.find(s=>s.id===timeline[selectedEra].state)?.image):'/images/cerrado-por-do-sol.jpg')} alt="Ilustração contextual do período selecionado"/><span>ARQUIVO / {String(selectedEra+1).padStart(2,'0')}</span></div><div className="timeline-story"><SmallLabel>{timeline[selectedEra].kind}</SmallLabel><div className="time-big">{timeline[selectedEra].date}</div><h2>{timeline[selectedEra].headline}</h2><p>{timeline[selectedEra].description}</p><div className="timeline-buttons"><button className="arrow-btn" disabled={selectedEra===0} onClick={()=>setSelectedEra(n=>Math.max(0,n-1))} aria-label="Marco anterior"><ChevronLeft size={21}/></button><span>{String(selectedEra+1).padStart(2,'0')} — {String(timeline.length).padStart(2,'0')}</span><button className="arrow-btn" disabled={selectedEra===timeline.length-1} onClick={()=>setSelectedEra(n=>Math.min(timeline.length-1,n+1))} aria-label="Próximo marco"><ChevronRight size={21}/></button></div></div></div>
     <div className="scene-bottom"><span>O PASSADO AINDA ECOA NO PRESENTE.</span><button className="button-primary" onClick={()=>navigate('artists')}>CONHECER OS ARTISTAS <ArrowRight size={18}/></button></div>
   </div></section>}

   {route.page==='artists'&&<section className="artists-scene paper-scene"><div className="container"><SectionIntro chapter="CAPÍTULO 04 / 08" kicker="VOZES DO CENTRO-OESTE" title={<>VOZES QUE<br/><em>MARCARAM GERAÇÕES.</em></>} description="A música da região não tem uma única voz. Conheça artistas e grupos de diferentes épocas e linguagens — e as histórias de suas ligações com o Centro-Oeste."/>
     <div className="artist-filters" role="group" aria-label="Filtrar artistas por território"><button className={artistFilter==='all'?'active':''} onClick={()=>setArtistFilter('all')}>TODOS <span>{artists.length}</span></button>{states.map(s=><button className={artistFilter===s.id?'active':''} onClick={()=>setArtistFilter(s.id)} key={s.id}>{s.code}</button>)}</div>
     <div className="artists-grid">{filteredArtists.map((a,i)=><button className="artist-tile" onClick={()=>setSelectedArtist(a)} key={a.id}><div className="artist-poster" style={{'--poster':a.tone}}><div className="artist-art-circles"><span/><span/><span/></div><span className="poster-index">VOZ {String(i+1).padStart(2,'0')}</span>{a.photo&&<img className="poster-photo" src={asset(a.photo)} alt={`Fotografia de ${a.name}`} />}<span className="poster-icon"><Music2 size={54} strokeWidth={.8}/></span><span className="poster-name">{a.name}</span></div><div className="artist-tile-foot"><div><span>{states.find(s=>s.id===a.state)?.code} / {a.tag}</span><strong>{a.name}</strong></div><FancyArrow/></div></button>)}</div>
     <p className="museum-note"><Info size={17}/> Os painéis utilizam composições gráficas autorais, não retratos fotográficos dos artistas. Consulte as fontes nas fichas.</p>
     <div className="scene-bottom"><span>DA VOZ AO INSTRUMENTO.</span><button className="button-primary" onClick={()=>navigate('instruments')}>DESCOBRIR OS INSTRUMENTOS <ArrowRight size={18}/></button></div>
   </div></section>}

   {route.page==='instruments'&&<section className="instruments-scene paper-scene"><div className="container"><SectionIntro chapter="CAPÍTULO 05 / 08" kicker="INSTRUMENTOS QUE CONTAM HISTÓRIAS" title={<>ANTES DA VOZ,<br/><em>O SOM.</em></>} description="Madeira, cordas, fole, grãos e superfícies de atrito: o som nasce do movimento. Selecione um instrumento para descobrir como ele fala."/>
    <div className="instrument-shell"><div className="instrument-selector" role="tablist" aria-label="Selecione um instrumento">{instruments.map((it,i)=><button key={it.id} role="tab" id={`inst-tab-${it.id}`} aria-controls="instrument-detail" aria-selected={selectedInstrument===it.id} className={selectedInstrument===it.id?'active':''} onClick={()=>selectInstrument(it.id)}><span>{String(i+1).padStart(2,'0')}</span><strong>{it.name}</strong><ArrowRight size={17}/></button>)}</div>
      <div className="instrument-spotlight" id="instrument-detail" role="tabpanel" aria-labelledby={`inst-tab-${selectedInstrument}`}><div className="spotlight-header"><SmallLabel>COLEÇÃO SONORA / {selectedI.tag.toUpperCase()}</SmallLabel><span>ESTUDO ILUSTRADO</span></div><div className="instrument-illustration"><InstrumentArt type={selectedI.id}/></div><div className="spotlight-info"><div><h2>{selectedI.name}</h2><p>{selectedI.detail}</p><div className="spotlight-metadata"><div><span>COMO O SOM ACONTECE</span><strong>{selectedI.how}</strong></div><div><span>UMA CURIOSIDADE</span><strong>{selectedI.curiosity}</strong></div></div></div><button className="listen-pill" onClick={()=>playTrack(selectedI.track)}><span className="round-play small">{playing&&activeTrack===selectedI.track?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor"/>}</span><span>{playing&&activeTrack===selectedI.track?'PAUSAR AMOSTRA':'OUVIR DEMONSTRAÇÃO'}</span><AudioLines size={22}/></button></div></div>
    </div><p className="museum-note"><Info size={17}/> As amostras são sínteses eletrônicas educativas, não registros de instrumentos reais. Para autenticidade timbrística, substitua pelos áudios autorizados.</p><div className="scene-bottom"><span>VOCÊ CONSEGUE RECONHECER UM SOM?</span><button className="button-primary" onClick={()=>navigate('quiz')}>TESTAR MEUS OUVIDOS <ArrowRight size={18}/></button></div></div></section>}

   {route.page==='quiz'&&<section className="quiz-scene dark-scene"><div className="container quiz-layout"><div className="quiz-intro"><SmallLabel light>EXPERIÊNCIA EXTRA / 01 MINUTO</SmallLabel><h1 className="display-title">VOCÊ<br/>RECONHECE<br/><em>ESSE SOM?</em></h1><p>Uma brincadeira rápida para observar instrumentos e suas sonoridades. Sem nota, sem pressão — apenas curiosidade.</p><div className="quiz-small-record"><Disc3 size={34}/><SoundWave count={22}/></div></div>
    <div className="quiz-panel">{quizDone?<div className="quiz-complete"><span className="quiz-award"><CheckCircle2 size={39}/></span><SmallLabel>FIM DA EXPERIÊNCIA</SmallLabel><h2>Você ouviu com atenção.</h2><p>Você acertou {score} de {quiz.length} perguntas. O mais importante é ter descoberto novos modos de produzir som.</p><div className="quiz-complete-actions"><button className="button-outline" onClick={()=>{setQuizIndex(0);setQuizChoice(null);setScore(0);setQuizDone(false)}}><RotateCcw size={18}/> TENTAR DE NOVO</button><button className="button-primary" onClick={()=>navigate('final')}>VER ENCERRAMENTO <ArrowRight size={18}/></button></div></div>:<>
      <div className="quiz-top"><span>PERGUNTA {String(quizIndex+1).padStart(2,'0')} / {String(quiz.length).padStart(2,'0')}</span><span>ESCUTA ATENTA</span></div><div className="quiz-progress">{quiz.map((q,i)=><span key={i} className={i<=quizIndex?'filled':''}/>)}</div>
      <div className="quiz-record"><button className="quiz-play" onClick={()=>playTrack(quizQuestion.track)} aria-label="Tocar ou pausar amostra sonora">{playing&&activeTrack===quizQuestion.track?<Pause size={26} fill="currentColor"/>:<Play size={26} fill="currentColor"/>}</button><div><SoundWave active={playing&&activeTrack===quizQuestion.track}/><span>ÁUDIO DEMONSTRATIVO · SÍNTESE ORIGINAL</span></div></div>
      <h2>{quizQuestion.question}</h2><div className="quiz-options">{quizQuestion.options.map((op,i)=><button key={i} className={`${quizChoice!==null?'chosen':''} ${quizChoice===i?'picked':''} ${quizChoice!==null&&i===quizQuestion.answer?'correct':''}`} disabled={quizChoice!==null} onClick={()=>{setQuizChoice(i);if(i===quizQuestion.answer)setScore(s=>s+1)}}><span>{String.fromCharCode(65+i)}</span>{op}{quizChoice!==null&&i===quizQuestion.answer?<Check size={18}/>:null}</button>)}</div>
      {quizChoice!==null&&<div className="quiz-feedback" role="status"><strong>{quizChoice===quizQuestion.answer?'Isso mesmo!':'Boa tentativa!'}</strong><p>{quizQuestion.explanation}</p><button className="text-link" onClick={()=>{if(quizIndex===quiz.length-1)setQuizDone(true);else{setQuizIndex(i=>i+1);setQuizChoice(null)}}}>{quizIndex===quiz.length-1?'VER RESULTADO':'PRÓXIMA PERGUNTA'} <ArrowRight size={17}/></button></div>}
      <button className="skip-quiz" onClick={()=>navigate('final')}>PULAR ATIVIDADE <ArrowRight size={15}/></button>
    </>}</div></div></section>}

   {route.page==='final'&&<section className="end-scene"><div className="end-background"/><div className="end-vignette"/><div className="container end-inner"><SmallLabel light>O ÚLTIMO CAPÍTULO — OU O PRIMEIRO DE MUITOS</SmallLabel><h1 className="display-title">A MÚSICA GUARDA<br/>A <em>MEMÓRIA</em><br/>DE UM POVO.</h1><p>Cada acorde revela um lugar. Cada ritmo preserva uma história. E cada nova geração mantém viva a cultura que recebeu.</p><div className="end-quote">“Cada canto tem uma história.<br/>Cada história tem um som.”</div><div className="end-buttons"><button className="button-primary" onClick={reset}>EXPLORAR NOVAMENTE <RotateCcw size={19}/></button><button className="button-outline light-outline" onClick={()=>navigate('map')}>VOLTAR AO MAPA <ArrowRight size={18}/></button></div></div>
     <div className="end-credits container"><div><strong>ECOS DO CENTRO-OESTE</strong><span>Mostra Cultural · SENAC Mediotec · Desenvolvimento de Sistemas</span><span>Projeto escolar educativo, sem vínculo institucional com os artistas citados.</span></div><div><details><summary>FONTES E CRÉDITOS <ChevronDown size={18}/></summary><div className="sources-list"><p>Textos baseados em fontes institucionais e acervos públicos. Imagens: panorama original gerado para o projeto e ilustrações editoriais originais. Áudios: sínteses didáticas originais, sem gravações comerciais.</p>{sources.map(s=><a href={s.url} target="_blank" rel="noreferrer" key={s.url}>{s.title}<ExternalLink size={13}/></a>)}</div></details></div></div>
   </section>}
  </main>
  {route.page!=='home'&&route.page!=='final'&&<div className="floating-journey"><span><i/> ETAPA {Math.max(1,progressMap[route.page])} DE 8</span><button onClick={reset} title="Parar os áudios e deixar pronto para outro visitante"><RotateCcw size={14}/> REINICIAR VISITA</button></div>}
  {activeTrack&&<aside className="mini-player" aria-label="Reprodutor de áudio"><div className="mini-player-art"><Disc3 size={28} className={playing?'spinning':''}/></div><div className="mini-meta"><strong>{currentTrack?.title}</strong><span>{currentTrack?.artist}</span></div>{inPlaylist&&<button className="mini-skip" onClick={()=>changeTrack(-1)} aria-label="Áudio anterior"><SkipBack size={19}/></button>}<button className="mini-control" onClick={()=>playTrack(activeTrack)} aria-label={playing?'Pausar áudio':'Reproduzir áudio'}>{playing?<Pause size={18} fill="currentColor"/>:<Play size={18} fill="currentColor"/>}</button>{inPlaylist&&<button className="mini-skip" onClick={()=>changeTrack(1)} aria-label="Próximo áudio"><SkipForward size={19}/></button>}<div className="mini-progress"><span>{duration(currentTime)}</span><input type="range" aria-label="Posição da reprodução" min="0" max={Math.max(1,audioLength)} step="0.1" value={Math.min(currentTime,Math.max(1,audioLength))} onChange={e=>{if(audioRef.current)audioRef.current.currentTime=Number(e.target.value)}}/><span>{duration(audioLength)}</span></div><Volume2 size={16} className="mini-volume-icon"/><input className="mini-volume" type="range" aria-label="Volume" min="0" max="1" step="0.05" value={volume} onChange={e=>{setVolume(Number(e.target.value));if(muted)setMuted(false)}}/><button className="mini-close" aria-label="Fechar player e parar áudio" onClick={stopAudio}><X size={19}/></button>{audioError&&<div className="audio-error" role="alert">Não foi possível carregar o áudio. Verifique o arquivo em public/audio.</div>}</aside>}
  {selectedArtist&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedArtist(null)}}><div className="artist-modal" role="dialog" aria-modal="true" aria-labelledby="artist-modal-title"><button className="modal-close" autoFocus onClick={()=>setSelectedArtist(null)} aria-label="Fechar ficha de artista"><X size={21}/></button><div className="modal-art" style={{'--poster':selectedArtist.tone}}><div className="modal-art-ring"/>{selectedArtist.photo?<img className="modal-photo" src={asset(selectedArtist.photo)} alt={`Fotografia de ${selectedArtist.name}`}/>:<Mic2 size={64} strokeWidth={.9}/>}<span>ARQUIVO SONORO <b>{states.find(s=>s.id===selectedArtist.state)?.code}</b></span></div><div className="modal-content"><SmallLabel>FICHA DE ACERVO / {selectedArtist.era}</SmallLabel><h2 id="artist-modal-title">{selectedArtist.name}</h2><div className="modal-tags"><span>{selectedArtist.tag}</span><span>{states.find(s=>s.id===selectedArtist.state)?.title}</span></div><p>{selectedArtist.bio}</p><div className="modal-fact"><span>OBRA EM DESTAQUE</span><strong>{selectedArtist.work}</strong></div><div className="modal-fact"><span>VOCÊ SABIA?</span><strong>{selectedArtist.curiosity}</strong></div><ArtistListening artist={selectedArtist}/><div className="modal-buttons"><a href={selectedArtist.source} target="_blank" rel="noreferrer" className="button-primary">CONHECER A FONTE <ExternalLink size={17}/></a><button className="text-link" onClick={()=>{setSelectedArtist(null);navigate('state',selectedArtist.state)}}>VER TERRITÓRIO <ArrowRight size={17}/></button></div><p className="modal-ethics">As músicas dos artistas são incorporadas pelo Spotify. Os áudios dos territórios são estudos sonoros originais.</p></div></div></div>}
 </div>
}
function ArrowUpIcon(){return <MoveUpRight size={18} strokeWidth={1.7} aria-hidden="true"/>}
