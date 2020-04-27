const server = require('./server.js');

const Port = process.env.PORT || 4000;

server.listen(Port, () => {
    console.log(`Listening on Port ${Port}`)
});