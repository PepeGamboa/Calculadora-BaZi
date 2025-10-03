// bazi.js ajustado con compatibilidad y resúmenes fijos

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

// === CARTAS AJUSTADAS ===
const hoyAjustado = {
  fecha: "2025-10-02",
  anio: { tronco: TRONCOS_CELESTES[1], rama: RAMAS_TERRESTRES[5] },   // 乙 Yi + 巳 Si (Serpiente)
  mes:  { tronco: TRONCOS_CELESTES[1], rama: RAMAS_TERRESTRES[9] },   // 乙 Yi + 酉 You (Gallo)
  dia:  { tronco: TRONCOS_CELESTES[1], rama: RAMAS_TERRESTRES[4] },   // 乙 Yi + 辰 Chen (Dragón)
  hora: { tronco: TRONCOS_CELESTES[1], rama: RAMAS_TERRESTRES[10] }   // 乙 Yi + 戌 Xu (Perro)
};

const nacimientoAjustado = {
  anio: { tronco: TRONCOS_CELESTES[4], rama: RAMAS_TERRESTRES[2] },   // 戊 Wu + 寅 Yin (Tigre)
  mes:  { tronco: TRONCOS_CELESTES[4], rama: RAMAS_TERRESTRES[6] },   // 戊 Wu + 午 Wu (Caballo)
  dia:  { tronco: TRONCOS_CELESTES[4], rama: RAMAS_TERRESTRES[8] },   // 戊 Wu + 申 Shen (Mono)
  hora: { tronco: TRONCOS_CELESTES[2], rama: RAMAS_TERRESTRES[4] }    // 丙 Bing + 辰 Chen (Dragón)
};

// === RENDER ===
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

// Exportar si es necesario
if (typeof module !== 'undefined') {
  module.exports = {
    hoyAjustado,
    nacimientoAjustado,
    renderPillarRow,
    TRONCOS_CELESTES,
    RAMAS_TERRESTRES
  };
}


