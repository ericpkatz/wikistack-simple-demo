const chai = require('chai');
const client = require('supertest')(require('../app'));
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const db = require('../db');

describe('routes', () => {
    describe('with seeded data', () => {
        describe('GET /foos', () => {
            it('returns 404', (done) => {
                client.get('/foos')
                    .expect(404)
                    .then(() => done())
                    .catch(e => done(e));
            });
        });
        describe('GET /', () => {
            it('contains my stories', (done) => {
                client.get('/')
                    .expect(200)
                    .then(result => expect(result.text).to.contain('foo'))
                    .then(() => done())
                    .catch(e => done(e));
            });
        });

        describe('GET /prof', () => {
            it('no bazz', (done) => {
                client.get('/users/prof')
                    .expect(200)
                    .then(result => {
                        expect(result.text).not.to.contain('bazz');
                        expect(result.text).to.contain('foo');
                    })
                    .then(() => done())
                    .catch(e => done(e))
            });
        });

        describe('Get /stories/:title', () => {
            it('returns Foo', (done) => {
                chai.spy.on(db.models.Story, 'findOne');
                chai.spy.on(db.models.Story, 'findAll');
                client.get('/stories/Foo')
                    .expect(200)
                    .then(result => {
                        expect(result.text).to.contain('Foo');
                    })
                    .then(() => {
                        expect(db.models.Story.findOne).to.have.been.called();
                        expect(db.models.Story.findOne).to.have.been.called.exactly(1);

                        expect(db.models.Story.findAll).to.have.been.called();
                        expect(db.models.Story.findAll).to.have.been.called.exactly(1);
                    })
                    .then(() => done())
                    .catch(done);
            });
        });
    });
});