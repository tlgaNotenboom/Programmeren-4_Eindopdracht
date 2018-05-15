class StudentenhuisResponse {
    constructor(ID, naam, adres, contact, email) {
        this.ID = ID
        this.naam = naam
        this.adres = adres
        this.contact = contact
        this.email = email
    }

    getResponse() {
        let response = {
            ID: this.ID,
            Naam: this.naam,
            Adres: this.adres,
            Contact: this.contact,
            Email: this.email
        }
        return response
    }
}

module.exports = StudentenhuisResponse