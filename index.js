const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
    console.log('serving...');
    res.send('serving...');
});

io.on('connection', socket => {
    socket.on('register_action', data => {
        console.log(data);
        socket.emit(data.action, data.data);
    });
});