const assert = require('assert')
const mysql = require('mysql')
const ApiError = require('../models/ApiError')
const db = require('../config/db')
const Deelnemer = require('models')
const DeelnemerResponse = require('../models/DeelnemerResponse')
const auth = require('../util/auth/authentication')

module.exports = {
    getMaaltijd(req, res, next) {
        let deelnemerList = []
        let deelnemerResponse = undefined
        db.query('SELECT * FROM deelnemers WHERE StudentenhuisID = '+ req.params.huisId +' AND MaaltijdID = '+ req.params.maaltijdId, (error, result) => {
            if (error) {
                next(new ApiError(error, 401))
            } else {
                console.log(result[0])
                for (let i = 0; i < result.length; i++) {
                    deelnemerResponse= new DeelnemerResponse(result[i].ID, result[i].Naam, result[i].Beschrijving, result[i].Ingredienten, result[i].Allergie, result[i].Prijs, result[i].UserID, result[i].StudentenHuisID)
                    maaltijdList.push(maaltijdResponse)
                }
                res.status(200).json(maaltijdList).end()
            }
        })

    },
    
    getSpecificMaaltijd(req, res, next) {
        db.query('SELECT * FROM maaltijd WHERE ID = ' + "'" + req.params.maaltijdId + "'", (error, result) => {
            if (error) {
                next(err(new ApiError, 401))
            } else {
                maaltijdResponse = new MaaltijdResponse(result[0].ID, result[0].Naam, result[0].Beschrijving, result[0].Ingredienten, result[0].Allergie, result[0].Prijs, result[0].UserID, result[0].StudentenHuisID)
                res.status(200).json(maaltijdResponse.getDefaultResponse())
            }
        })
    },

    updateMaaltijd(req, res, next) {
        let email
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload)=>{
            email = payload.sub.user
        })
        db.query('SELECT ID, Email FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
                    if (error) {
                        next(new ApiError(error, 404));
                    } else {
                            if (email !== result[0].Email) {
                                next(new ApiError(err, 409))
                            } else {
                                maaltijd = new Maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.params.huisId)
                                db.query('UPDATE maaltijd SET Naam = ' + "'" + maaltijd.getNaam() + "'" + ', Beschrijving = ' + "'" + maaltijd.getBeschrijving() + "'"+', Ingredienten = ' + "'" +maaltijd.getIngredienten() + "'"+', Allergie = '+ "'" + maaltijd.getAllergie()+"'"+', Prijs = '+"'"+ maaltijd.getPrijs()+"'"+', UserID = '+ "'" + result[0].ID +"'"+', StudentenhuisID = '+ "'"+maaltijd.getStudentenhuisID()+"' " + 'WHERE ID = ' + "'" + req.params.maaltijdId + "'", (error, result) => {
                                    if(error) {
                                        next(new ApiError(error, 404))
                                    } else {
                                        db.query('SELECT * FROM maaltijd WHERE ID = ' + "'" + req.params.maaltijdId + "'", (error, result) => {
                                            if (error) {
                                                next(new ApiError(error, 404))
                                            } else {
                                                maaltijdResponse = new MaaltijdResponse(result[0].ID, result[0].Naam, result[0].Beschrijving, result[0].Ingredienten, result[0].Allergie, result[0].Prijs, result[0].UserID, result[0].StudentenHuisID)
                                                res.status(200).json(maaltijdResponse.getDefaultResponse())
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                },
        
    deleteMaaltijd(req, res, next) {
        let email
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload)=>{
        email = payload.sub.user
        })
        db.query('SELECT Email FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
                    if (error) {
                        next(new ApiError(error, 404));
                    } else {
                            if (email !== result[0].Email) {
                                next(new ApiError(err, 409))
                            } else {
                                maaltijd = new Maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs)
                                db.query('DELETE FROM maaltijd ' + 'WHERE ID = ' + "'" + req.params.maaltijdId + "'", (error, result) => {
                                    if(error) {
                                        next(new ApiError(error, 404))
                                    } else {
                                        db.query('SELECT * FROM maaltijd WHERE ID = ' + "'" + req.params.maaltijdId + "'", (error, result) => {
                                            if (error) {
                                                next(new ApiError(error, 404))
                                            } else {
                                                res.status(200).json({
                                                    Deleted: 'YES'
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                },
    
    addMaaltijd(req, res, next) {
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload) => {
            email = payload.sub.user
        })
        console.log('Maaltijd.controller addMaaltijd ' + email)
        db.query('SELECT ID FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
            if (error) {
                next(error);
            } else {
                console.log(result[0].ID)
                maaltijd = new Maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.params.huisId)
                db.query('INSERT INTO maaltijd(Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES ('+ "'" + maaltijd.getNaam() + "'" + ' ,' + "'" + maaltijd.getBeschrijving() + "'"+', ' + "'" +maaltijd.getIngredienten() + "'"+', '+ "'" + maaltijd.getAllergie()+"'"+', '+"'"+ maaltijd.getPrijs()+"'"+', '+ "'" + result[0].ID +"'"+', '+ "'"+ maaltijd.getStudentenhuisID() + "')", function (error, rows, fields) {
                    if (error) {
                        next(new ApiError(error, 401));
                    } else {
                        db.query('SELECT * FROM maaltijd WHERE Naam = ' + "'" + maaltijd.getNaam() + "'" + ' AND UserID = ' + "'" + result[0].ID + "'", (error, result) => {
                            if (error) {
                                next(new ApiError(error, 404))
                            } else {
                                maaltijdResponse = new MaaltijdResponse(result[0].ID, result[0].Naam, result[0].Beschrijving, result[0].Ingredienten, result[0].Allergie, result[0].Prijs, result[0].UserID, result[0].StudentenHuisID)
                                res.status(200).json(maaltijdResponse.getChangeResponse()).end()
                            }
                        })
                    }
                })
            }
        })
    }

}