# serve-socket
a socket service
#### environment
nodejs
#### deploy
* make a directory and put the project files into it.
* config `./config/default.json`, set `hostname` and `port`, like:
```json
{
    "hostname" : "127.0.0.1",
    "port" : 3000
}
```
* execute `npm install` in current directory to install the dependent `node package`.
* execute `node index.js` to start the service.
#### apply
* include two javascript file in the page which need socket service like this:
```html
<script src="http://127.0.0.1:3000/socket.io/socket.io.js"></script>
<script src="http://127.0.0.1:3000/socket-service.js"></script>
```
please set `hostname` and `port` equal to the value in `./config/default.json`.
* create a socket service object like below:
```javascript
const socket_service = new SocketService('127.0.0.1', '3000');
```
* register a event like below:
```javascript
socket_service.register('purchase', { id : 1, message : 'hello'});
```
`purchase` is event name, `{ id : 1, message : 'hello'}` is the data to be sent.
* apply the event like below:
```javascript
socket_service.apply('purchase', data => {
    console.log(data);
});
```
`purchase` is event name registered above, `data` is the data received.