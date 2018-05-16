const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')


chai.should()
chai.use(chaiHttp)

Endpoint = '/api/studentenhuis'

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post(Endpoint)
            .set('x-access-token', 'test')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(Endpoint)
            .set('x-access-token', token)
            .send({
                'naam': 'Naam',
                'adres': 'Adres',
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('ID').which.is.a('number')
                response.should.have.property('Naam').which.is.a('string')
                response.should.have.property('Adres').which.is.a('string')
                response.should.have.property('Contact').which.is.a('string')
                response.should.have.property('Email').which.is.a('string')
                done()
            })
    })


    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(Endpoint)
            .set('x-access-token', token)
            .send({
                'adres': 'Adres',
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(Endpoint)
            .set('x-access-token', token)
            .send({
                'naam': 'test',
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('')
                done()
            })
    })
})



describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .get(Endpoint)
            .set('x-access-token', 'test')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(Endpoint)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('ID').which.is.a('number')
                response.should.have.property('Naam').which.is.a('string')
                response.should.have.property('Adres').which.is.a('string')
                response.should.have.property('Contact').which.is.a('string')
                response.should.have.property('Email').which.is.a('string')
                done()
            })
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(Endpoint)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('ID').which.is.a('number')
                response.should.have.property('Naam').which.is.a('string')
                response.should.have.property('Adres').which.is.a('string')
                response.should.have.property('Contact').which.is.a('string')
                response.should.have.property('Email').which.is.a('string')
                done()
            })
        done()
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(Endpoint + '/1')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('ID').which.equals('number')
                response.should.have.property('Naam').which.is.a('string')
                response.should.have.property('Adres').which.is.a('string')
                response.should.have.property('Contact').which.is.a('string')
                response.should.have.property('Email').which.is.a('string')
                done()
            })

    })

    it('should return an error when using an non-existing huisId', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .get(Endpoint + '/21233244224')
            .set('x-access-token', token)
            .send({
                'naam': 'test',
            })
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('object')
                done()
            })
    })

})


describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
            chai.request(server)
                .get(Endpoint)
                .set('x-access-token', 'test')
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.be.a('object')
                    done()
                })
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .put(Endpoint)
            .set('x-access-token', token)
            .send({
                'naam': 'Naam2',
                'adres': 'Adres',
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('ID').which.is.a('number')
                response.should.have.property('Naam').which.is.a('string')
                response.should.have.property('Adres').which.is.a('string')
                response.should.have.property('Contact').which.is.a('string')
                response.should.have.property('Email').which.is.a('string')
                done()
            })
    })

    it('should throw an error when naam is missing', (done) => {
        const token = require('./authentication.routes.test').token
        chai.request(server)
            .post(Endpoint)
            .set('x-access-token', token)
            .send({
                'adres': 'Adres',
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})