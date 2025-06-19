// --- DATOS FUNDAMENTALES DE LA ASTROLOGÍA CHINA ---


const TRONCOS_CELESTES = [


    { es: "Yang Madera", cn: "甲 Jia", elemento: "Madera", polaridad: "Yang" },


    { es: "Yin Madera", cn: "乙 Yi", elemento: "Madera", polaridad: "Yin" },


    { es: "Yang Fuego", cn: "丙 Bing", elemento: "Fuego", polaridad: "Yang" },


    { es: "Yin Fuego", cn: "丁 Ding", elemento: "Fuego", polaridad: "Yin" },


    { es: "Yang Tierra", cn: "戊 Wu", elemento: "Tierra", polaridad: "Yang" },


    { es: "Yin Tierra", cn: "己 Ji", elemento: "Tierra", polaridad: "Yin" },


    { es: "Yang Metal", cn: "庚 Geng", elemento: "Metal", polaridad: "Yang" },


    { es: "Yin Metal", cn: "辛 Xin", elemento: "Metal", polaridad: "Yin" },


    { es: "Yang Agua", cn: "壬 Ren", elemento: "Agua", polaridad: "Yang" },


    { es: "Yin Agua", cn: "癸 Gui", elemento: "Agua", polaridad: "Yin" }


];





const RAMAS_TERRESTRES = [


    { es: "Rata", cn: "子 Zi", animal: "Rata", elementoOcultoPrincipal: "Agua" },


    { es: "Buey", cn: "丑 Chou", animal: "Buey", elementoOcultoPrincipal: "Tierra" },


    { es: "Tigre", cn: "寅 Yin", animal: "Tigre", elementoOcultoPrincipal: "Madera" },


    { es: "Conejo", cn: "卯 Mao", animal: "Conejo", elementoOcultoPrincipal: "Madera" },


    { es: "Dragón", cn: "辰 Chen", animal: "Dragón", elementoOcultoPrincipal: "Tierra" },


    { es: "Serpiente", cn: "巳 Si", animal: "Serpiente", elementoOcultoPrincipal: "Fuego" },


    { es: "Caballo", cn: "午 Wu", animal: "Caballo", elementoOcultoPrincipal: "Fuego" },


    { es: "Cabra", cn: "未 Wei", animal: "Cabra", elementoOcultoPrincipal: "Tierra" },


    { es: "Mono", cn: "申 Shen", animal: "Mono", elementoOcultoPrincipal: "Metal" },


    { es: "Gallo", cn: "酉 You", animal: "Gallo", elementoOcultoPrincipal: "Metal" },


    { es: "Perro", cn: "戌 Xu", animal: "Perro", elementoOcultoPrincipal: "Tierra" },


    { es: "Cerdo", cn: "亥 Hai", animal: "Cerdo", elementoOcultoPrincipal: "Agua" }


];





const GANZHI = [];


for (let i = 0; i < 60; i++) {


    GANZHI.push({


        tronco: TRONCOS_CELESTES[i % 10],


        rama: RAMAS_TERRESTRES[i % 12]


    });


}





// Inicio de los meses solares (JieQi). Formato [mesGregoriano, diaAproximadoDelJieQi]


// Estos son aproximados y pueden variar ligeramente. Para alta precisión, se necesitarían tablas anuales.


// Li Chun (inicio Tigre), Jing Zhe (inicio Conejo), etc.


const INICIO_MES_SOLAR_JIEQI = [


    null,       // No se usa el índice 0


    [2, 4],     // 1. Tigre (Yin): Inicia aprox. 4 de Febrero (Li Chun)


    [3, 5],     // 2. Conejo (Mao): Inicia aprox. 5 de Marzo (Jing Zhe)


    [4, 5],     // 3. Dragón (Chen): Inicia aprox. 5 de Abril (Qing Ming)


    [5, 6],     // 4. Serpiente (Si): Inicia aprox. 6 de Mayo (Li Xia)


    [6, 6],     // 5. Caballo (Wu): Inicia aprox. 6 de Junio (Mang Zhong)


    [7, 7],     // 6. Cabra (Wei): Inicia aprox. 7 de Julio (Xiao Shu)


    [8, 8],     // 7. Mono (Shen): Inicia aprox. 8 de Agosto (Li Qiu)


    [9, 8],     // 8. Gallo (You): Inicia aprox. 8 de Septiembre (Bai Lu)


    [10, 8],    // 9. Perro (Xu): Inicia aprox. 8 de Octubre (Han Lu)


    [11, 8],    // 10. Cerdo (Hai): Inicia aprox. 8 de Noviembre (Li Dong)


    [12, 7],    // 11. Rata (Zi): Inicia aprox. 7 de Diciembre (Da Xue)


    [1, 6]      // 12. Buey (Chou): Inicia aprox. 6 de Enero (Xiao Han) - Este es el mes 12, que puede caer en Enero del año siguiente


];








class BaZiCalculator {


    constructor(gregorianDate) {


        this.date = new Date(gregorianDate); // Usar la fecha tal cual


        this.year = this.date.getFullYear();


        this.month = this.date.getMonth() + 1; // 1-12


        this.day = this.date.getDate();


        this.hour = this.date.getHours();


        this.minute = this.date.getMinutes(); // Minutos para ajuste de hora si es necesario


    }





    getYearPillar() {


        let anioSolar = this.year;


        // El año astrológico chino generalmente comienza el 4 de febrero (Li Chun)


        // Comparamos con el inicio del primer mes solar (Tigre)


        const inicioPrimerMesSolar = INICIO_MES_SOLAR_JIEQI[1]; // [2, 4] -> 4 de Febrero


        const fechaInicioAnioSolar = new Date(this.year, inicioPrimerMesSolar[0] - 1, inicioPrimerMesSolar[1]);





        if (this.date < fechaInicioAnioSolar) {


            anioSolar--;


        }


        // Referencia: 1900 fue Geng Shen (庚申) si el año empieza en Li Chun.


        // El ciclo Ganzhi para el año se calcula: (Año - 3) % 60. Ajustado para que 1984 (Jia Zi) sea 0.


        // (Año - 1984) % 60 da el índice correcto si 1984 (Jia-Zi) es 0.


        // O, (Año - 4) % 60 da el índice correcto si el año 4 DC (Jia-Zi) es 0.


        // Usamos (Año Solar - 4) % 60. El resultado es el índice en el ciclo de 60.


        // Si el resultado es negativo, sumar 60. ej. (1900 - 4) % 60 = 1896 % 60 = 36.  (Geng-Zi)


        let yearGanzhiIndex = (anioSolar - 4 + 6000) % 60; // +6000 para asegurar positivo


        return GANZHI[yearGanzhiIndex];


    }





    getMonthPillar() {


        let anioParaMes = this.year;


        let mesGregoriano = this.month;


        let diaGregoriano = this.day;





        let ramaMesIndex; // Índice 0-11 para las Ramas Terrestres (Zi=0, Chou=1 ... Hai=11)





        // Determinar a qué mes solar pertenece la fecha


        // El mes 12 (Buey/Chou) puede comenzar en Enero, así que el mes solar del Tigre (Yin) es el mes 1


        // Los índices de INICIO_MES_SOLAR_JIEQI van de 1 (Tigre) a 12 (Buey)


        


        let mesSolarDeterminado = false;


        for (let i = 1; i <= 12; i++) {


            const [mGregJieqi, dGregJieqi] = INICIO_MES_SOLAR_JIEQI[i];


            const fechaJieqiActual = new Date(anioParaMes, mGregJieqi - 1, dGregJieqi);


            


            let mGregJieqiSiguiente, dGregJieqiSiguiente, anioSiguienteJieqi;


            if (i === 12) { // Si es Buey (último mes solar), el siguiente es Tigre del próximo año


                mGregJieqiSiguiente = INICIO_MES_SOLAR_JIEQI[1][0];


                dGregJieqiSiguiente = INICIO_MES_SOLAR_JIEQI[1][1];


                anioSiguienteJieqi = anioParaMes + 1;


            } else {


                mGregJieqiSiguiente = INICIO_MES_SOLAR_JIEQI[i+1][0];


                dGregJieqiSiguiente = INICIO_MES_SOLAR_JIEQI[i+1][1];


                anioSiguienteJieqi = anioParaMes;


            }


            const fechaJieqiSiguiente = new Date(anioSiguienteJieqi, mGregJieqiSiguiente - 1, dGregJieqiSiguiente);





            if (this.date >= fechaJieqiActual && this.date < fechaJieqiSiguiente) {


                // La Rama Terrestre del mes se mapea directamente: Tigre=Yin (idx 2), Conejo=Mao (idx 3), etc.


                // Si INICIO_MES_SOLAR_JIEQI[1] es Tigre (Yin, rama idx 2), entonces


                // para i=1 (Tigre), ramaMesIndex = (1-1+2)%12 = 2 (Yin)


                // para i=2 (Conejo), ramaMesIndex = (2-1+2)%12 = 3 (Mao)


                // ...


                // para i=11 (Rata), ramaMesIndex = (11-1+2)%12 = 0 (Zi)


                // para i=12 (Buey), ramaMesIndex = (12-1+2)%12 = 1 (Chou)


                ramaMesIndex = (i + 1) % 12; 


                mesSolarDeterminado = true;


                break;


            }


        }


        


        if (!mesSolarDeterminado) { // Caso raro, debería caer en un mes. Podría ser un problema con fechas límite.


             // Si no se determinó, puede ser el día antes del primer JieQi del año.


             // Por ejemplo, 3 de Febrero, antes de Li Chun (4 Feb). Pertenece al último mes del año anterior (Buey).


            const [mGregJieqi1, dGregJieqi1] = INICIO_MES_SOLAR_JIEQI[1];


            const fechaJieqi1EsteAnio = new Date(anioParaMes, mGregJieqi1 - 1, dGregJieqi1);


            if (this.date < fechaJieqi1EsteAnio) {


                ramaMesIndex = 1; // Buey (Chou), el último mes del ciclo.


            } else {


                console.error("No se pudo determinar el mes solar para:", this.date);


                return { tronco: TRONCOS_CELESTES[0], rama: RAMAS_TERRESTRES[0] }; // Fallback


            }


        }








        // Calcular el Tronco Celeste del Mes


        // Depende del Tronco Celeste del Año.


        // (AñoTroncoIndex * 2 + MesRamaIndex) % 10 -- Esta es una fórmula común


        // O la tabla tradicional:


        // Año Jia/Ji (0,5) -> Mes 1 (Tigre) es Bing (2)


        // Año Yi/Geng (1,6) -> Mes 1 (Tigre) es Wu (4)


        // Año Bing/Xin (2,7) -> Mes 1 (Tigre) es Geng (6)


        // Año Ding/Ren (3,8) -> Mes 1 (Tigre) es Ren (8)


        // Año Wu/Gui (4,9) -> Mes 1 (Tigre) es Jia (0)


        const yearPillarTroncoIndex = TRONCOS_CELESTES.indexOf(this.getYearPillar().tronco);


        let primerTroncoMes; // Tronco del primer mes (Tigre/Yin)


        switch (yearPillarTroncoIndex % 5) {


            case 0: primerTroncoMes = 2; break; // Jia, Ji -> Bing


            case 1: primerTroncoMes = 4; break; // Yi, Geng -> Wu


            case 2: primerTroncoMes = 6; break; // Bing, Xin -> Geng


            case 3: primerTroncoMes = 8; break; // Ding, Ren -> Ren


            case 4: primerTroncoMes = 0; break; // Wu, Gui -> Jia


        }


        


        // Los meses avanzan secuencialmente en Troncos.


        // Si Tigre (rama idx 2) es el primer mes del año BaZi.


        // Y el mes actual tiene ramaMesIndex.


        // La diferencia de meses desde el Tigre es:


        // (ramaMesIndex - 2 + 12) % 12


        // Ejemplo: si el mes actual es Dragón (ramaMesIndex = 4), (4-2+12)%12 = 2. Es el 3er mes. (Tigre, Conejo, Dragón)


        // Si el mes actual es Rata (ramaMesIndex = 0), (0-2+12)%12 = 10. Es el 11vo mes.


        let monthSequenceOffset;


        if (ramaMesIndex >= 2) { // Tigre (2) a Cerdo (11)


            monthSequenceOffset = ramaMesIndex - 2;


        } else { // Rata (0) o Buey (1)


            monthSequenceOffset = ramaMesIndex + 10; // Rata es el 11vo mes (índice 10), Buey el 12vo (índice 11)


        }





        const troncoMesIndex = (primerTroncoMes + monthSequenceOffset) % 10;





        return {


            tronco: TRONCOS_CELESTES[troncoMesIndex],


            rama: RAMAS_TERRESTRES[ramaMesIndex]


        };


    }





    getDayPillar() {


        // Algoritmo de Jia Zi del día. Referencia: 1 Enero 1900 fue Geng-Zi (庚子), índice 36 del ciclo Ganzhi.


        // Sin embargo, las calculadoras a menudo usan un día Julián o similar.


        // Usaremos una fórmula más directa:


        // Fecha de referencia: 1 de enero de 2000, fue Geng-Chen (庚辰)


        // Geng-Chen es el par 16 (0-indexado) o 17 (1-indexado) en el ciclo de 60. Geng es 6, Chen es 4. (6,4) -> 16


        // Si Geng-Chen es índice 16.


        const refDate = new Date(Date.UTC(2000, 0, 1)); // 1 Enero 2000


        const refGanzhiIndex = 16; // Geng-Chen





        const targetDate = new Date(Date.UTC(this.year, this.month - 1, this.day));


        


        const diffTime = targetDate.getTime() - refDate.getTime();


        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));


        


        let dayGanzhiIndex = (refGanzhiIndex + diffDays) % 60;


        if (dayGanzhiIndex < 0) {


            dayGanzhiIndex += 60;


        }


        


        return GANZHI[dayGanzhiIndex];


    }





    getHourPillar() {


        // La hora china (Shi辰) es un bloque de 2 horas. Zi (Rata) es 23:00-00:59, Chou (Buey) 01:00-02:59, etc.


        // El día empieza a las 00:00 para la mayoría de los sistemas, pero algunos astrólogos ajustan la hora Zi.


        // Si la hora es 23:xx, pertenece a la Rama Zi (Rata) pero al Tronco del Día Siguiente.


        // Por simplicidad, y común en muchas calculadoras online, se asume que la hora Zi (23:00-00:59) usa el Tronco del Día actual.


        // La hora Zi (23-1) es la primera, Buey (1-3) la segunda, etc.


        


        let hourForBranch = this.hour;


        const dayPillar = this.getDayPillar(); // Necesitamos el tronco del día.


        const dayTroncoIndex = TRONCOS_CELESTES.indexOf(dayPillar.tronco);





        // Ramas de la hora: Zi (0) de 23-1, Chou (1) de 1-3, ... Hai (11) de 21-23


        let ramaHoraIndex;


        if (hourForBranch >= 23 || hourForBranch < 1) ramaHoraIndex = 0; // Zi (Rata)


        else if (hourForBranch >= 1 && hourForBranch < 3) ramaHoraIndex = 1; // Chou (Buey)


        else if (hourForBranch >= 3 && hourForBranch < 5) ramaHoraIndex = 2; // Yin (Tigre)


        else if (hourForBranch >= 5 && hourForBranch < 7) ramaHoraIndex = 3; // Mao (Conejo)


        else if (hourForBranch >= 7 && hourForBranch < 9) ramaHoraIndex = 4; // Chen (Dragón)


        else if (hourForBranch >= 9 && hourForBranch < 11) ramaHoraIndex = 5; // Si (Serpiente)


        else if (hourForBranch >= 11 && hourForBranch < 13) ramaHoraIndex = 6; // Wu (Caballo)


        else if (hourForBranch >= 13 && hourForBranch < 15) ramaHoraIndex = 7; // Wei (Cabra)


        else if (hourForBranch >= 15 && hourForBranch < 17) ramaHoraIndex = 8; // Shen (Mono)


        else if (hourForBranch >= 17 && hourForBranch < 19) ramaHoraIndex = 9; // You (Gallo)


        else if (hourForBranch >= 19 && hourForBranch < 21) ramaHoraIndex = 10; // Xu (Perro)


        else if (hourForBranch >= 21 && hourForBranch < 23) ramaHoraIndex = 11; // Hai (Cerdo)





        // Tronco de la hora: depende del Tronco del Día.


        // Día Jia/Ji (0,5) -> Hora Zi es Jia (0)


        // Día Yi/Geng (1,6) -> Hora Zi es Bing (2)


        // Día Bing/Xin (2,7) -> Hora Zi es Wu (4)


        // Día Ding/Ren (3,8) -> Hora Zi es Geng (6)


        // Día Wu/Gui (4,9) -> Hora Zi es Ren (8)


        let primerTroncoHora;


        switch (dayTroncoIndex % 5) {


            case 0: primerTroncoHora = 0; break; // Jia, Ji


            case 1: primerTroncoHora = 2; break; // Yi, Geng


            case 2: primerTroncoHora = 4; break; // Bing, Xin


            case 3: primerTroncoHora = 6; break; // Ding, Ren


            case 4: primerTroncoHora = 8; break; // Wu, Gui


        }


        const troncoHoraIndex = (primerTroncoHora + ramaHoraIndex) % 10;





        return {


            tronco: TRONCOS_CELESTES[troncoHoraIndex],


            rama: RAMAS_TERRESTRES[ramaHoraIndex]


        };


    }





    getAllPillars() {


        return {


            year: this.getYearPillar(),


            month: this.getMonthPillar(),


            day: this.getDayPillar(),


            hour: this.getHourPillar()


        };


    }


}





// --- LÓGICA DE LA PÁGINA WEB ---


document.addEventListener('DOMContentLoaded', () => {


    const calculateBtn = document.getElementById('calculate-btn');


    const resultsContainer = document.getElementById('results-container');


    const birthDateInput = document.getElementById('birth-date');


    const birthTimeInput = document.getElementById('birth-time');


    const todayDateDisplay = document.getElementById('today-date-display');


    const userBaziChartDiv = document.getElementById('user-bazi-chart');


    const todayBaziChartDiv = document.getElementById('today-bazi-chart');


    const errorMessageDiv = document.getElementById('error-message');








    calculateBtn.addEventListener('click', () => {


        const birthDate = birthDateInput.value;


        const birthTime = birthTimeInput.value;





        if (!birthDate || !birthTime) {


            errorMessageDiv.classList.remove('hidden');


            resultsContainer.classList.add('hidden');


            return;


        }


        errorMessageDiv.classList.add('hidden');








        const fullDateTimeString = `${birthDate}T${birthTime}:00`;


        const userFullDateTime = new Date(fullDateTimeString);





        // Calcular carta del usuario


        const userCalculator = new BaZiCalculator(userFullDateTime);


        const userChart = userCalculator.getAllPillars();


        displayPillars(userBaziChartDiv, userChart);





        // Calcular carta de hoy


        const todayFullDateTime = new Date(); // Ahora mismo


        const todayCalculator = new BaZiCalculator(todayFullDateTime);


        const todayChart = todayCalculator.getAllPillars();


        displayPillars(todayBaziChartDiv, todayChart);


        


        todayDateDisplay.textContent = todayFullDateTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


        


        resultsContainer.classList.remove('hidden');


    });





    function displayPillars(containerElement, chartData) {


        containerElement.innerHTML = ''; // Limpiar contenido previo





        const pillarsOrder = ['year', 'month', 'day', 'hour'];


        const pillarTitles = {


            year: 'Año',


            month: 'Mes',


            day: 'Día',


            hour: 'Hora'


        };


        const pillarColors = { // Para el borde del título de la tarjeta del pilar


            year: 'border-amber-500',   // Tailwind amber-500


            month: 'border-green-500', // Tailwind green-500


            day: 'border-blue-500',    // Tailwind blue-500


            hour: 'border-red-500'     // Tailwind red-500


        };








        pillarsOrder.forEach(pillarKey => {


            const pillar = chartData[pillarKey];


            if (!pillar || !pillar.tronco || !pillar.rama) {


                console.error(`Datos incompletos para el pilar: ${pillarKey}`, pillar);


                const errorCard = document.createElement('div');


                errorCard.className = 'pillar-card';


                errorCard.innerHTML = `<div class="pillar-title ${pillarKey}">Pilar ${pillarTitles[pillarKey]}</div><div>Error en datos</div>`;


                containerElement.appendChild(errorCard);


                return; // Saltar este pilar si hay error


            }





            const pillarCard = document.createElement('div');


            pillarCard.className = 'pillar-card';


            


            pillarCard.innerHTML = `


                <div class="pillar-title ${pillarKey} ${pillarColors[pillarKey]}">${pillarTitles[pillarKey]}</div>


                <div class="tronco-celeste">


                    <div class="name-cn" style="color: ${getElementColor(pillar.tronco.elemento, true)}">${pillar.tronco.cn}</div>


                    <div class="name-es">${pillar.tronco.es}</div>


                </div>


                <div class="rama-terrestre">


                    <div class="name-cn" style="color: ${getElementColor(pillar.rama.elementoOcultoPrincipal, false)}">${pillar.rama.cn}</div>


                    <div class="name-es">${pillar.rama.animal}</div>


                </div>


            `;


            containerElement.appendChild(pillarCard);


        });


    }


    


    function getElementColor(elemento, isTronco) {


        // Colores más distintivos y con mejor contraste


        switch (elemento) {


            case 'Madera': return isTronco ? '#059669' : '#34D399'; // Verde esmeralda / Verde


            case 'Fuego': return isTronco ? '#DC2626' : '#F87171';  // Rojo / Rojo claro


            case 'Tierra': return isTronco ? '#D97706' : '#FBBF24'; // Ámbar / Amarillo


            case 'Metal': return isTronco ? '#6B7280' : '#9CA3AF';  // Gris / Gris claro


            case 'Agua': return isTronco ? '#2563EB' : '#60A5FA';   // Azul / Azul claro


            default: return '#4B5563'; // Gris oscuro por defecto


        }


    }





});

