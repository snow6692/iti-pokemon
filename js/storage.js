export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(favs) {
    localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id) {
    const favs = getFavorites();
    return favs.includes(id);
}

export function toggleFavorite(id) {
    let favs = getFavorites();


    if (isFavorite(id)) {

        favs = favs.filter(f => f !== id);
    } else {
        favs.push(id);
    }

    saveFavorites(favs);

    const heart = document.getElementById(`fav-${id}`);
    if (heart) {
        heart.textContent = isFavorite(id) ? "❤️" : "🤍";
    }
}

export function getCachedPokemons() {
    return JSON.parse(localStorage.getItem("pokemons")) || [];
}

export function savePokemons(data) {
    localStorage.setItem("pokemons", JSON.stringify(data));
}


export function getCachedPokemonDetails() {
    return JSON.parse(localStorage.getItem("pokemonDetails")) || {};
}

export function savePokemonDetails(cache) {
    localStorage.setItem("pokemonDetails", JSON.stringify(cache));
}


window.toggleFavorite = toggleFavorite;
