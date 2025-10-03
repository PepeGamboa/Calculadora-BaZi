// Troncos Celestes
const TRONCOS = [
  {es:"Yang Madera", cn:"甲 Jia", elem:"Madera", desc:"Firme como un árbol."},
  {es:"Yin Madera", cn:"乙 Yi", elem:"Madera", desc:"Flexible como enredadera."},
  {es:"Yang Fuego", cn:"丙 Bing", elem:"Fuego", desc:"Luminoso como el sol."},
  {es:"Yin Fuego", cn:"丁 Ding", elem:"Fuego", desc:"Cálido como vela."},
  {es:"Yang Tierra", cn:"戊 Wu", elem:"Tierra", desc:"Estable como montaña."},
  {es:"Yin Tierra", cn:"己 Ji", elem:"Tierra", desc:"Fértil como tierra."},
  {es:"Yang Metal", cn:"庚 Geng", elem:"Metal", desc:"Fuerte como espada."},
  {es:"Yin Metal", cn:"辛 Xin", elem:"Metal", desc:"Refinado como joya."},
  {es:"Yang Agua", cn:"壬 Ren", elem:"Agua", desc:"Profundo como océano."},
  {es:"Yin Agua", cn:"癸 Gui", elem:"Agua", desc:"Sutil como lluvia."}
];

// Ramas Terrestres
const RAMAS = [
  {es:"Rata", cn:"子 Zi", animal:"Rata", emoji:"🐀", elem:"Agua", desc:"Astuta."},
  {es:"Buey", cn:"丑 Chou", animal:"Buey", emoji:"🐂", elem:"Tierra", desc:"Trabajador."},
  {es:"Tigre", cn:"寅 Yin", animal:"Tigre", emoji:"🐅", elem:"Madera", desc:"Valiente."},
  {es:"Conejo", cn:"卯 Mao", animal:"Conejo", emoji:"🐇", elem:"Madera", desc:"Sensible."},
  {es:"Dragón", cn:"辰 Chen", animal:"Dragón", emoji:"🐉", elem:"Tierra", desc:"Magnético."},
  {es:"Serpiente", cn:"巳 Si", animal:"Serpiente", emoji:"🐍", elem:"Fuego", desc:"Sabia."},
  {es:"Caballo", cn:"午 Wu", animal:"Caballo", emoji:"🐴", elem:"Fuego", desc:"Libre."},
  {es:"Cabra", cn:"未 Wei", animal:"Cabra", emoji:"🐐", elem:"Tierra", desc:"Compasiva."},
  {es:"Mono", cn:"申 Shen", animal:"Mono", emoji:"🐵", elem:"Metal", desc:"Ingenioso."},
  {es:"Gallo", cn:"酉 You", animal:"Gallo", emoji:"🐔", elem:"Metal", desc:"Observador."},
  {es:"Perro", cn:"戌 Xu", animal:"Perro", emoji:"🐕", elem:"Tierra", desc:"Leal."},
  {es:"Cerdo", cn:"亥 Hai", animal:"Cerdo", emoji:"🐖", elem:"Agua", desc:"Generoso."}
];

const GANZHI = [];
for(let i=0; i<60; i++) GANZHI.push({t: TRONCOS[i%10], r: RAMAS[i%12]});

// Términos solares (Jieqi) - Estos marcan el inicio de cada mes solar BaZi
const JIEQI = [
  null,
  [2,4],   // Lichun (Inicio primavera) - Mes 1
  [3,6],   // Jingzhe - Mes 2
  [4,5],   // Qingming - Mes 3
  [5,6],   // Lixia - Mes 4
  [6,6],   // Mangzhong - Mes 5
  [7,7],   // Xiaoshu - Mes 6
  [8,8],   // Liqiu - Mes 7
  [9,8],   // Bailu - Mes 8
  [10,8],  // Hanlu - Mes 9
  [11,7],  // Lidong - Mes 10
  [12,7],  // Daxue - Mes 11
  [1,6]    // Xiaohan - Mes 12
];

function getYearPillar(d) {
  let y = d.getFullYear();
  const [m,day] = JIEQI[1]; // Lichun
  if(d < new Date(y,m-1,day)) y--;
  let idx = (y-4)%60;
  if(idx<0) idx+=60;
  return GANZHI[idx];
}

function getMonthPillar(d) {
  const y = d.getFullYear();
  let solarMonth = 1; // Mes solar por defecto
  
  // Encontrar en qué mes solar estamos
  for(let i=1; i<=12; i++){
    const [m1,d1] = JIEQI[i];
    const startDate = new Date(y, m1-1, d1);
    
    const nextI = (i % 12) + 1;
    const [m2,d2] = JIEQI[nextI];
    const endYear = (i === 12) ? y+1 : y;
    const endDate = new Date(endYear, m2-1, d2);
    
    if(d >= startDate && d < endDate){
      solarMonth = i;
      break;
    }
  }
  
  // Mapeo mes solar → rama terrestre
  // Mes 1 (Lichun feb) = Tigre (índice 2)
  // Mes 2 = Conejo (3), Mes 3 = Dragón (4), etc.
  const branchIdx = (solarMonth + 1) % 12;
  
  // Calcular tronco basado en el año
  const yearTronco = TRONCOS.indexOf(getYearPillar(d).t);
  const stemBase = [2,4,6,8,0][yearTronco % 5]; // Fórmula tradicional
  const offset = branchIdx >= 2 ? branchIdx - 2 : branchIdx + 10;
  const stemIdx = (stemBase + offset) % 10;
  
  return {t: TRONCOS[stemIdx], r: RAMAS[branchIdx]};
}

function getDayPillar(d) {
  // Ref: 1 enero 2000 = Ganzhi 16 (庚辰)
  const ref = new Date(2000, 0, 1);
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.floor((target - ref) / 86400000);
  
  let idx = (16 + days) % 60;
  if(idx < 0) idx += 60;
  
  return GANZHI[idx];
}

function getHourPillar(d) {
  const h = d.getHours();
  let bi;
  
  // Ramas por hora
  if(h >= 23 || h < 1) bi = 0;
  else if(h < 3) bi = 1;
  else if(h < 5) bi = 2;
  else if(h < 7) bi = 3;
  else if(h < 9) bi = 4;
  else if(h < 11) bi = 5;
  else if(h < 13) bi = 6;
  else if(h < 15) bi = 7;
  else if(h < 17) bi = 8;
  else if(h < 19) bi = 9;
  else if(h < 21) bi = 10;
  else bi = 11;
  
  // Tronco basado en el día
  const dayTronco = TRONCOS.indexOf(getDayPillar(d).t);
  const stemBase = [0,2,4,6,8][dayTronco % 5];
  const stemIdx = (stemBase + bi) % 10;
  
  return {t: TRONCOS[stemIdx], r: RAMAS[bi]};
}

function color(e) {
  return {Madera:'#10b981',Fuego:'#ef4444',Tierra:'#f59e0b',Metal:'#9ca3af',Agua:'#3b82f6'}[e]||'#6b7280';
}

function renderPillar(p,lbl) {
  const tc = color(p.t.elem);
  const rc = color(p.r.elem);
  return `
    <div class="pillar-row">
      <div class="pillar-label">${lbl}</div>
      <div class="pillar-info" style="border-color:${tc}">
        <div class="pillar-cn" style="color:${tc}">${p.t.cn}</div>
        <div class="pillar-es">${p.t.es}</div>
        <div class="pillar-summary">${p.t.desc}</div>
      </div>
      <div class="pillar-info" style="border-color:${rc}">
        <div class="animal-emoji">${p.r.emoji}</div>
        <div class="pillar-cn" style="color:${rc}">${p.r.cn}</div>
        <div class="pillar-es">${p.r.animal}</div>
        <div class="pillar-summary">${p.r.desc}</div>
      </div>
    </div>
  `;
}

function calcCompat(u,t) {
  const rel = {
    Madera:{gen:'Fuego',ctrl:'Tierra'},
    Fuego:{gen:'Tierra',ctrl:'Metal'},
    Tierra:{gen:'Metal',ctrl:'Agua'},
    Metal:{gen:'Agua',ctrl:'Madera'},
    Agua:{gen:'Madera',ctrl:'Fuego'}
  };
  const k = ['y','m','d','h'];
  let tot = 0, sc = {};
  k.forEach(x=>{
    const ue = u[x].r.elem;
    const te = t[x].r.elem;
    let s = 0;
    if(ue===te) s=2;
    else if(rel[ue]?.gen===te||rel[te]?.gen===ue) s=1;
    else if(rel[ue]?.ctrl===te||rel[te]?.ctrl===ue) s=-1;
    sc[x]=s;
    tot+=s;
  });
  return {sc,tot};
}

function icon(s) {
  return s===2?'❤️':s===1?'💛':s===0?'🤍':'💔';
}

function analysis(t) {
  if(t>=6) return ['❤️❤️❤️❤️❤️','Excelente — Día muy favorable'];
  if(t>=3) return ['❤️❤️❤️❤️🤍','Favorable — Buen día'];
  if(t>=0) return ['❤️❤️❤️🤍🤍','Neutral — Equilibrado'];
  if(t>=-3) return ['❤️❤️🤍🤍🤍','Poco favorable'];
  return ['❤️🤍🤍🤍🤍','Desafiante'];
}

function calculate() {
  const bd = document.getElementById('birth-date').value;
  const bt = document.getElementById('birth-time').value;
  if(!bd||!bt) {alert('Ingresa fecha y hora');return;}

  const birth = new Date(bd+'T'+bt+':00');
  const today = new Date();

  const user = {
    y:getYearPillar(birth),
    m:getMonthPillar(birth),
    d:getDayPillar(birth),
    h:getHourPillar(birth)
  };

  const tod = {
    y:getYearPillar(today),
    m:getMonthPillar(today),
    d:getDayPillar(today),
    h:getHourPillar(today)
  };

  document.getElementById('user-pillars').innerHTML =
    renderPillar(user.y,'Año')+
    renderPillar(user.m,'Mes')+
    renderPillar(user.d,'Día')+
    renderPillar(user.h,'Hora');

  document.getElementById('today-pillars').innerHTML =
    renderPillar(tod.y,'Año')+
    renderPillar(tod.m,'Mes')+
    renderPillar(tod.d,'Día')+
    renderPillar(tod.h,'Hora');

  const comp = calcCompat(user,tod);
  document.getElementById('hearts').innerHTML =
    `<div class="heart-box">${icon(comp.sc.y)}</div>` +
    `<div class="heart-box">${icon(comp.sc.m)}</div>` +
    `<div class="heart-box">${icon(comp.sc.d)}</div>` +
    `<div class="heart-box">${icon(comp.sc.h)}</div>`;

  const [hts,msg] = analysis(comp.tot);
  document.getElementById('analysis-result').innerHTML =
    `<div class="analysis-hearts">${hts}</div><div class="analysis-text">${msg}</div>`;

  document.getElementById('date-display').textContent =
    'Hoy: '+today.toLocaleDateString('es-ES',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

  document.getElementById('results').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('calc-btn').addEventListener('click',calculate);
  setTimeout(calculate,100);
});




