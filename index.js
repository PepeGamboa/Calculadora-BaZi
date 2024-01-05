document.getElementById('calcular').addEventListener('click', calcularFengShui);
document.getElementById('fecha').addEventListener('change', calcularFengShui);

function calcularFengShui() {
    const fechaInput = document.getElementById('fecha');
    const año = new Date(fechaInput.value).getFullYear();
    const signo = calcularSignoChino(año);
    const elemento = calcularElemento(año);

    document.getElementById('signo-chino').textContent = signo;
    document.getElementById('elemento').textContent = elemento;
    document.querySelector(".resultado-calculadora").classList.remove('oculto');
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' // Opcional: animación suave
    });
}

function calcularSignoChino(año) {
    const animales = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    return animales[(año - 4) % 12];
}

function calcularElemento(año) {
    const elementos = ['Madera', 'Fuego', 'Tierra', 'Metal', 'Agua'];
    const indice = Math.floor((año - 4) / 2) % elementos.length;
    return elementos[indice];
}

