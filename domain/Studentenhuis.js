const assert = require('assert')
const ApiError = require('../domain/ApiError')

class Studentenhuis {
    constructor(naam, adres) {
        try {
        assert(typeof(naam) === 'string', 'Naam must be a string')
        assert(typeof(adres) === 'string', 'Adres must be a string')
        } catch(ex) {
            throw(new ApiError(ex.toString(), 422))
        }

        this.naam = naam
        this.adres = adres
    }

    getNaam() {
        return this.naam
    }

    getAdres() {
        return this.adres
    }
}



module.exports = Studentenhuis