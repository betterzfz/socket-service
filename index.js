const http = require('http');
const app = http.createServer((req, res) => {
    console.log('serving...');
    res.end('serving...');
});
const io = require('socket.io')(app);

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

io.on('connection', socket => {
    socket.on('add', data => {
        console.log(data);
        socket.emit('add', data);
    });
});

http.get({
    hostname: hostname,
    port: port,
    path: '/library/socket_service',
    agent: false
}, res => {
    console.log('ok');
});