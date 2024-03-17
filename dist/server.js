var axios = require('axios');
var WS = require('ws');
var wsServer = new WS.Server({ port: 9001 });
wsServer.on('connection', onConnect);
console.log('WS waiting for the connection...');
function onConnect(wsClient) {
    console.log('new user connected', { wsClient: wsClient });
    wsClient.on('message', function (message) {
        console.log('new message came', message, JSON.parse(message));
        axios.post('http://192.168.0.105:80?cmd=' + JSON.parse(message).cmd)
            .catch(function (e) { return console.log('new message ERROR: ', e); });
    });
    wsClient.on('close', function () {
        console.log('user disconnected');
    });
}
