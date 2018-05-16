const mysql = require('mysql')
const auth = require('../util/auth/authentication')
const db = require('../config/db')
const assert = require('assert')
const ApiError = require('../models/ApiError')
const Studentenhuis = require('../models/Studentenhuis')
const StudentenhuisResponse = require('../models/StudentenhuisResponse')
let userID
var email

module.exports = {
        addStudentenhuis(req, res, next) {
            const token = req.header('x-access-token') || ""
            var payload = auth.decodeToken(token, (err, payload) => {
                email = payload.sub.user
            })
            console.log('studentenhuis.controller addStudentenhuis')
            db.query('SELECT ID FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
                if (error) {
                    next(error);
                } else {
                    studentenhuis = new Studentenhuis(req.body.naam, req.body.adres)
                    db.query('INSERT INTO studentenhuis(Naam, Adres, UserID) VALUES (' + "'" + studentenhuis.getNaam() + "'" + ', ' + "'" + studentenhuis.getAdres() + "'" + ', ' + "'" + result[0].ID + "'" + ')', function (error, rows, fields) {
                        if (error) {
                            next(new ApiError(error, 401));
                        } else {
                            db.query('SELECT * FROM view_studentenhuis WHERE Naam = ' + "'" + studentenhuis.getNaam() + "'" + ' AND Adres = ' + "'" + studentenhuis.getAdres() + "'", (error, result) => {
                                if (error) {
                                    next(new ApiError(error, 404))
                                } else {
                                    studentenhuisResponse = new StudentenhuisResponse(result[0].ID, result[0].Naam, result[0].Adres, result[0].Contact, result[0].Email, )
                                    res.status(200).json(studentenhuisResponse.getResponse()).end()
                                }
                            })
                        }
                    })
                }
            })
        },

        getStudentenHuis(req, res, next) {
            let studenthuisList = []
            db.query('SELECT * FROM view_studentenhuis', (error, result) => {
                if (error) {
                    next(new ApiError(error, 401))
                } else {
                    for (let i = 0; i < result.length; i++) {
                        studenthuisList.push(new StudentenhuisResponse(result[i].ID, result[i].Naam, result[i].Adres, result[i].Contact, result[i].Email))
                    }
                    res.status(200).json(studenthuisList)
                }
            })

        },

        getSpecificStudentenHuis(req, res, next) {
            db.query('SELECT * FROM view_studentenhuis WHERE ID = ' + "'" + req.params.huisId + "'", (error, result) => {
                if (error) {
                    next(new ApiError(error, 401))
                } else {
                    studentenhuisResponse = new StudentenhuisResponse(result[0].ID, result[0].Naam, result[0].Adres, result[0].Contact, result[0].Email)
                    res.status(200).json(studentenhuisResponse)
                }
            })
        },

        updateStudentenHuis(req, res, next) {
            let email
        const token = req.header('x-access-token') || ""
        var payload = auth.decodeToken(token, (err, payload)=>{
            email = payload.sub.user
            db.query('SELECT Email FROM user WHERE Email = ' + "'" + email + "'", function (error, result) {
                        if (error) {
                            next(new ApiError(error, 404));
                        } else {
                                if (email !== result[0].Email) {
                                    next(new ApiError(err, 409))
                                } else {
                                    studentenhuis = new Studentenhuis(req.body.naam, req.body.adres)
                                    db.query('UPDATE studentenhuis SET Naam = ' + "'" + studentenhuis.getNaam() + "'" + ', Adres = ' + "'" + studentenhuis.getAdres() + "'" + 'WHERE ID = ' + "'" + req.params.huisId + "'", (error, result) => {
                                        if(error) {
                                            next(new ApiError(error, 404))
                                        } else {
                                            db.query('SELECT * FROM view_studentenhuis WHERE ID = ' + "'" + req.params.huisId + "'", (error, result) => {
                                                if (error) {
                                                    next(new ApiError(error, 404))
                                                } else {
                                                    studentenhuisResponse = new StudentenhuisResponse(result[0].ID, result[0].Naam, result[0].Adres, result[0].Contact, result[0].Email)
                                                    res.status(200).json(studentenhuisResponse)
                                                }
                                            })
                                        }
                                    })
                                    
                                }
                            }
                        })
                    })
            },
            
            deleteStudentenhuis(req, res, next) {
            db.query('SELECT Email FROM user WHERE ID = ' + "'" + req.params.huisId + "'", function (error, result) {
                if (error) {
                    next(new ApiError(error, 404));
                } else {
                    const token = req.header('x-access-token') || ""
                    var payload = auth.decodeToken(token, (err, payload) => {
                        let email = payload.sub.user
                        if (email !== result[0].Email) {
                            next(new ApiError(err, 409))
                        } else {
                            studentenhuis = new Studentenhuis(req.body.name, req.body.address)
                            db.query('DELETE FROM studentenhuis WHERE ID = ' + "'" + req.params.huisId + "'", (error, result) => {
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
            })
        }
    }
    
        
        
    