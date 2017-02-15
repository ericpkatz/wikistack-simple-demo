const db = require('./db');

const server = require('http').createServer(require('./app'));

const port = process.env.PORT || 3000;

server.listen(port, ()=> console.log(`listening on ${port}`));

db.seed()
.then( ()=> console.log('your data is seeded'))
.catch( e => console.log(e));
