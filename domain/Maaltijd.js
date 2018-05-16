class Maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs, studentenhuisID) {
        this.naam = naam
        this.beschrijving = beschrijving
        this.ingredienten = ingredienten
        this.allergie = allergie
        this.prijs = prijs
        this.studentenhuisID = studentenhuisID
    }
    getNaam() {
        return this.naam
    }
    getBeschrijving() {
        return this.beschrijving
    }
    getIngredienten() {
        return this.ingredienten
    }
    getAllergie() {
        return this.allergie
    }
    getPrijs() {
        return this.prijs
    }

    getStudentenhuisID(){
        return this.studentenhuisID
    }
}

module.exports = Maaltijd