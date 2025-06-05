
const form = document.getElementById("bazi-form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if (!fecha) return alert("Por favor selecciona una fecha válida.");

  // Simulación de pilares
  document.getElementById("pilar-anio").textContent = "戊辰 (Wu Chen)";
  document.getElementById("pilar-mes").textContent = "辛酉 (Xin You)";
  document.getElementById("pilar-dia").textContent = "乙丑 (Yi Chou)";
  document.getElementById("pilar-hora").textContent = hora ? "丙子 (Bing Zi)" : "—";

  resultado.classList.remove("oculto");
});
