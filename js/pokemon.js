
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  document.getElementById("details").innerHTML = "<h2>No Pokémon found</h2>";
  throw new Error("No ID provided");
}

async function getPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return await res.json();
}


function getTypeColor(type) {
  const colors = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500 text-black",
    bug: "bg-lime-600",
    normal: "bg-gray-400",
    poison: "bg-purple-600",
    ground: "bg-amber-700",
    fairy: "bg-pink-400",
    fighting: "bg-orange-600",
    psychic: "bg-fuchsia-500",
    rock: "bg-yellow-700",
    ghost: "bg-indigo-600",
    ice: "bg-cyan-400",
    dragon: "bg-purple-800",
    dark: "bg-gray-800",
    steel: "bg-slate-500",
    flying: "bg-sky-400",
  };
  return colors[type] || "bg-gray-500";
}

function getStatColor(value) {
  if (value < 50) return "bg-red-500";
  if (value < 80) return "bg-yellow-400";
  return "bg-green-500";
}



function render(poke) {
  const container = document.getElementById("details");

  const types = poke.types.map(t => t.type.name);
  const img = poke.sprites.other["official-artwork"].front_default;


  container.innerHTML = `
    <div class="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-200">
      
      <div class="flex flex-col items-center">
        
        <div class="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center shadow-inner mb-6">
          <img src="${img}" alt="${poke.name}" class="w-32 h-32 object-contain" />
        </div>

        <h1 class="text-4xl font-bold capitalize text-gray-800">${poke.name}</h1>
        <p class="text-gray-600 mt-1 text-lg">#${poke.id}</p>

        <div class="flex gap-3 mt-4">
          ${types
      .map(type => `
              <span class="px-4 py-1 rounded-full text-white text-sm font-semibold 
              ${getTypeColor(type)}">
                ${type}
              </span>
            `)
      .join("")}
        </div>

        <h2 class="text-2xl font-semibold mt-8 mb-3 text-gray-800 ">Stats</h2>

        <div class="w-full space-y-3">
          ${poke.stats
      .map(s => {
        return `
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="capitalize font-medium text-gray-700">${s.stat.name}</span>
                    <span class="text-gray-700 font-semibold">${s.base_stat}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
           <div 
  class="h-2 rounded-full stat-bar ${getStatColor(s.base_stat)}"
  
  style="--final-width:${s.base_stat / 2}%;">
</div>
                </div>
              `;
      })
      .join("")}
        </div>

        <button onclick="history.back()" 
          class="mt-10 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
          Back
        </button>
      </div>
    </div>
  `;
}

async function renderPokemon() {
  const container = document.getElementById("details");

  try {

    const cache = JSON.parse(localStorage.getItem("pokemonDetails")) || {};

    if (cache[id]) {
      render(cache[id]);
      return;
    }


    const poke = await getPokemon(id);

    cache[id] = poke;
    localStorage.setItem("pokemonDetails", JSON.stringify(cache));

    render(poke);

  } catch (err) {
    container.innerHTML = `<h2 class="text-red-600">Failed to load Pokémon</h2>`;
    console.error(err);
  }
}

renderPokemon();


// A commen