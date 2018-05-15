class Studentenhuis {
    constructor(naam, adres) {
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