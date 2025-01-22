const form = document.querySelector('form');

// Verificar que el botón exista antes de agregar el evento
if (form) {
    // Escuchar el clic del botón
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const pokeNameInput = document.getElementById("pokemonName");
        if (pokeNameInput) {
            const pokeName = pokeNameInput.value.trim();

            // Validar que el campo no esté vacío
            if (pokeName) {
                localStorage.setItem("pokeName", pokeName);
                const gotItem =localStorage.getItem("pokeName");
                alert(`Nombre guardado correctamente ${gotItem}`);
            } else {
                alert("Por favor, ingresa un nombre");
            }
        } else {
            console.error("El elemento con ID 'pokemonName' no existe.");
        }
    });
} else {
    console.error("El botón con la clase 'sendName' no existe.");
}

// Mostrar el estado al cargar la página
const statusText = localStorage.getItem("pokeName");
const statusElement = document.getElementById("status");
if (statusElement) {
    statusElement.innerHTML = statusText ? statusText : "No se ha guardado ningún nombre.";
}