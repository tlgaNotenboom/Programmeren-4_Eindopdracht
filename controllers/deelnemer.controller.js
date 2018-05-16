const assert = require('assert')
const mysql = require('mysql')
const ApiError = require('../models/ApiError')
const db = require('../config/db')
const DeelnemerResponse = require('../models/DeelnemerResponse')
const auth = require('../util/auth/authentication')

module.exports = {
    getDeelnemer(req, res, next) {
        let deelnemerList = []
        let deelnemerResponse = undefined
        db.query('SELECT * FROM view_deelnemers WHERE StudentenhuisID = ' + req.params.huisId + ' AND MaaltijdID = ' + req.params.maaltijdId, (error, result) => {
            if (error) {
                next(new ApiError(error, 401))
            } else {
                console.log(result[0])
                for (let i = 0; i < result.length; i++) {
                    deelnemerResponse = new DeelnemerResponse(result[i].Voornaam, result[i].Achternaam, result[i].Email)
                    deelnemerList.push(deelnemerResponse)
                }
                res.status(200).json(deelnemerList).end()
            }
        })

    },

    deleteDeelnemer(req, res, next) {
        let email
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload) => {
            email = payload.sub.user
        })
        db.query('SELECT ID, Email FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
            if (error) {
                next(new ApiError(error, 404));
            } else {
                if (email !== result[0].Email) {
                    next(new ApiError(err, 409))
                } else {
                    console.log(result[0].ID)
                    db.query('DELETE FROM deelnemers ' + 'WHERE UserID = ' + "'" + result[0].ID + "'", (error, result) => {
                        if (error) {
                            next(new ApiError(error, 404))
                        } else {
                            res.status(200).json({
                                Deleted: 'YES'
                            })
                        }
                    })
                }
            }
        })
    },

    addDeelnemer(req, res, next) {
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload) => {
            email = payload.sub.user
        })
        console.log('Deelnemer.controller addDeelnemer ' + email)
        db.query('SELECT ID FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
            if (error) {
                next(error);
            } else {
                console.log(result[0])
                db.query('INSERT INTO deelnemers(UserID, StudentenhuisID, MaaltijdID) VALUES (' + "'" + result[0].ID + "'" + ' ,' + "'" + req.params.huisId + "'" + ', ' + "'" + req.params.maaltijdId + "')", function (error, rows, fields) {
                    if (error) {
                        next(new ApiError(error, 401));
                    } else {
                        db.query('SELECT * FROM view_deelnemers WHERE StudentenHuisID = '+ "'" + req.params.huisId + "'"+' AND MaaltijdID = '+ "'" + req.params.maaltijdId + "'", (error, result) => {
                            if (error) {
                                next(new ApiError(error, 404))
                            } else {
                                console.log(result[0])
                                deelnemerResponse = new DeelnemerResponse(result[0].Voornaam, result[0].Achternaam, result[0].Email)
                                console.log(deelnemerResponse.getDefaultResponse())
                                res.status(200).json(deelnemerResponse.getDefaultResponse()).end()
                            }
                        })
                    }
                })
            }
        })
    }

}