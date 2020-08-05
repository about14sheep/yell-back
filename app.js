const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('ws');
const http = require('http');
const cors = require('cors');

const userRouter = require('./routes/users')
const pinsRouter = require('./routes/pins')
const userpinRouter = require('./routes/userpins');


const app = express();
const server = http.createServer(app)


app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use('/pins', pinsRouter)
app.use(userpinRouter)

app.get('/', (req, res) => {
    res.send('did it')
})

const port = parseInt(process.env.PORT, 10) || 8080;
server.listen(port, _ => console.log(`Listening on port ${port}`))




const configureWSS = _ => {
    const wss = new Server({ noServer: true });
    wss.on('connection', (socket, request) => {
        console.log(request.url)
        socket.on('message', message => {
            wss.clients.forEach(client => {
                console.log(message)
                client.send(message)
            })
        })
    })
    server.on('upgrade', function upgrade(req, socket, head) {
        wss.handleUpgrade(req, socket, head, function done(ws) {
            wss.emit('connection', ws, req)
        })

    })
}

//TODO: figure this websocket out brother

//configureWSS();
