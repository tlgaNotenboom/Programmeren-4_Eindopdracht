class MaaltijdResponse {
    constructor(ID, naam, beschrijving, ingredienten, allergie, prijs, userID, studentenhuisID) {
        this.ID = ID
        this.naam = naam
        this.beschrijving = beschrijving
        this.ingredienten = ingredienten
        this.allergie = allergie
        this.prijs = prijs
        this.userID = userID
        this.studentenhuisID = studentenhuisID
    }

    getChangeResponse() {
        let response = {
            Naam: this.naam,
            Beschrijving: this.beschrijving,
            Ingredienten: this.ingredienten,
            Allergie: this.allergie,
            Prijs: this.prijs  
        }
        return response
    }
    getDefaultResponse(){
        let response = {
            ID: this.ID,
            Naam: this.naam,
            Beschrijving: this.beschrijving,
            Ingredienten: this.ingredienten,
            Allergie: this.allergie,
            Prijs: this.prijs
        }
        return response
    }
}

module.exports = MaaltijdResponse