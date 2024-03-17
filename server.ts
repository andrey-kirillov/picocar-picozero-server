// Importing the http module
// const http = require('http');
const axios = require('axios');
const WS = require('ws');

// host ip: 192.168.0.105
// Creating a server
// const server = http.createServer((req, res) => {
//   console.log({ url: req?.url });
//   // Setting the response header
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//
//   axios.get('https://www.ukr.net')
//     .then((response) => console.log('response: ', response))
//     .catch((e) => console.log('ERROR: ', e));
//
//   // Sending the response body
//   res.end('Hello, World!\n');
// });
//
// // Listening on port 3000
// const PORT = 8000;
// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });

/** Create Web Socket on provided port **/
const wsServer = new WS.Server({port: 9001});

/** Listen to connection **/
wsServer.on('connection', onConnect);
console.log('WS waiting for the connection...');

/** Connection event handler **/
function onConnect(wsClient: any) {
    console.log('new user connected', {wsClient});

    /** Message event handler **/
    wsClient.on('message', (message: any) => {
        console.log('new message came', message, JSON.parse(message));
        axios.post('http://192.168.0.105:80?cmd=' + JSON.parse(message).cmd)
        // .then((response) => console.log('response: ', response))
        .catch((e) => console.log('new message ERROR: ', e));
    });

    /** Close event handler **/
    wsClient.on('close', () => {
        console.log('user disconnected');
    });
}
