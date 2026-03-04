async function loadData(value) {
    const data = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${value}`)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    let container = document.querySelector("main");

    container.innerHTML = "";
    console.log(data);

    for(let i = 0 ; i < data.length ; i++) {
        let article = document.createElement("article");

        article.innerHTML = `<figure>
          <picture>
            <img src= ${data[i].image} alt = "Image pokémon"/>
          </picture>
          <figcaption>
            <span class="types">${data[i].apiTypes.map(type => type.name).reverse().join(' ')}</span>
            <h2>${data[i].name}</h2>
            <ol>
              <li>Points de vie : ${data[i].stats.HP}</li>
              <li>Attaque : ${data[i].stats.attack}</li>
              <li>Défense : ${data[i].stats.defense}</li>
              <li>Attaque spécial : ${data[i].stats.special_attack}</li>
              <li>Défense spécial : ${data[i].stats.special_defense}</li>
              <li>Vitesse : ${data[i].stats.speed}</li>
            </ol>
          </figcaption>
        </figure>`
        let type;

        if (data[i].apiTypes.length > 1) {
            type = data[i].apiTypes[1].name;
        } else {
            type = data[i].apiTypes[0].name;
        }
        switch(type) {
            case "Feu":
                article.style.backgroundColor = "#FF9C54";
                article.style.border = "10px solid #E25822";
                break;

            case "Eau":
                article.style.backgroundColor = "#58ABF6";
                article.style.border = "10px solid #2A6FDB";
                break;

            case "Plante":
                article.style.backgroundColor = "#8BD674";
                article.style.border = "10px solid #4CAF50";
                break;

            case "Électrik":
                article.style.backgroundColor = "#F2CB55";
                article.style.border = "10px solid #E6B800";
                break;

            case "Psy":
                article.style.backgroundColor = "#FF6FA9";
                article.style.border = "10px solid #D63384";
                break;

            case "Glace":
                article.style.backgroundColor = "#9AD6DF";
                article.style.border = "10px solid #4CB8C4";
                break;

            case "Combat":
                article.style.backgroundColor = "#D56723";
                article.style.border = "10px solid #A04000";
                break;

            case "Poison":
                article.style.backgroundColor = "#A040A0";
                article.style.border = "10px solid #6A1B9A";
                break;

            case "Sol":
                article.style.backgroundColor = "#D2B074";
                article.style.border = "10px solid #A1887F";
                break;

            case "Vol":
                article.style.backgroundColor = "#A890F0";
                article.style.border = "10px solid #6C63FF";
                break;

            case "Dragon":
                article.style.backgroundColor = "#7038F8";
                article.style.border = "10px solid #4B2C91";
                break;

            case "Ténèbres":
                article.style.backgroundColor = "#705848";
                article.style.border = "10px solid #3E2723";
                break;

            case "Fée":
                article.style.backgroundColor = "#EE99AC";
                article.style.border = "10px solid #EC407A";
                break;

            case "Roche":
                article.style.backgroundColor = "#B8A038";
                article.style.border = "10px solid #8D6E63";
                break;

            case "Insecte":
                article.style.backgroundColor = "#A8B820";
                article.style.border = "10px solid #7CB342";
                break;

            case "Spectre":
                article.style.backgroundColor = "#705898";
                article.style.border = "10px solid #512DA8";
                break;

            case "Acier":
                article.style.backgroundColor = "#B8B8D0";
                article.style.border = "10px solid #78909C";
                break;

            default:
                article.style.backgroundColor = "#EEE";
                article.style.border = "10px solid #999";
        }
        container.append(article);
    }
}

const select = document.querySelector('select');
loadData(select.value);

let value = document.querySelector("select");
value.addEventListener( "change", (e) => {
    loadData(e.target.value);
})
