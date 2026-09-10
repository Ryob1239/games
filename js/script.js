// Filtro de búsqueda en tiempo real
const buscador = document.getElementById('buscador');
const tarjetas = document.querySelectorAll('.juego-item');

buscador.addEventListener('keyup', (e) => {
    const texto = e.target.value.toLowerCase();
    
    tarjetas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector('.titulo-juego').textContent.toLowerCase();
        if(titulo.includes(texto)) {
            tarjeta.style.display = 'flex';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});

// Toggle del Modo Oscuro
const btnTema = document.getElementById('btn-tema');
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    btnTema.textContent = document.body.classList.contains('modo-oscuro') ? '☀️ Claro' : '🌙 Oscuro';
});

// Despliegue de consejos
function toggleConsejo(id, boton) {
    const consejo = document.getElementById(id);
    consejo.classList.toggle('abierto');
    
    if(consejo.classList.contains('abierto')) {
        boton.textContent = 'Ocultar';
        boton.style.background = '#d63031';
        boton.style.color = '#fff';
    } else {
        boton.textContent = 'Ver Estrategia';
        boton.style.background = '';
        boton.style.color = '';
    }
}