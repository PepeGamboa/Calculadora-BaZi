

// bazi.js - cálculo BaZi corregido (año, mes, día, hora)
// ----------------------------------------------------
// Reglas usadas:
// - Año BaZi empieza en "Li Chun" ~4 de Febrero
// - Meses solares (JieQi) con tabla aproximada (fechas fijas por año)
// - Día: cálculo por Día Juliano (JDN) y ancla para el ciclo sexagenario
// - Hora: bloques de 2 horas; tronco de la hora depende del tronco del día
// ----------------------------------------------------

/* ========== Datos fundamentales ========== */
const TRONCOS_CELESTES = [
  { es: "Yang Madera", cn: "甲", short: "Jia", elemento: "Madera" },
  { es: "Yin Madera", cn: "乙", short: "Yi", elemento: "Madera" },
  { es: "Yang Fuego", cn: "丙", short: "Bing", elemento: "Fuego" },
  { es: "Yin Fuego", cn: "丁", short: "Ding", elemento: "Fuego" },
  { es: "Yang Tierra", cn: "戊", short: "Wu", elemento: "Tierra" },
  { es: "Yin Tierra", cn: "己", short: "Ji", elemento: "Tierra" },
  { es: "Yang Metal", cn: "庚", short: "Geng", elemento: "Metal" },
  { es: "Yin Metal", cn: "辛", short: "Xin", elemento: "Metal" },
  { es: "Yang Agua", cn: "壬", short: "Ren", elemento: "Agua" },
  { es: "Yin Agua", cn: "癸", short: "Gui", elemento: "Agua" }
];

const RAMAS_TERRESTRES = [
  { es: "Rata", cn: "子", short: "Zi", animal: "Rata" },
  { es: "Buey", cn: "丑", short: "Chou", animal: "Buey" },
  { es: "Tigre", cn: "寅", short: "Yin", animal: "Tigre" },
  { es: "Conejo", cn: "卯", short: "Mao", animal: "Conejo" },
  { es: "Dragón", cn: "辰", short: "Chen", animal: "Dragón" },
  { es: "Serpiente", cn: "巳", short: "Si", animal: "Serpiente" },
  { es: "Caballo", cn: "午", short: "Wu", animal: "Caballo" },
  { es: "Cabra", cn: "未", short: "Wei", animal: "Cabra" },
  { es: "Mono", cn: "申", short: "Shen", animal: "Mono" },
  { es: "Gallo", cn: "酉", short: "You", animal: "Gallo" },
  { es: "Perro", cn: "戌", short: "Xu", animal: "Perro" },
  { es: "Cerdo", cn: "亥", short: "Hai", animal: "Cerdo" }
];

// Construcción del ciclo de 60 (Ganzhi)
const GANZHI = [];
for (let i = 0; i < 60; i++) {
  GANZHI.push({
    tronco: TRONCOS_CELESTES[i % 10],
    rama: RAMAS_TERRESTRES[i % 12],
    index: i
  });
}

/* ========== Meses solares (JieQi) - fechas aproximadas ========== 
   Cada entrada es [mesGregoriano, diaAproximadoDelJieQi]
   i = 1..12 corresponde a: 1=Tigre (Yin), 2=Conejo (Mao), ... 12=Buey (Chou)
   (estas fechas son aproximadas y valen para la mayoría de años; para alta precisión hay que
    usar tablas astronomicas, pero para BaZi práctico esta tabla es suficiente).
*/
const INICIO_MES_SOLAR_JIEQI = [
  null,
  [2, 4],   // 1 Tigre (Yin)  - Li Chun aprox 4 Feb
  [3, 5],   // 2 Conejo
  [4, 5],   // 3 Dragón
  [5, 6],   // 4 Serpiente
  [6, 6],   // 5 Caballo
  [7, 7],   // 6 Cabra
  [8, 8],   // 7 Mono
  [9, 8],   // 8 Gallo
  [10, 8],  // 9 Perro
  [11, 8],  // 10 Cerdo
  [12, 7],  // 11 Rata
  [1, 6]    // 12 Buey (este cae en Enero del año siguiente)
];

/* ========== Utilidades - JD/JDN ========== */
/**
 * Convierte un objeto Date (local) en JDN entero (mitad del dia tratado correctamente).
 * Incluye fracción del día según hora/minutos/segundos para que el día cambie al pasar la medianoche local.
 */
function toJulianDayInteger(date) {
  // usar componentes locales (getFullYear, getMonth, ...) para que respeten la fecha/hora local del usuario
  let Y = date.getFullYear();
  let M = date.getMonth() + 1; // 1..12
  // sumar fraccion del día por la hora local
  const dayFrac = date.getDate() + (date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600) / 24;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + dayFrac + B - 1524.5;
  const JDN = Math.floor(JD + 0.5);
  return JDN;
}

/* ========== Cálculo de pilares ========== */

/**
 * Año (tronco+rama) - el año BaZi comienza en Li Chun (~4 feb).
 */
function getYearPillar(date) {
  const Y = date.getFullYear();
  const lichun = new Date(date.getFullYear(), 1, 4, 0, 0, 0); // 4 Feb
  let yearSolar = Y;
  if (date < lichun) yearSolar = Y - 1;

  // 1984 fue Jia-Zi (inicio del ciclo moderno); índice Ganzhi:
  const ganzhiIndex = ((yearSolar - 1984) % 60 + 60) % 60;
  return GANZHI[ganzhiIndex];
}

/**
 * Mes (tronco+rama) - determina a qué mes solar (i=1..12) pertenece la fecha,
 * luego calcula el tronco del mes según tronco del año y la secuencia.
 */
function getMonthPillar(date) {
  const year = date.getFullYear();
  // buscar en la tabla de INICIO_MES_SOLAR_JIEQI
  let found = false;
  let solarI = null;
  let startOfMonth = null;
  let nextStart = null;

  for (let i = 1; i <= 12; i++) {
    const [mGreg, dGreg] = INICIO_MES_SOLAR_JIEQI[i];
    const start = new Date(year, mGreg - 1, dGreg, 0, 0, 0);
    let next;
    if (i === 12) {
      const [m2, d2] = INICIO_MES_SOLAR_JIEQI[1];
      next = new Date(year + 1, m2 - 1, d2, 0, 0, 0);
    } else {
      const [m2, d2] = INICIO_MES_SOLAR_JIEQI[i + 1];
      next = new Date(year, m2 - 1, d2, 0, 0, 0);
    }
    if (date >= start && date < next) {
      found = true;
      solarI = i;
      startOfMonth = start;
      nextStart = next;
      break;
    }
  }

  if (!found) {
    // caso borde: antes del primer jieqi de este año -> pertenece al mes 12 del año anterior
    solarI = 12;
  }

  // rama del mes: m=1 -> Yin (indice 2), fórmula ramaIndex = (solarI + 1) % 12
  const ramaIndex = (solarI + 1) % 12;

  // tronco del mes: depende del tronco del año
  const yearPillar = getYearPillar(date);
  // obtener índice del tronco del año (0..9)
  const yearTroncoIndex = TRONCOS_CELESTES.findIndex(t => t.cn === yearPillar.tronco.cn);

  // primer tronco del primer mes (Tigre) según tronco del año:
  // Jia/Ji -> Bing (2)
  // Yi/Geng -> Wu (4)
  // Bing/Xin -> Geng (6)
  // Ding/Ren -> Ren (8)
  // Wu/Gui -> Jia (0)
  const primerMap = { 0: 2, 1: 4, 2: 6, 3: 8, 4: 0 }; // por (yearTroncoIndex % 5)
  const primerTroncoMes = primerMap[yearTroncoIndex % 5];

  // mes sequence offset (si i = 1 -> offset 0)
  const monthSequenceOffset = (solarI - 1); // 0..11

  const troncoMesIndex = (primerTroncoMes + monthSequenceOffset) % 10;

  return {
    tronco: TRONCOS_CELESTES[troncoMesIndex],
    rama: RAMAS_TERRESTRES[ramaIndex],
    solarMonthIndex: solarI,
    startOfMonth,
    nextStart
  };
}

/**
 * Día (tronco+rama) - calculado a partir del JDN y un offset fijo.
 * Observación: la tabla de 60 días depende de la referencia. Para compatibilidad con
 * tablas históricas y ejemplos dados, usamos un offset que alinea:
 *   1998-06-30 => 戊申 (Wu Shen)
 *   2025-10-02 => 甲辰 (Jia Chen)
 *
 * Ese offset (en este código) es 49 (resultado obtenido comparando JDN con índices Ganzhi).
 * Si quieres usar otra ancla, ajusta DAY_JANZHI_OFFSET.
 */
const DAY_GANZHI_OFFSET = 49; // ajuste para que los ejemplos clásicos coincidan

function getDayPillar(date) {
  const jdn = toJulianDayInteger(date);
  const idx = ((jdn + DAY_GANZHI_OFFSET) % 60 + 60) % 60;
  return GANZHI[idx];
}

/**
 * Hora (tronco+rama) - rama por bloques de 2 horas,
 * tronco de la hora = (troncoDelDiaIndex * 2 + ramaHoraIndex) % 10
 * RamaHoraIndex:
 *   Zi 23:00-00:59 -> 0
 *   Chou 01:00-02:59 -> 1
 *   Yin 03:00-04:59 -> 2
 *   ...
 *   Hai 21:00-22:59 -> 11
 */
function getHourPillar(date) {
  const h = date.getHours();
  let ramaHoraIndex;
  if (h >= 23 || h < 1) ramaHoraIndex = 0; // Zi
  else ramaHoraIndex = Math.floor((h + 1) / 2) % 12;

  const dayPillar = getDayPillar(date);
  const dayTroncoIndex = TRONCOS_CELESTES.findIndex(t => t.cn === dayPillar.tronco.cn);

  const troncoHoraIndex = (dayTroncoIndex * 2 + ramaHoraIndex) % 10;

  return {
    tronco: TRONCOS_CELESTES[troncoHoraIndex],
    rama: RAMAS_TERRESTRES[ramaHoraIndex]
  };
}

/* ========== Convenience: obtener los 4 pilares ========== */
function calculateBaZiForDate(date) {
  return {
    year: getYearPillar(date),
    month: getMonthPillar(date),
    day: getDayPillar(date),
    hour: getHourPillar(date)
  };
}

/* ========== Render / integración DOM (lista mínima) ========== */
document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-btn");
  const birthDateInput = document.getElementById("birth-date");
  const birthTimeInput = document.getElementById("birth-time");
  const userBaziChartDiv = document.getElementById("user-bazi-chart");
  const todayBaziChartDiv = document.getElementById("today-bazi-chart");
  const resultsContainer = document.getElementById("results-container");
  const errorMessageDiv = document.getElementById("error-message");
  const todayDateDisplay = document.getElementById("today-date-display");

  calculateBtn.addEventListener("click", () => {
    const birthDateVal = birthDateInput.value;
    const birthTimeVal = birthTimeInput.value || "00:00";

    if (!birthDateVal) {
      errorMessageDiv.classList.remove("hidden");
      resultsContainer.classList.add("hidden");
      return;
    }
    errorMessageDiv.classList.add("hidden");

    // fecha del usuario (usamos zona local del navegador)
    const userDate = new Date(`${birthDateVal}T${birthTimeVal}:00`);
    const userPillars = calculateBaZiForDate(userDate);
    renderPillars(userBaziChartDiv, userPillars);

    // carta "hoy"
    const today = new Date();
    const todayPillars = calculateBaZiForDate(today);
    renderPillars(todayBaziChartDiv, todayPillars);

    todayDateDisplay.textContent = today.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    resultsContainer.classList.remove("hidden");
  });

  function renderPillars(container, data) {
    container.innerHTML = "";
    const order = ["year", "month", "day", "hour"];
    const titles = { year: "Año", month: "Mes", day: "Día", hour: "Hora" };
    order.forEach(k => {
      const p = data[k];
      const el = document.createElement("div");
      el.className = "pillar-card";
      el.innerHTML = `
        <div class="pillar-title">${titles[k]}</div>
        <div class="tronco-celeste">
          <div class="name-cn" style="font-size:1.6rem;font-weight:700">${p.tronco.cn} ${p.tronco.short}</div>
          <div class="name-es">${p.tronco.es}</div>
        </div>
        <div class="rama-terrestre" style="margin-top:0.6rem">
          <div class="name-cn" style="font-size:1.4rem;font-weight:700">${p.rama.cn} ${p.rama.short}</div>
          <div class="name-es">${p.rama.animal}</div>
        </div>
      `;
      container.appendChild(el);
    });
  }
});

