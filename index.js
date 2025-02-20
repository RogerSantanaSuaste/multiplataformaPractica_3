const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

const pokemonOptions = document.getElementById("pokemonOptions");
const selectedCardContainer = document.getElementById("selected-cards");
const clearSelectionButton = document.getElementById("clear-selection");

// Fetching situations
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const extractPokemon = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return await res.json();
            })
        );
        renderTheseNuts(extractPokemon);
    } catch (error) {
        console.error('Se produjo un error al conectar con la API! Error:', error);
    }
}
//We've got the info, now time to make something with it. Less goooo dababy in da house


function renderTheseNuts(pokemones) {
    pokemonOptions.innerHTML = "";
    pokemones.forEach((pokemon) => {
        const pokeDiv = document.createElement("div");
        pokeDiv.className = "card poke-style col col-3 m-2 p-2";
        pokeDiv.classList.add("pokemon");
        const statsList = pokemon.stats
            .map(stat => `<li class="list-group-item">${stat.stat.name}: ${stat.base_stat}</li>`)
            .join("");

        pokeDiv.innerHTML = `
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="card-img-top" />
          <div class="card-body">
          <h3 class="card-title">${pokemon.name}</h3> 
          <ul class="list-group list-group-flush">${statsList}</ul>
          </div>
        `;

        pokeDiv.addEventListener("click", () => {
            addSelectedCard(pokemon);
        });

        pokemonOptions.appendChild(pokeDiv);
    }
    );
}

function addSelectedCard(item) {

    let selectedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];
    let statsList = item.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`)
    console.log("Parsed data:", selectedCards);


    selectedCards = [{
        id: item.id,
        name: item.name,
        image: item.sprites.front_default,
        stats: statsList
    }];


    localStorage.setItem("selectedCards", JSON.stringify(selectedCards));

    const selectedCardsRaw = localStorage.getItem("selectedCards");
    console.log("Raw data from localStorage:", selectedCardsRaw);

    renderTheseSelected();
}



function renderTheseSelected() {

    const selectedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];


    selectedCardContainer.innerHTML = "";

    selectedCards.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.className = "card poke-style col col-8 m-2 p-2";
        const statsList = card.stats
            .map(stat => `<li class="list-group-item">${stat}</li>`)
            .join("");

        cardDiv.innerHTML = `
        <img src="${card.image}" alt="${card.name} " class="card-img-top" />
        <div class="card-body">
        <h3 class="card-title">${card.name}</h3>
         <ul class="list-group list-group-flush">${statsList}</ul>
         </div>
      `;

        selectedCardContainer.appendChild(cardDiv);
    });
}

function init() {
    renderTheseSelected();
    getData(apiUrl);

    // Agregar evento al botón para limpiar la selección
    clearSelectionButton.addEventListener("click", clearSelectedCards);
}

function clearSelectedCards() {
    localStorage.removeItem("selectedCards");
    selectedCardContainer.innerHTML = "";
}

init();
