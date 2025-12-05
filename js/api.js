// name,url 
/**
 * 
 * @param {*} offset 
 * @param {*} limit 
 * @returns url , name
 */
export async function getPokemons(offset = 0, limit = 20) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    if (!res.ok) throw new Error("Something went wrong");
    return (await res.json()).results;
}

export async function getPokemonDetails(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch details");
    return await res.json();
}

/**
 * 
 * @param {*} name 
 * @returns 
 */
export async function searchPokemon(name) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}



export async function getPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon by ID");
    return await res.json();
}