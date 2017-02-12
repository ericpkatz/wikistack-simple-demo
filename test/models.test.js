const expect = require('chai').expect;
const db = require('../db');

describe('Models', () => {
    beforeEach((done) => {
        db.seed()
            .then(() => done())
            .catch(e => done(e));
    });

    describe('Story', () => {
        let stories;
        beforeEach((done) => {
            db.models.Story.findAll()
                .then(_stories => stories = _stories)
                .then(() => done())
                .catch(e => done(e));
        });

        describe('seeded data', () => {
            it('there are 4 stories', () => {
                expect(stories.length).to.equal(4);
            });
        });
    });

    describe('User', () => {
        it('exists', () => {
            expect(db.models.User).to.be.ok;
        });

        describe('seeded data', () => {
            let users;
            beforeEach((done) => {
                db.models.User.findAll()
                    .then(_users => users = _users)
                    .then(() => done())
                    .catch(err => done(err));
            });
            it('there are two users', () => {
                expect(users.length).to.equal(2);
            });
            it(`will not let you add another mitch`, (done) => {
                db.models.User.create({ name: 'mitch' }).then(user => done(user)).catch(err => {
                    expect(err.message).to.equal('Validation error');
                    done();
                });
            });
            it(`will delete stories and users`, (done) => {
                db.models.User.destroy({ where: { name: 'mitch' } })
                    .then(() => db.models.User.findAll())
                    .then(returnedusers => expect(returnedusers.length).to.equal(1))
                    .then(() => db.models.Story.findAll())
                    .then(returnedStories => expect(returnedStories.length).to.equal(2))
                    .then(() => done())
                    .catch(done);
            });
        });
    });
});