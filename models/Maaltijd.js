const assert = require('assert')
const ApiError = require('../models/ApiError')

class Maaltijd {
    constructor(naam, beschrijving, ingredienten, allergie, prijs, studentenhuisID) {
        try {
            assert(typeof(naam) === 'string', 'Naam must be a string')
            assert(typeof(beschrijving) === 'string', 'Beschrijving must be a string')
            assert(typeof(ingredienten) === 'string', 'Ingredienten must be a string')
            assert(typeof(allergie) === 'string', 'Allergie must be a string')
            assert(typeof(prijs) === 'number', 'Prijs must be a number')
        } catch (ex) {
            throw(new ApiError(ex.toString(), 422))
        }
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