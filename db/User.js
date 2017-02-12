const db = require('./db');

const User = db.define('user', {
    name: {
        type: db.Sequelize.STRING,
        unique: true
    }
});

module.exports = User;