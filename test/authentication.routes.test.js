/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const registerEndpoint = '/api/register'

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName ',
                'lastname': ' LastName ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')

                // Export the aquired token for other testcases.
                validToken = res.body.token
                module.exports = {
                    token: validToken
                }
                done()
            })
    })


    it('should return an error on GET request', (done) => {
        chai.request(server)
            .get(registerEndpoint)
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })

    })


    it('should throw an error when the user already exists', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName ',
                'lastname': ' LastName ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end()

        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName2 ',
                'lastname': ' LastName2 ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(409)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'lastname': ' LastName ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': 'a',
                'lastname': ' LastName ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when no lastname is provided', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName ',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName ',
                'lastname': 'a',
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when email is invalid', (done) => {
        chai.request(server)
            .post(registerEndpoint)
            .send({
                'firstname': ' FirstName ',
                'lastname': 'lastname',
                'email': 'tst@test',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

})

let loginEndpoint = '/api/login'

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post(loginEndpoint)
            .send({
                'email': 'tst@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')
                response.should.have.property('email').which.is.a('string')
                done()
            })
    })

    it('should throw an error when email does not exist', (done) => {
        chai.request(server)
            .post(loginEndpoint)
            .send({
                'email': 'tstsssssss@test.com',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        chai.request(server)
            .post(loginEndpoint)
            .send({
                'email': 'tst@test.com',
                'password': 'ssssecret'
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when using an invalid email', (done) => {
        chai.request(server)
            .post(loginEndpoint)
            .send({
                'email': 'tst@test',
                'password': 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })
})