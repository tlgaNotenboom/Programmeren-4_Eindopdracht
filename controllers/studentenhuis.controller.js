const mysql = require('mysql')
const token = req.header('x-access-token') || ""
let userID
var email

var payload = auth.decodeToken(token, (err, payload)=>{
    email = payload.sub.user
})

function addStudentenhuis(req, res, next){
    console.log('studentenhuis.controller addStudentenhuis')
    findUserID();
    db.query('INSERT INTO studentenhuis(Naam, Adres, UserID) VALUES ('+req.body.name+', '+ req.body.address+ ', '+userID+')', function (error, rows, fields) {
        if (error) {
            next(error);
        } else {
            res.status(200).json({
                status: {
                    query: 'OK'
                },
                result: rows
            }).end()
        }
    })
}

function findUserID(){
    db.query('SELECT '+"'"+'ID '+"'"+ 'FROM '+"'"+'user '+"'"+'WHERE Email = '+ email, function(error, result){
        if (error) {
            next(error);
        } else {
            res.status(200).json({
                status: {
                    query: 'OK'
                },  
                userID = results[0].ID
            })
        } 
    })
}