import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, Compass, ExternalLink, Eye, Headphones, Image as ImageIcon, Info, MapPinned, RotateCcw, Sparkles, TicketCheck, Volume2, X } from 'lucide-react';
import { artistArchive, instrumentArchive, archivePage, archiveUrl } from './acervo';

function SafeImage({src,alt,className='',fallback=null}) {
  const [failed,setFailed]=useState(false);
  useEffect(()=>setFailed(false),[src]);
  if (!src || failed) return fallback;
  return <img className={className} src={src} alt={alt} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>;
}

// Não inventa retratos: quando o acervo remoto falha, a composição gráfica existente continua visível.
export function FotoArtista({artista,asset,className,fallback=null}) {
  if (!artista) return null;
  const entry=artistArchive[artista.id];
  const src=artista.photo ? (/^https?:\/\//.test(artista.photo)?artista.photo:asset(artista.photo)) : archiveUrl(entry);
  return <SafeImage src={src} className={className} alt={`Registro de ${artista.name}`} fallback={fallback}/>;
}

export function CreditoArtista({artista}) {
  if (!artista || artista.photo || !artistArchive[artista.id]) return null;
  const record=artistArchive[artista.id];
  return <div className="ecos-photo-attribution">
    <ImageIcon size={14} aria-hidden="true"/>
    <span>Foto de acervo: {record.credit} · {record.license}. {record.note || ''}</span>
    <a href={archivePage(record)} target="_blank" rel="noopener noreferrer">Créditos <ExternalLink size={13}/></a>
  </div>;
}

export function InstrumentoVisual({instrument,Illustration}) {
  const [mode,setMode]=useState('foto');
  const entry=instrumentArchive[instrument.id];
  const [photoFailed,setPhotoFailed]=useState(false);
  useEffect(()=>{setPhotoFailed(false)},[instrument.id]);
  const showPhoto=mode==='foto' && Boolean(entry) && !photoFailed;
  return <div className="ecos-instrument-showcase">
    <div className="ecos-visual-tabs" role="group" aria-label="Forma de visualizar o instrumento">
      <button type="button" className={showPhoto?'selected':''} onClick={()=>setMode('foto')} aria-pressed={showPhoto}><ImageIcon size={15}/> Fotografia</button>
      <button type="button" className={!showPhoto?'selected':''} onClick={()=>setMode('ilustracao')} aria-pressed={!showPhoto}><Eye size={15}/> Ilustração</button>
    </div>
    <div className={`instrument-illustration ${showPhoto?'ecos-is-photo':''}`}>
      {showPhoto ? <img className="ecos-instrument-photo" src={archiveUrl(entry)} alt={`Fotografia de ${instrument.name}`} loading="lazy" onError={()=>setPhotoFailed(true)}/>: <Illustration type={instrument.id}/>}
    </div>
    <div className="ecos-instrument-note">
      <div><strong>EM AÇÃO</strong><p>{entry?.action || instrument.how}</p></div>
      {showPhoto && <a href={archivePage(entry)} target="_blank" rel="noopener noreferrer" className="ecos-archive-link">Foto: {entry.credit} · {entry.license} <ExternalLink size={13}/></a>}
    </div>
  </div>;
}

const regionGlyph={goias:'GO', 'mato-grosso':'MT','mato-grosso-do-sul':'MS','distrito-federal':'DF'};
const regionsForPassport=['goias','mato-grosso','mato-grosso-do-sul','distrito-federal'];
const STORE='ecos-passaporte-sonoro-v1';
const readPassport=()=>{try{const v=JSON.parse(sessionStorage.getItem(STORE)||'[]');return Array.isArray(v)?v.filter(id=>regionsForPassport.includes(id)):[]}catch{return []}};

export function PassaporteSonoro({route,states,navigateState}) {
  const [visited,setVisited]=useState(readPassport);
  const [open,setOpen]=useState(false);
  const [justStamped,setJustStamped]=useState(null);
  const initialVisitRef=useRef(false);
  useEffect(()=>{
    if(route.page==='state' && regionsForPassport.includes(route.id)){
      setVisited(v=>v.includes(route.id)?v:[...v,route.id]);
      setJustStamped(route.id);
      initialVisitRef.current=true;
    }
  },[route.page,route.id]);
  useEffect(()=>{try{sessionStorage.setItem(STORE,JSON.stringify(visited))}catch{}},[visited]);
  useEffect(()=>{
    const clear=()=>{try{sessionStorage.removeItem(STORE)}catch{};setVisited([]);setOpen(false);setJustStamped(null);initialVisitRef.current=false};
    const esc=e=>{if(e.key==='Escape')setOpen(false)};
    window.addEventListener('ecos:reset-passaporte',clear);
    window.addEventListener('keydown',esc);
    return ()=>{window.removeEventListener('ecos:reset-passaporte',clear);window.removeEventListener('keydown',esc)};
  },[]);
  const all=visited.length===regionsForPassport.length;
  const percent=visited.length/regionsForPassport.length*100;
  if(route.page==='home')return null;
  return <>
    <button type="button" className="ecos-passport-launch" onClick={()=>setOpen(true)} aria-label={`Abrir passaporte sonoro; ${visited.length} de 4 territórios visitados`}>
      <TicketCheck size={19}/><span>PASSAPORTE SONORO</span><b>{visited.length}/4</b>
    </button>
    {open && <div className="ecos-passport-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
      <section className="ecos-passport-modal" role="dialog" aria-modal="true" aria-labelledby="ecos-passport-title">
        <button className="ecos-passport-close" type="button" onClick={()=>setOpen(false)} aria-label="Fechar passaporte"><X size={22}/></button>
        <div className="ecos-passport-heading"><span className="ecos-passport-overline">ARQUIVO DE VIAGEM · ECOS DO CENTRO-OESTE</span><TicketCheck size={29}/><h2 id="ecos-passport-title">Seu passaporte <em>sonoro.</em></h2>
          <p>Conheça os quatro territórios e receba um carimbo simbólico por cada estação visitada.</p>
        </div>
        <div className="ecos-passport-stamps">{regionsForPassport.map((id,i)=>{
          const state=states.find(s=>s.id===id);
          const stamped=visited.includes(id);
          return <button key={id} type="button" className={`ecos-stamp ${stamped?'stamped':''}`} onClick={()=>{setOpen(false);navigateState(id)}} aria-label={`${state?.title}: ${stamped?'visitado':'a descobrir'}. Explorar território`}>
            <span className="ecos-stamp-number">0{i+1}</span><strong>{regionGlyph[id]}</strong><span className="ecos-stamp-status">{stamped?<><Check size={13}/> VISITADO</>:'DESCOBRIR'}</span><small>{state?.title}</small>
          </button>})}</div>
        <div className="ecos-passport-progress"><div><span>SEU PERCURSO</span><strong>{visited.length} / 4</strong></div><div className="ecos-passport-meter"><span style={{width:`${percent}%`}}/></div></div>
        <p className="ecos-passport-completion">{all?<><CheckCircle2 size={18}/> Passaporte completo! Você atravessou os quatro territórios musicais.</>:<><Compass size={18}/> Cada novo território revela uma história e acrescenta um carimbo.</>}</p>
        <span className="ecos-passport-foot">Carimbos desta visita · nenhum cadastro necessário</span>
      </section>
    </div>}
  </>;
}

export function CortinaTerritorio({region}){
  if(!region) return null;
  return <div className="ecos-transition-curtain" role="status" aria-live="polite" aria-label={`Entrando em ${region.title}`}>
    <div className="ecos-curtain-raster" aria-hidden="true"/>
    <div className="ecos-curtain-content"><div className="ecos-curtain-hairline"/><span>ESTAÇÃO {region.number} · {region.code}</span><h2>{region.title}</h2><p>{region.short}</p><div className="ecos-curtain-rule"/></div>
  </div>;
}

export function DesafioSonoroInfo({index,total,score}){
  return <div className="ecos-quiz-help" aria-live="polite">
    <div><Headphones size={20}/><span><strong>DESAFIO DOS SONS</strong><small>Ouça, escolha e descubra a resposta.</small></span></div>
    <div className="ecos-quiz-counter"><CheckCircle2 size={16}/><strong>{score}</strong><span>acerto{score===1?'':'s'}</span></div>
    <div className="ecos-quiz-tip"><Info size={14}/> As faixas atuais são demonstrações digitais; substitua por registros autorizados para uma escuta autêntica.</div>
  </div>;
}

export function DesafioConcluido({score,total}){
  return <div className="ecos-quiz-finish"><Sparkles size={25}/><div><strong>{score>=Math.ceil(total*.7)?'OUVIDO ATENTO':'EXPLORADOR DE SONS'}</strong><span>Você percorreu {total} descobertas. Continue ouvindo as culturas da região.</span></div></div>;
}
