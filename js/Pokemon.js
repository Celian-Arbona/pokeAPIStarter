import Type from "./Type.js";

export default class Pokemon {
    constructor(data) {
        this.id              = data.pokedex_id;
        this.image           = data.sprites.regular;
        this.name            = data.name.fr;
        this.apiTypes        = data.types.map(t => new Type(t));
        this.hp              = data.stats.hp;
        this.attack          = data.stats.atk;
        this.defense         = data.stats.def;
        this.special_attack  = data.stats.spe_atk;
        this.special_defense = data.stats.spe_def;
        this.speed           = data.stats.vit;
    }

    displayCard() {
        const borderColors = {
            "Feu":      "#E25822",
            "Eau":      "#2A6FDB",
            "Plante":   "#4CAF50",
            "Électrik": "#E6B800",
            "Psy":      "#D63384",
            "Glace":    "#4CB8C4",
            "Combat":   "#A04000",
            "Poison":   "#6A1B9A",
            "Sol":      "#A1887F",
            "Vol":      "#6C63FF",
            "Dragon":   "#4B2C91",
            "Ténèbres": "#3E2723",
            "Fée":      "#EC407A",
            "Roche":    "#8D6E63",
            "Insecte":  "#7CB342",
            "Spectre":  "#512DA8",
            "Acier":    "#78909C",
            "Normal":   "#6D6D4E",
        };

        const primaryType = this.apiTypes[0];
        const bgColor     = primaryType.color;
        const borderColor = borderColors[primaryType.name] ?? "#999999";

        const article = document.createElement("article");

        article.style.backgroundColor = bgColor;
        article.style.border          = `10px solid ${borderColor}`;

        article.innerHTML = `
        <figure>
          <picture>
            <img src="${this.image}" alt="Image de ${this.name}"/>
          </picture>
          <figcaption>
            <span class="types">
              ${this.apiTypes.map(type => type.name).join(' ')}
            </span>
            <h2>${this.name}</h2>
            <ol>
              <li>Points de vie : ${this.hp}</li>
              <li>Attaque : ${this.attack}</li>
              <li>Défense : ${this.defense}</li>
              <li>Attaque spéciale : ${this.special_attack}</li>
              <li>Défense spéciale : ${this.special_defense}</li>
              <li>Vitesse : ${this.speed}</li>
            </ol>
          </figcaption>
        </figure>
        `;

        return article;
    }
}
