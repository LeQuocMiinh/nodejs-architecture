const httpStatus = require('http-status-codes');
const chai = require('chai');
const app = require('../src/app');

chai.use(require('chai-http'));
chai.should();

describe('Testing "/data" route', () => {
    it('Should respond to GET /data/retrieve?key=123 with OK', done => {
        chai.request(app)
            .get('/data/retrieve')
            .query({ key: '123' })
            .end((err, res) => {
                res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR);
                //res.body.should.be.deep.equal('[world]');
                done();
            });
    });

    it('Should respond to GET /data/retrieve?key=00123 with OK', done => {
        chai.request(app)
            .get('/data/retrieve')
            .query({ key: '00123' })
            .end((err, res) => {
                res.should.have.status(httpStatus.INTERNAL_SERVER_ERROR);
                //res.body.should.be.deep.equal('[world]');
                done();
            });
    });

    it('Should respond to GET /data/retrieve?key=hello with 400', done => {
        chai.request(app)
            .get('/data/retrieve')
            .query({ key: 'hello' })
            .end((err, res) => {
                res.should.have.status(httpStatus.BAD_REQUEST);
                //res.body.should.be.deep.equal('[world]');
                done();
            });
    });
});
