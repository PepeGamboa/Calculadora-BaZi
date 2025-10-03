// bazi.js ajustado con compatibilidad central alineada y resúmenes

const TRONCOS_CELESTES = [
  { es: "Yang Madera", cn: "甲 Jia", elemento: "Madera", resumen: "El Jia es firme, recto y perseverante, como un gran árbol que busca la luz." },
  { es: "Yin Madera", cn: "乙 Yi", elemento: "Madera", resumen: "El Yi es flexible, adaptable y sutil, como una enredadera que encuentra su camino." },
  { es: "Yang Fuego", cn: "丙 Bing", elemento: "Fuego", resumen: "El Bing es luminoso, entusiasta y noble, como el sol que ilumina todo a su paso." },
  { es: "Yin Fuego", cn: "丁 Ding", elemento: "Fuego", resumen: "El Ding es cálido, suave y misterioso, como la luz de una vela en la oscuridad." },
  { es: "Yang Tierra", cn: "戊 Wu", elemento: "Tierra", resumen: "El Wu es estable, confiable y protector, como una montaña que brinda refugio." },
  { es: "Yin Tierra", cn: "己 Ji", elemento: "Tierra", resumen: "El Ji es práctico, detallista y cuidadoso, como la tierra fértil que da sustento." },
  { es: "Yang Metal", cn: "庚 Geng", elemento: "Metal", resumen: "El Geng es fuerte, justo y decidido, como la espada que corta la injusticia." },
  { es: "Yin Metal", cn: "辛 Xin", elemento: "Metal", resumen: "El Xin es refinado, elegante y persuasivo, como una joya de gran valor." },
  { es: "Yang Agua", cn: "壬 Ren", elemento: "Agua", resumen: "El Ren es profundo, vasto y poderoso, como el océano que abarca todo." },
  { es: "Yin Agua", cn: "癸 Gui", elemento: "Agua", resumen: "El Gui es sutil, reflexivo y cambiante, como la lluvia que nutre la vida." }
];

const RAMAS_TERRESTRES = [
  { es: "Rata", cn: "子 Zi", animal: "Rata", emoji: "🐀", elementoOcultoPrincipal: "Agua", resumen: "La Rata es astuta, ingeniosa y adaptable, siempre encuentra oportunidades." },
  { es: "Buey", cn: "丑 Chou", animal: "Buey", emoji: "🐂", elementoOcultoPrincipal: "Tierra", resumen: "El Buey es trabajador, constante y firme, avanza paso a paso sin rendirse." },
  { es: "Tigre", cn: "寅 Yin", animal: "Tigre", emoji: "🐅", elementoOcultoPrincipal: "Madera", resumen: "El Tigre es valiente, enérgico y protector, siempre busca liderar y avanzar." },
  { es: "Conejo", cn: "卯 Mao", animal: "Conejo", emoji: "🐇", elementoOcultoPrincipal: "Madera", resumen: "El Conejo es amable, sensible y diplomático, crea armonía a su alrededor." },
  { es: "Dragón", cn: "辰 Chen", animal: "Dragón", emoji: "🐉", elementoOcultoPrincipal: "Tierra", resumen: "El Dragón es magnético, poderoso y visionario, inspira a los demás." },
  { es: "Serpiente", cn: "巳 Si", animal: "Serpiente", emoji: "🐍", elementoOcultoPrincipal: "Fuego", resumen: "La Serpiente es sabia, intuitiva y estratégica, oculta gran profundidad." },
  { es: "Caballo", cn: "午 Wu", animal: "Caballo", emoji: "🐴", elementoOcultoPrincipal: "Fuego", resumen: "El Caballo es libre, dinámico y apasionado, siempre busca nuevos horizontes." },
  { es: "Cabra", cn: "未 Wei", animal: "Cabra", emoji: "🐐", elementoOcultoPrincipal: "Tierra", resumen: "La Cabra es compasiva, artística y sensible, se guía por la belleza y el corazón." },
  { es: "Mono", cn: "申 Shen", animal: "Mono", emoji: "🐵", elementoOcultoPrincipal: "Metal", resumen: "El Mono es ingenioso, curioso y versátil, siempre encuentra una solución." },
  { es: "Gallo", cn: "酉 You", animal: "Gallo", emoji: "🐓", elementoOcultoPrincipal: "Metal", resumen: "El Gallo es preciso, observador y organizado, brilla en los detalles." },
  { es: "Perro", cn: "戌 Xu", animal: "Perro", emoji: "🐕", elementoOcultoPrincipal: "Tierra", resumen: "El Perro es leal, justo y protector, siempre defiende lo que es correcto." },
  { es: "Cerdo", cn: "亥 Hai", animal: "Cerdo", emoji: "🐖", elementoOcultoPrincipal: "Agua", resumen: "El Cerdo es generoso, noble y sincero, confía en la bondad de la vida." }
];

const GANZHI = [];
for (let i = 0; i < 60; i++) {
  GANZHI.push({
    tronco: TRONCOS_CELESTES[i % 10],
    rama: RAMAS_TERRESTRES[i % 12]
  });
}

const INICIO_MES_SOLAR_JIEQI = [
  null, [2, 4], [3, 5], [4, 5], [5, 6], [6, 6],
  [7, 7], [8, 8], [9, 8], [10, 8], [11, 8], [12, 7], [1, 6]
];

function getYearPillar(date) {
  let anioSolar = date.getFullYear();
  const inicioPrimerMesSolar = INICIO_MES_SOLAR_JIEQI[1];
  const fechaInicioAnioSolar = new Date(date.getFullYear(), inicioPrimerMesSolar[0] - 1, inicioPrimerMesSolar[1]);
  if (date < fechaInicioAnioSolar) anioSolar--;
  return GANZHI[(anioSolar - 4 + 6000) % 60];
}

function getMonthPillar(date) {
  let yearPillar = getYearPillar(date);
  let yearTroncoIndex = TRONCOS_CELESTES.indexOf(yearPillar.tronco);

  let ramaMesIndex;
  for (let i = 1; i <= 12; i++) {
    const [m, d] = INICIO_MES_SOLAR_JIEQI[i];
    const start = new Date(date.getFullYear(), m - 1, d);
    const [mNext, dNext] = i === 12 ? INICIO_MES_SOLAR_JIEQI[1] : INICIO_MES_SOLAR_JIEQI[i + 1];
    const end = new Date(i === 12 ? date.getFullYear() + 1 : date.getFullYear(), mNext - 1, dNext);
    if (date >= start && date < end) {
      ramaMesIndex = (i - 1 + 12) % 12;
      break;
    }
  }

  const troncoStart = [2, 4, 6, 8, 0][yearTroncoIndex % 5];
  const troncoMesIndex = (troncoStart + ramaMesIndex) % 10;

  return {
    tronco: TRONCOS_CELESTES[troncoMesIndex],
    rama: RAMAS_TERRESTRES[ramaMesIndex]
  };
}

function getDayPillar(date) {
  const refDate = new Date(Date.UTC(1900, 0, 31));
  const targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const diffDays = Math.floor((targetDate - refDate) / 86400000);
  let dayGanzhiIndex = (diffDays + 10) % 60;
  if (dayGanzhiIndex < 0) dayGanzhiIndex += 60;
  return GANZHI[dayGanzhiIndex];
}

function getHourPillar(date) {
  const hour = date.getHours();
  const ramaHoraIndex = Math.floor((hour + 1) / 2) % 12;

  const dayPillar = getDayPillar(date);
  const troncoDiaIndex = TRONCOS_CELESTES.indexOf(dayPillar.tronco);

  const troncoInicio = [0, 2, 4, 6, 8][troncoDiaIndex % 5];
  const troncoHoraIndex = (troncoInicio + ramaHoraIndex) % 10;

  return {
    tronco: TRONCOS_CELESTES[troncoHoraIndex],
    rama: RAMAS_TERRESTRES[ramaHoraIndex]
  };
}

// Render con resumen adicional
function renderPillarRow(pillar, label) {
  const troncoColor = getElementColor(pillar.tronco.elemento);
  const ramaColor = getElementColor(pillar.rama.elementoOcultoPrincipal);

  return `
    <div class="pillar-row">
      <div class="pillar-label">${label}</div>
      <div class="pillar-content">
        <div class="animal-emoji">${pillar.rama.emoji}</div>
        <div class="pillar-info" style="border-color: ${troncoColor}">
          <div class="pillar-cn" style="color: ${troncoColor}">${pillar.tronco.cn}</div>
          <div class="pillar-es">${pillar.tronco.es}</div>
          <div class="text-xs text-gray-500 mt-1">${pillar.tronco.resumen}</div>
        </div>
        <div class="pillar-info" style="border-color: ${ramaColor}">
          <div class="pillar-cn" style="color: ${ramaColor}">${pillar.rama.cn}</div>
          <div class="pillar-es">${pillar.rama.animal}</div>
          <div class="text-xs text-gray-500 mt-1">${pillar.rama.resumen}</div>
        </div>
      </div>
    </div>
  `;
}

function getElementColor(elemento) {
  const colors = {
    'Madera': '#10b981',
    'Fuego': '#ef4444',
    'Tierra': '#f59e0b',
    'Metal': '#9ca3af',
    'Agua': '#3b82f6'
  };
  return colors[elemento] || '#6b7280';
}

if (typeof module !== 'undefined') {
  module.exports = {
    getYearPillar,
    getMonthPillar,
    getDayPillar,
    getHourPillar,
    renderPillarRow,
    TRONCOS_CELESTES,
    RAMAS_TERRESTRES,
    GANZHI
  };
}


