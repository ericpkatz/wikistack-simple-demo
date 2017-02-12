const app = require('express').Router();
const db = require('../db');

module.exports = app;

app.post('/', (req, res, next) => {
    let name = req.body.name;
    let title = req.body.title;
    let content = req.body.content;
    let tags = req.body.tag.split(',');

    db.models.Story.createStory(name, { title, content, tags })
        .then(() => res.redirect('/'))
        .catch(err => next(err));
});

app.get('/tag/:tag', (req, res, next) => {
    db.models.Story.findAll({
            where: { tags: { $contains: [req.params.tag] } },
            include: [db.models.User]
        })
        .then(stories => res.render('tag', { tag: req.params.tag, stories }))
        .catch(e => next(e));
});

app.get('/:title', (req, res, next) => {
    let story;
    db.models.Story.findOne({
            where: { title: req.params.title },
            include: [db.models.User]
        })
        .then(_story => {
            story = _story;
            return db.models.Story.findAll({
                where: {
                    userId: story.userId,
                    id: { $ne: story.id }
                }
            });
        })
        .then(stories => res.render('story', { story, stories }))
        .catch(e => next(e));
});