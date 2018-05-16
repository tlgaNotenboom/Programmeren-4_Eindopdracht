const assert = require('assert')
const ApiError = require('../models/ApiError')
const db = require('../config/db')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        // console.log('validateToken called')

        /**
         * A token can be sent in the body of a request, via a query parameter (in the URL),
         * or as an HTTP header. We choose the header variant.
         */
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                const error = new ApiError(err.message || err, 401)
                next(error)
            } else {
                console.log('Authenticated! Payload = ')
                console.dir(payload)

                /**
                 * The payload contains the values that were put in it via the sub-field.
                 * We could use those in our application to trace actions that a user performs, 
                 * such as monitor CRUD operations, by storing the user ID in a logging database.
                 * Example: User 12345 performed an update operation on item xyz on date dd-mm-yyyy.
                 * To do so, we attach the payload.sub (or only a part of that) to the request object.
                 * In this way, every next express handler has access to it - and could do 
                 * something smart with it.  
                 */
                req.user = payload.sub
                next()
            }
        })
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted.
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res The token, additional user information, and status 200 when valid.
     * @param {*} next ApiError when token is invalid.
     */

    login(req, res, next) {

        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(validateEmail(req.body.email.trim()), 'email must be a valid emailaddress')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
            assert(req.body.password.trim().length > 2, 'password must be at least 3 characters')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        // Verify that the email exists and that the password matches the email.
        let email
        db.query('SELECT * FROM user WHERE Email = ' + "'" + req.body.email + "'", (error, rows, fields) => {
            if (error) {
                next(new ApiError(error, 401));
            } else {
                if (req.body.password === rows[0].Password) {
                    // console.log('passwords DID match, sending valid token')
                    // Create an object containing the data we want in the payload.
                    const payload = {
                        user: rows[0].Email,
                        role: 'admin, user'
                    }
                    // User info returned to the caller.
                    const userInfo = {
                        token: auth.encodeToken(payload),
                        email: req.body.email
                    }
                    res.status(200).json(userInfo).end()
                } else {
                    // console.log('passwords DID NOT match')
                    console.log(rows[0])
                    next(new ApiError('Invalid credentials, bye.', 401))
                }
            }
        })
    },

    /**
     * Register a new user. The user should provide a firstname, lastname, emailaddress and 
     * password. The emailaddress should be unique when it exists, an error must be thrown.
     * The password will be encrypted by the Person class and must never be stored as plain text! 
     * 
     * @param {*} req The incoming request, containing valid properties.
     * @param {*} res The created user on success, or error on invalid properties.
     * @param {*} next ApiError when supplied properties are invalid.
     */
    register(req, res, next) {

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(validateEmail(req.body.email.trim()), 'email must be a valid emailaddress')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
            assert(req.body.password.trim().length > 2, 'password must be at least 3 characters')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        db.query('INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES (' +
            "'" + req.body.firstname + "'" + ', ' +
            "'" + req.body.lastname + "'" + ', ' +
            "'" + req.body.email + "'" + ', ' +
            "'" + req.body.password + "'" + ')', (error, rows) => {
                if (error) {
                    next(new ApiError(error, 401))
                } else {
                    console.log("added user")
                }
            })


        // Unique email person was added to the list.
        // Choices we can make here: 
        // - return status OK, user must issue separate login request, or
        // - return valid token, user is immediately logged in.

        // Create an object containing the data we want in the payload.
        const payload = {
            user: req.body.email,
            role: 'studentenhuis_user'
        }
        // Userinfo returned to the caller.
        const userInfo = {
            token: auth.encodeToken(payload),
            email: req.body.email
        }
        res.status(200).json(userInfo).end()

    }
}

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}