export default class Type {
    constructor(data) {
        this.name  = data.name;
        this.image = data.image;
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        const colors = {
            "Feu":      "#FF9C54",
            "Eau":      "#58ABF6",
            "Plante":   "#8BD674",
            "Électrik": "#F2CB55",
            "Psy":      "#FF6FA9",
            "Glace":    "#9AD6DF",
            "Combat":   "#D56723",
            "Poison":   "#A040A0",
            "Sol":      "#D2B074",
            "Vol":      "#A890F0",
            "Dragon":   "#7038F8",
            "Ténèbres": "#705848",
            "Fée":      "#EE99AC",
            "Roche":    "#B8A038",
            "Insecte":  "#A8B820",
            "Spectre":  "#705898",
            "Acier":    "#B8B8D0",
            "Normal":   "#A8A878",
        };
        return colors[this.name] ?? "#EEEEEE";
    }
}
