let currentData = [];

async function loadData(value) {
    const data = await fetch(`https://tyradex.app/api/v1/gen/${value}`)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    currentData = data;
    renderPokemons(data);
    renderTypeButtons(data);
    applySortAndFilter();
}

function renderPokemons(data) {
    let container = document.querySelector("main");
    container.innerHTML = "";

    const sortSelect = document.querySelector("#sort");
    const sortValue = sortSelect ? sortSelect.value : "id";

    const sorted = [...data].sort((a, b) => {
        switch (sortValue) {
            case "name": return a.name.fr.localeCompare(b.name.fr);
            case "hp": return b.stats.hp - a.stats.hp;
            case "atk": return b.stats.atk - a.stats.atk;
            case "def": return b.stats.def - a.stats.def;
            case "spe_atk": return b.stats.spe_atk - a.stats.spe_atk;
            case "spe_def": return b.stats.spe_def - a.stats.spe_def;
            case "vit": return b.stats.vit - a.stats.vit;
            case "type": return a.types[0].name.localeCompare(b.types[0].name);
            default: return a.pokedex_id - b.pokedex_id;
        }
    });

    for (let i = 0; i < sorted.length; i++) {
        let article = document.createElement("article");

        article.innerHTML = `
        <figure>
          <picture>
            <img src="${sorted[i].sprites.regular}" alt="Image pokémon"/>
          </picture>
          <figcaption>
            <span class="types">
                ${sorted[i].types.map(type => type.name).join(' ')}
            </span>
            <h2>${sorted[i].name.fr}</h2>
            <ol>
              <li>Points de vie : ${sorted[i].stats.hp}</li>
              <li>Attaque : ${sorted[i].stats.atk}</li>
              <li>Défense : ${sorted[i].stats.def}</li>
              <li>Attaque spécial : ${sorted[i].stats.spe_atk}</li>
              <li>Défense spécial : ${sorted[i].stats.spe_def}</li>
              <li>Vitesse : ${sorted[i].stats.vit}</li>
            </ol>
          </figcaption>
        </figure>
        `;

        switch (sorted[i].types[0].name) {
            case "Feu":       article.style.backgroundColor = "#FF9C54"; article.style.border = "10px solid #E25822"; break;
            case "Eau":       article.style.backgroundColor = "#58ABF6"; article.style.border = "10px solid #2A6FDB"; break;
            case "Plante":    article.style.backgroundColor = "#8BD674"; article.style.border = "10px solid #4CAF50"; break;
            case "Électrik":  article.style.backgroundColor = "#F2CB55"; article.style.border = "10px solid #E6B800"; break;
            case "Psy":       article.style.backgroundColor = "#FF6FA9"; article.style.border = "10px solid #D63384"; break;
            case "Glace":     article.style.backgroundColor = "#9AD6DF"; article.style.border = "10px solid #4CB8C4"; break;
            case "Combat":    article.style.backgroundColor = "#D56723"; article.style.border = "10px solid #A04000"; break;
            case "Poison":    article.style.backgroundColor = "#A040A0"; article.style.border = "10px solid #6A1B9A"; break;
            case "Sol":       article.style.backgroundColor = "#D2B074"; article.style.border = "10px solid #A1887F"; break;
            case "Vol":       article.style.backgroundColor = "#A890F0"; article.style.border = "10px solid #6C63FF"; break;
            case "Dragon":    article.style.backgroundColor = "#7038F8"; article.style.border = "10px solid #4B2C91"; break;
            case "Ténèbres":  article.style.backgroundColor = "#705848"; article.style.border = "10px solid #3E2723"; break;
            case "Fée":       article.style.backgroundColor = "#EE99AC"; article.style.border = "10px solid #EC407A"; break;
            case "Roche":     article.style.backgroundColor = "#B8A038"; article.style.border = "10px solid #8D6E63"; break;
            case "Insecte":   article.style.backgroundColor = "#A8B820"; article.style.border = "10px solid #7CB342"; break;
            case "Spectre":   article.style.backgroundColor = "#705898"; article.style.border = "10px solid #512DA8"; break;
            case "Acier":     article.style.backgroundColor = "#B8B8D0"; article.style.border = "10px solid #78909C"; break;
            default:          article.style.backgroundColor = "#EEE";    article.style.border = "10px solid #999";
        }

        container.append(article);
    }
}

function renderTypeButtons(data) {
    const oldButtons = document.querySelector(".buttons");
    if (oldButtons) oldButtons.remove();

    let listTypes = [];
    let listTypeIcons = [];

    for (let i = 0; i < data.length; i++) {
        data[i].types.forEach(type => {
            if (!listTypes.includes(type.name)) {
                listTypes.push(type.name);
                listTypeIcons.push(type.image);
            }
        });
    }

    const listButtons = document.createElement("div");
    listButtons.className = "buttons";

    const allBtn = document.createElement("button");
    allBtn.textContent = "Tous";
    allBtn.addEventListener("click", () => {
        currentFilter = null;
        applySortAndFilter();
    });
    listButtons.appendChild(allBtn);

    for (let i = 0; i < listTypes.length; i++) {
        const typeBtn = document.createElement("button");
        typeBtn.innerHTML = `<img src="${listTypeIcons[i]}" alt="${listTypes[i]}" width="40">`;
        typeBtn.dataset.type = listTypes[i];

        typeBtn.addEventListener("click", () => {
            currentFilter = listTypes[i];
            applySortAndFilter();
        });

        listButtons.appendChild(typeBtn);
    }

    const filtre = document.querySelector("#filtre");
    filtre.insertAdjacentElement("beforeend", listButtons);
}

let currentFilter = null;

function applySortAndFilter() {
    let filtered = currentFilter
        ? currentData.filter(p => p.types.some(t => t.name === currentFilter))
        : currentData;

    renderPokemons(filtered);
}

const select = document.querySelector("#gen");
loadData(select.value);
select.addEventListener("change", (e) => {
    currentFilter = null;
    loadData(e.target.value);
});

const sortSelect = document.querySelector("#sort");
if (sortSelect) {
    sortSelect.addEventListener("change", () => {
        applySortAndFilter();
    });
}