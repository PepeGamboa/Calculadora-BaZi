// bazi.js ajustado


const TRONCOS_CELESTES = [
{ es: "Yang Madera", cn: "甲 Jia", elemento: "Madera" },
{ es: "Yin Madera", cn: "乙 Yi", elemento: "Madera" },
{ es: "Yang Fuego", cn: "丙 Bing", elemento: "Fuego" },
{ es: "Yin Fuego", cn: "丁 Ding", elemento: "Fuego" },
{ es: "Yang Tierra", cn: "戊 Wu", elemento: "Tierra" },
{ es: "Yin Tierra", cn: "己 Ji", elemento: "Tierra" },
{ es: "Yang Metal", cn: "庚 Geng", elemento: "Metal" },
{ es: "Yin Metal", cn: "辛 Xin", elemento: "Metal" },
{ es: "Yang Agua", cn: "壬 Ren", elemento: "Agua" },
{ es: "Yin Agua", cn: "癸 Gui", elemento: "Agua" }
];


const RAMAS_TERRESTRES = [
{ es: "Rata", cn: "子 Zi", animal: "Rata", emoji: "🐀", elementoOcultoPrincipal: "Agua" },
{ es: "Buey", cn: "丑 Chou", animal: "Buey", emoji: "🐂", elementoOcultoPrincipal: "Tierra" },
{ es: "Tigre", cn: "寅 Yin", animal: "Tigre", emoji: "🐅", elementoOcultoPrincipal: "Madera" },
{ es: "Conejo", cn: "卯 Mao", animal: "Conejo", emoji: "🐇", elementoOcultoPrincipal: "Madera" },
{ es: "Dragón", cn: "辰 Chen", animal: "Dragón", emoji: "🐉", elementoOcultoPrincipal: "Tierra" },
{ es: "Serpiente", cn: "巳 Si", animal: "Serpiente", emoji: "🐍", elementoOcultoPrincipal: "Fuego" },
{ es: "Caballo", cn: "午 Wu", animal: "Caballo", emoji: "🐴", elementoOcultoPrincipal: "Fuego" },
{ es: "Cabra", cn: "未 Wei", animal: "Cabra", emoji: "🐐", elementoOcultoPrincipal: "Tierra" },
{ es: "Mono", cn: "申 Shen", animal: "Mono", emoji: "🐵", elementoOcultoPrincipal: "Metal" },
{ es: "Gallo", cn: "酉 You", animal: "Gallo", emoji: "🐓", elementoOcultoPrincipal: "Metal" },
{ es: "Perro", cn: "戌 Xu", animal: "Perro", emoji: "🐕", elementoOcultoPrincipal: "Tierra" },
{ es: "Cerdo", cn: "亥 Hai", animal: "Cerdo", emoji: "🐖", elementoOcultoPrincipal: "Agua" }
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
ramaMesIndex = (i - 1 + 12) % 12; // ajustado
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
const refDate = new Date(Date.UTC(1900, 0, 31)); // referencia clásica BaZi
const targetDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
const diffDays = Math.floor((targetDate - refDate) / 86400000);
let dayGanzhiIndex = (diffDays + 10) % 60; // offset calibrado
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
}


