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
    const fs = require('fs');
    socket_service = new SocketService(hostname, port);
    for (i in socket_service) {
        console.log(i);
    }
    fs.writeFile(__dirname + '/public/serve-socket.js', 'const socket_service = ' + circular_json.stringify(socket_service), err => {
        if (err) {
            throw err;
        }
        res.sendFile('serve-socket.js', {
            root: __dirname + '/public/',
            dotfiles: 'deny',
            header: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }, err => {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            } else {
                console.log('Sent:socket-service.json');
            }
        });
    });
    // console.log(req);
    // res.send();
});

app.use(express.static('public'))

io.on('connection', socket => {
    socket.on('register_action', data => {
        io.emit(data.action, data.data);
    });
});