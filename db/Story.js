const db = require('./db');

const Story = db.define('story', {
    title: db.Sequelize.STRING,
    content: db.Sequelize.TEXT,
    tags: {
        type: db.Sequelize.ARRAY(db.Sequelize.STRING),
        defaultValue: []
    }
}, {
    getterMethods: {
        summary: function() {
            return this.content.slice(0, 4).toString() + '...';
        },
    },
    classMethods: {
        createStory: function(name, { title, content, tags }) {
            return db.models.user.findOne({ where: { name } })
                .then(user => {
                    return user || db.models.user.create({ name });
                })
                .then(user => db.models.story.create({ title, content, tags, userId: user.id }));
        }
    }
});

module.exports = Story;