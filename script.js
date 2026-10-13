let gatos = [];

const contenedorGatos = document.getElementById('contenedor-gatos');
const inputBuscador = document.getElementById('buscador');

// Cargar los datos del archivo JSON
async function cargarGatos() {
    try {
        const respuesta = await fetch('gatos.json');
        gatos = await respuesta.json();
        mostrarGatos(gatos);
    } catch (error) {
        console.error('Hubo un error al cargar los gatos:', error);
    }
}

// Función para pintar las tarjetas en HTML
function mostrarGatos(listaGatos) {
    contenedorGatos.innerHTML = '';

    if (listaGatos.length === 0) {
        contenedorGatos.innerHTML = '<p>No se encontraron gatitos 😿</p>';
        return;
    }

    listaGatos.forEach(gato => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-gato');

        tarjeta.innerHTML = `
            <img src="${gato.imagen}" alt="${gato.nombre}">
            <div class="info-gato">
                <h3>${gato.nombre}</h3>
                <p><strong>Raza:</strong> ${gato.raza}</p>
                <p><strong>Edad:</strong> ${gato.edad}</p>
                <p><strong>Personalidad:</strong> ${gato.personalidad}</p>
            </div>
        `;

        contenedorGatos.appendChild(tarjeta);
    });
}

// Filtrar en tiempo real
inputBuscador.addEventListener('input', e => {
    const texto = e.target.value.toLowerCase();
    const gatosFiltrados = gatos.filter(gato => 
        gato.nombre.toLowerCase().includes(texto) || 
        gato.raza.toLowerCase().includes(texto)
    );
    mostrarGatos(gatosFiltrados);
});

// Inicializar
cargarGatos();