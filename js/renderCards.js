import { isFavorite } from "./storage.js";

export function renderPokemons(list, container) {
    container.innerHTML = list
        .map(poke => `
  <div class="relative bg-white rounded-xl p-4 shadow hover:shadow-xl transition text-center">
    
    <button 
      onclick="toggleFavorite(${poke.id}); event.stopPropagation();"
      class="absolute top-3 right-3 text-xl"
    >
      <span id="fav-${poke.id}">
        ${isFavorite(poke.id) ? "❤️" : "🤍"}
      </span>
    </button>

    <div onclick="window.location.href='pokemon.html?id=${poke.id}'">
      <img src="${poke.sprite}" class="w-28 h-28 mx-auto mb-3 bg-gray-100 p-2 rounded-lg" />
      <h3 class="text-xl font-semibold capitalize mb-1">${poke.name}</h3>
      <p class="text-gray-600 text-sm">ID: ${poke.id}</p>
      <p class="text-gray-600 text-sm">Type: ${poke.types.join(", ")}</p>
    </div>
  </div>
`)
        .join("");
}
