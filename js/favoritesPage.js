


import { getFavorites, saveFavorites } from "./storage.js";

const favorites = getFavorites();
const allPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
const container = document.getElementById("favorites-container");
const removeAllBtn = document.getElementById("removeAllBtn");

function renderFavorites() {
  const list = allPokemons.filter(p => favorites.includes(p.id));

  if (list.length === 0) {
    removeAllBtn.style.display = "none"
    container.innerHTML = `<h2 class="text-center text-gray-500 col-span-full text-xl">No favorites</h2>`;
    return;
  }

  container.innerHTML = list.map(poke => `
    <div class="relative bg-white rounded-xl p-4 shadow text-center">
      <button onclick="removeFavorite(${poke.id})" class="absolute top-3 right-3 text-red-600">✖</button>
      <div onclick="location.href='pokemon.html?id=${poke.id}'">
        <img src="${poke.sprite}" class="w-28 h-28 mx-auto mb-3 bg-gray-100 p-2 rounded-lg" />
        <h3 class="text-xl capitalize">${poke.name}</h3>
      </div>
    </div>
  `).join("");
}



window.removeFavorite = (id) => {
  const updated = favorites.filter(f => f !== id);
  saveFavorites(updated);
  location.reload();
};

removeAllBtn.addEventListener("click", () => {
  saveFavorites([]);
  location.reload();
});

renderFavorites();
