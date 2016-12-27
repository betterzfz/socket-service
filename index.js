const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('config');
const circular_json = require('circular-json');

const hostname = config.get('hostname');
const port = config.get('port');
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
    console.log('serving...');
    res.send('serving...');
});

app.get('/socket-service', (req, res) => {
    const SocketService = require('socket-service');
    socket_service = new SocketService(hostname, port);
    console.log(req);
    res.send(circular_json.stringify({socket_service : socket_service}));
});

app.use(express.static('public'))

io.on('connection', socket => {
    socket.on('register_action', data => {
        io.emit(data.action, data.data);
    });
});