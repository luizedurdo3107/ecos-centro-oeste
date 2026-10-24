import React from 'react';

export function SoundWave({ className = '', active = false, count=34 }) {
  const bars=Array.from({length:count},(_,i)=> 8+Math.abs(Math.sin(i*.78+1.6)*Math.cos(i*.31+.3))*32+(i%7===0?9:0));
  return <div className={`sound-wave ${className} ${active?'is-active':''}`} aria-hidden="true">{bars.map((h,i)=><i key={i} style={{height:`${h}px`,animationDelay:`${-i*.054}s`}} />)}</div>;
}

export function RecordArt({ spinning=false }) {
  return <svg className={`record-art ${spinning?'spinning':''}`} viewBox="0 0 280 280" aria-hidden="true">
    <defs><radialGradient id="vinyl"><stop stopColor="#34241d" offset="0"/><stop stopColor="#0e1212" offset=".49"/><stop stopColor="#292a29" offset=".72"/><stop stopColor="#0a0b0c" offset="1"/></radialGradient></defs>
    <circle cx="140" cy="140" r="133" fill="url(#vinyl)" stroke="#4f4943" strokeWidth="2"/>
    {Array.from({length:18},(_,i)=><circle key={i} cx="140" cy="140" r={57+i*4.2} fill="none" stroke={i%3===0?'#aca093':'#6a6963'} strokeOpacity={i%3===0?.20:.10} strokeWidth=".8"/>)}
    <circle cx="140" cy="140" r="55" fill="#be7d42"/><circle cx="140" cy="140" r="43" fill="#dba45e" stroke="#f1d6a9" strokeWidth=".8"/><circle cx="140" cy="140" r="4" fill="#211714" />
    <g fill="#3d261e" textAnchor="middle" fontFamily="Georgia, serif"><text x="140" y="121" fontSize="11">ECOS</text><text x="140" y="134" fontSize="7" letterSpacing="2">DO CENTRO-OESTE</text><text x="140" y="160" fontSize="7">ESTUDO SONORO</text></g>
  </svg>
}

function SvgBase({children}) { return <svg viewBox="0 0 430 380" className="instrument-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração estilizada de instrumento musical"><defs><linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#eecb85"/><stop offset=".42" stopColor="#b47942"/><stop offset="1" stopColor="#7b4d30"/></linearGradient><linearGradient id="darkWood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dfb879"/><stop offset="1" stopColor="#89552f"/></linearGradient></defs><ellipse cx="230" cy="332" rx="135" ry="18" fill="#2f1c17" opacity=".13"/>{children}</svg> }
export function InstrumentArt({type}) {
 if(type==='viola' || type==='cocho')return <SvgBase>
   <g transform={type==='cocho'?'rotate(-24 215 191)':'rotate(-33 215 195)'}>
    <path d={type==='cocho'?'M181 176 C143 162 124 200 134 244 C143 295 245 314 282 263 C314 218 281 171 242 174 Z':'M188 169 C170 137 135 142 130 184 C125 213 146 231 164 243 C127 267 133 309 167 322 C229 345 301 300 273 250 C258 227 247 221 252 189 C256 147 204 138 188 169Z'} fill="url(#wood)" stroke="#72452d" strokeWidth="7"/>
    <path d="M208 190 C186 185 171 210 180 236 C192 265 238 266 247 235 C257 206 232 189 208 190" fill="#e6bd75" stroke="#b27842" strokeWidth="4" opacity=".52" />
    <circle cx="214" cy="224" r={type==='cocho'?14:21} fill="#482c21" stroke="#f1cf8c" strokeWidth="5" />
    <path d="M201 194 L201 47 Q215 35 229 47 L231 197" fill="url(#darkWood)" stroke="#673e29" strokeWidth="4" />
    <path d="M199 57 L184 14 Q209 -6 235 12 L230 58Z" fill="#68412c" />
    {[0,1,2,3,4].map(i=><g key={i}><line x1={206+i*3.2} y1="24" x2={199+i*7} y2="282" stroke="#f4e5bc" strokeWidth="1.4" opacity=".93"/><line x1="201" y1={86+i*14} x2="229" y2={86+i*14} stroke="#5a3c2b" strokeWidth="3" /></g>)}
    <rect x="189" y="273" width="50" height="8" rx="2" fill="#5b3928" />
   </g></SvgBase>;
 if(type==='sanfona')return <SvgBase><g transform="rotate(-8 220 170)">
  <path d="M105 105 L170 85 L182 300 L100 284Z" fill="#7e3227" stroke="#e4b982" strokeWidth="5"/><path d="M265 79 L338 92 L329 278 L261 300Z" fill="#892f27" stroke="#e4b982" strokeWidth="6"/>
  {Array.from({length:11},(_,i)=><path key={i} d={`M${173+i*9} ${89-i*1} L${182+i*8} ${298-i*0}`} stroke={i%2?'#ba7d53':'#f0ca85'} strokeWidth="7" />)}
  {Array.from({length:9},(_,i)=><rect key={i} x="280" y={109+i*17} width="32" height="10" rx="2" fill={i%2?'#e5d6bf':'#2c2e2d'} />)}
  {Array.from({length:8},(_,i)=><circle key={i} cx={127+(i%2)*18} cy={130+Math.floor(i/2)*30} r="6" fill="#e5cfab" />)}
  <path d="M113 95 L95 55 M320 90 L342 55" stroke="#f3d8a2" strokeWidth="11" strokeLinecap="round" />
 </g></SvgBase>;
 if(type==='ganza')return <SvgBase><g transform="rotate(-30 214 187)"><rect x="154" y="88" width="132" height="202" rx="52" fill="url(#wood)" stroke="#85532f" strokeWidth="8"/><rect x="165" y="101" width="110" height="174" rx="45" fill="none" stroke="#f5db9e" strokeOpacity=".5" strokeWidth="4"/>{Array.from({length:21},(_,i)=><circle key={i} cx={177+(i%5)*22} cy={126+Math.floor(i/5)*33} r="3" fill="#5a3829" opacity=".7"/>)}</g><path d="M63 118 Q105 67 151 81 M290 293 Q331 278 360 225" fill="none" stroke="#cf994f" strokeWidth="5" strokeDasharray="7 12" opacity=".8" /></SvgBase>;
 return <SvgBase><g transform="rotate(-24 216 172)"><rect x="125" y="95" width="165" height="205" rx="24" fill="url(#darkWood)" stroke="#6d422a" strokeWidth="7"/>{Array.from({length:19},(_,i)=><line key={i} x1="135" x2="280" y1={117+i*8.7} y2={117+i*8.7} stroke="#5d3422" strokeWidth="3" />)}<path d="M317 95 L95 301" stroke="#efcf90" strokeWidth="10" strokeLinecap="round" /><path d="M321 91 L98 298" stroke="#6d432e" strokeWidth="2" /></g></SvgBase>;
}

export function RegionMap({ onSelect, active, onFocusRegion }) {
 const regions=[
 {id:'mato-grosso',label:'MATO GROSSO',sub:'MT',cx:257,cy:191,d:'M104 77 L234 39 339 79 397 121 364 190 389 256 331 290 263 265 207 299 154 264 98 252 78 178Z',fill:'#738465'},
 {id:'goias',label:'GOIÁS',sub:'GO',cx:445,cy:313,d:'M397 122 L462 128 478 163 544 169 580 220 554 269 566 337 521 405 469 435 414 403 388 360 349 342 330 290 389 256 364 190Z',fill:'#bd804e'},
 {id:'mato-grosso-do-sul',label:'MATO GROSSO DO SUL',sub:'MS',cx:275,cy:417,d:'M207 299 L263 265 330 290 349 342 388 360 414 403 469 435 438 483 389 521 339 538 279 516 251 551 207 496 148 466 160 398 147 341Z',fill:'#aa593c'},
 ];
 const activate=(id)=>onSelect(id);
 return <svg className="region-map" viewBox="45 20 595 560" role="img" aria-label="Mapa ilustrativo e interativo de Goiás, Mato Grosso, Mato Grosso do Sul e Distrito Federal">
  <defs><filter id="outlineShadow"><feDropShadow dx="0" dy="12" stdDeviation="8" floodOpacity=".19"/></filter></defs>
  <g filter="url(#outlineShadow)">{regions.map(r=><g key={r.id} role="button" tabIndex="0" aria-label={`Explorar ${r.label}`} onMouseEnter={()=>onFocusRegion(r.id)} onFocus={()=>onFocusRegion(r.id)} onClick={()=>activate(r.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate(r.id)}}} style={{cursor:'pointer'}}>
   <path d={r.d} fill={r.fill} className={active===r.id?'map-area is-selected':'map-area'} stroke="#f4e5ca" strokeWidth="3" strokeLinejoin="round" />
   <text x={r.cx} y={r.cy} textAnchor="middle" fill="#fff2d9" fontWeight="800" fontSize="15" letterSpacing="1">{r.sub}</text>
   <circle cx={r.cx} cy={r.cy+21} r="2.5" fill="#fff2d9" />
  </g>)}</g>
  <g role="button" tabIndex="0" aria-label="Explorar Distrito Federal" style={{cursor:'pointer'}} onMouseEnter={()=>onFocusRegion('distrito-federal')} onFocus={()=>onFocusRegion('distrito-federal')} onClick={()=>activate('distrito-federal')} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate('distrito-federal')}}}>
   <circle cx="487" cy="292" r={active==='distrito-federal'?26:21} stroke="#fff1d2" strokeWidth="3" fill="#384f59" className="map-df"/>
   <text x="487" y="298" fill="#fff3df" fontSize="13" fontWeight="800" textAnchor="middle">DF</text>
  </g>
  <path d="M55 490 Q95 485 120 470" stroke="#9d7c5c" strokeDasharray="2 9" fill="none" strokeWidth="2"/>
 </svg>;
}
