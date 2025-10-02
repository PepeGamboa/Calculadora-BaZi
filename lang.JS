// Traducciones
const translations = {
  es: {
    title: "Calculadora BaZi 八字",
    subtitle: "Cuatro Pilares del Destino",
    intro: "Ingresa tu fecha y hora de nacimiento para generar tu carta BaZi.",
    labelDate: "Fecha de Nacimiento:",
    labelTime: "Hora de Nacimiento:",
    btnCalc: "Calcular Pilares",
    userChart: "Tu Carta BaZi",
    todayChart: "Carta BaZi del Día de Hoy",
    error: "⚠️ Ingresa una fecha y hora válidas."
  },
  en: {
    title: "BaZi Calculator 八字",
    subtitle: "Four Pillars of Destiny",
    intro: "Enter your birth date and time to generate your BaZi chart.",
    labelDate: "Birth Date:",
    labelTime: "Birth Time:",
    btnCalc: "Calculate Pillars",
    userChart: "Your BaZi Chart",
    todayChart: "Today's BaZi Chart",
    error: "⚠️ Please enter a valid date and time."
  },
  de: {
    title: "BaZi Rechner 八字",
    subtitle: "Vier Säulen des Schicksals",
    intro: "Geben Sie Ihr Geburtsdatum und Ihre Geburtszeit ein, um Ihr BaZi-Diagramm zu erstellen.",
    labelDate: "Geburtsdatum:",
    labelTime: "Geburtszeit:",
    btnCalc: "Säulen Berechnen",
    userChart: "Dein BaZi-Diagramm",
    todayChart: "Heutiges BaZi-Diagramm",
    error: "⚠️ Bitte gültiges Datum und Uhrzeit eingeben."
  },
  it: {
    title: "Calcolatrice BaZi 八字",
    subtitle: "Quattro Pilastri del Destino",
    intro: "Inserisci la tua data e ora di nascita per generare la tua carta BaZi.",
    labelDate: "Data di nascita:",
    labelTime: "Ora di nascita:",
    btnCalc: "Calcola i Pilastri",
    userChart: "La tua Carta BaZi",
    todayChart: "Carta BaZi di Oggi",
    error: "⚠️ Inserisci una data e un'ora valide."
  },
  fr: {
    title: "Calculatrice BaZi 八字",
    subtitle: "Quatre Piliers du Destin",
    intro: "Entrez votre date et heure de naissance pour générer votre carte BaZi.",
    labelDate: "Date de naissance:",
    labelTime: "Heure de naissance:",
    btnCalc: "Calculer les Piliers",
    userChart: "Votre Carte BaZi",
    todayChart: "Carte BaZi d'Aujourd'hui",
    error: "⚠️ Veuillez entrer une date et une heure valides."
  }
};

// Estado inicial
let currentLang = "es";

// Cambiar idioma
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.getElementById("title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("intro").textContent = t.intro;
  document.getElementById("label-date").textContent = t.labelDate;
  document.getElementById("label-time").textContent = t.labelTime;
  document.getElementById("calculate-btn").textContent = t.btnCalc;
  document.getElementById("user-chart-title").textContent = t.userChart;
  document.getElementById("today-chart-title").firstChild.textContent = t.todayChart + " ";
  document.getElementById("error-message").textContent = t.error;

  // Actualizar menú
  const flagMap = { es: "🇪🇸", en: "🇬🇧", de: "🇩🇪", it: "🇮🇹", fr: "🇫🇷" };
  document.getElementById("lang-flag").textContent = flagMap[lang];
  document.getElementById("lang-code").textContent = lang.toUpperCase();
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-btn");
  const langMenu = document.getElementById("lang-menu");

  langBtn.addEventListener("click", () => {
    langMenu.classList.toggle("hidden");
  });

  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
      langMenu.classList.add("hidden");
    });
  });

  // Toggle modo oscuro
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
});
