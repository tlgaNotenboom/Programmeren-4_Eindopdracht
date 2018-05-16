class DeelnemerResponse {

    constructor(voornaam, achternaam, email){
        this.voornaam = voornaam,
        this.achternaam = achternaam,
        this.email = email
    }

    getDefaultResponse(){
        let response = {
            voornaam: this.voornaam,
            achternaam: this.achternaam,
            email: this.email
        }
        return response
    }
}
module.exports = DeelnemerResponse