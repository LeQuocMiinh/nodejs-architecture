const httpStatus = require('http-status-codes');
const chai = require('chai');
const app = require('../src/app');

chai.use(require('chai-http'));
chai.should();

describe('Testing "/users" route', () => {
    it('Should respond to GET /users/123 with OK', done => {
        chai.request(app)
            .get('/users/123')
            .end((err, res) => {
                res.should.have.status(httpStatus.OK);
                res.body.should.have.nested
                    .property('data.id')
                    .to.be.equal('123');
                done();
            });
    });

    it('Should respond to POST /users/ with NOT_FOUND', done => {
        chai.request(app)
            .post('/users')
            .end((err, res) => {
                res.should.have.status(httpStatus.NOT_FOUND);
                done();
            });
    });
});
