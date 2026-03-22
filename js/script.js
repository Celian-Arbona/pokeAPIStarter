import Pokemon from "./Pokemon.js";

let currentData   = [];
let currentFilter = null;

async function loadData(value) {
    const rawData = await fetch(`https://tyradex.app/api/v1/gen/${value}`)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    currentData = rawData.map(p => new Pokemon(p));

    renderTypeButtons(currentData);
    applySortAndFilter();
}

function renderPokemons(pokemons) {
    const container = document.querySelector("main");
    container.innerHTML = "";

    const sortSelect = document.querySelector("#sort");
    const sortValue  = sortSelect ? sortSelect.value : "id";

    const sorted = [...pokemons].sort((a, b) => {
        switch (sortValue) {
            case "name":    return a.name.localeCompare(b.name);
            case "hp":      return b.hp - a.hp;
            case "atk":     return b.attack - a.attack;
            case "def":     return b.defense - a.defense;
            case "spe_atk": return b.special_attack - a.special_attack;
            case "spe_def": return b.special_defense - a.special_defense;
            case "vit":     return b.speed - a.speed;
            case "type":    return a.apiTypes[0].name.localeCompare(b.apiTypes[0].name);
            default:        return a.id - b.id;
        }
    });

    sorted.forEach(pokemon => container.append(pokemon.displayCard()));
}

function renderTypeButtons(pokemons) {
    const oldButtons = document.querySelector(".buttons");
    if (oldButtons) oldButtons.remove();

    const seenNames   = [];
    const uniqueTypes = [];

    pokemons.forEach(pokemon => {
        pokemon.apiTypes.forEach(type => {
            if (!seenNames.includes(type.name)) {
                seenNames.push(type.name);
                uniqueTypes.push(type);
            }
        });
    });

    const listButtons = document.createElement("div");
    listButtons.className = "buttons";

    const allBtn = document.createElement("button");
    allBtn.textContent = "Tous";
    allBtn.addEventListener("click", () => {
        currentFilter = null;
        applySortAndFilter();
    });
    listButtons.appendChild(allBtn);

    uniqueTypes.forEach(type => {
        const btn = document.createElement("button");
        btn.innerHTML             = `<img src="${type.image}" alt="${type.name}" width="40">`;
        btn.dataset.type          = type.name;
        btn.style.backgroundColor = type.color;

        btn.addEventListener("click", () => {
            currentFilter = type.name;
            applySortAndFilter();
        });

        listButtons.appendChild(btn);
    });

    document.querySelector("#filtre").insertAdjacentElement("beforeend", listButtons);
}

function applySortAndFilter() {
    const filtered = currentFilter
        ? currentData.filter(p => p.apiTypes.some(t => t.name === currentFilter))
        : currentData;

    renderPokemons(filtered);
}

const genSelect = document.querySelector("#gen");
loadData(genSelect.value);

genSelect.addEventListener("change", (e) => {
    currentFilter = null;
    loadData(e.target.value);
});

const sortSelect = document.querySelector("#sort");
if (sortSelect) {
    sortSelect.addEventListener("change", () => applySortAndFilter());
}
