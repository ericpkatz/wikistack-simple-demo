const expect = require('chai').expect;
const client = require('supertest')(require('../app'));

const db = require('../db');

describe('routes', ()=> {
  describe('with seeded data', ()=> {
    describe('GET /foos', ()=> {
      it('returns 404', (done)=> {
        client.get('/foos')
          .expect(404)
          .then( ()=> done())
          .catch( e=> done(e));
      });
    });
    describe('GET /', ()=> {
      it('contains my stories', (done)=> {
        client.get('/')
          .expect(200)
          .then( result => expect(result.text).to.contain('foo'))
          .then ( ()=> done())
          .catch( e => done(e));
      });
    });

    describe('GET /prof', ()=> {
      it('no bazz', (done)=> {
        client.get('/users/prof')
          .expect(200)
          .then(result => {
            console.log(result);
            expect(result.text).not.to.contain('bazz');
            expect(result.text).to.contain('foo');
          })
          .then( ()=> done())
          .catch( e => done(e))
      });
    });
  });
});

