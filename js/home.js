



import { getPokemons, getPokemonDetails, searchPokemon } from "./api.js";
import { getCachedPokemons, savePokemons } from "./storage.js";
import { renderPokemons } from "./renderCards.js";


const container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

let detailedPokemons = getCachedPokemons();

if (detailedPokemons.length === 0) {
  const pokemons = await getPokemons(); // name ,url 
  const details = await Promise.all(pokemons.map(p => getPokemonDetails(p.url)));

  detailedPokemons = details.map(p => ({
    id: p.id,
    name: p.name,
    sprite: p.sprites.front_default,
    types: p.types.map(t => t.type.name)
  }));

  savePokemons(detailedPokemons);
}

renderPokemons(detailedPokemons, container);

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  renderPokemons(detailedPokemons, container);
});

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  const result = await searchPokemon(query);
  searchInput.value = "";

  if (!result) {
    container.innerHTML = `<h2 class="text-center text-red-600 text-xl">Not Found</h2>`;
    return;
  }

  const formatted = {
    id: result.id,
    name: result.name,
    sprite: result.sprites.front_default,
    types: result.types.map(t => t.type.name)
  };

  renderPokemons([formatted], container);
}
  