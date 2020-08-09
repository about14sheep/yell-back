const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app)

const userRouter = require('./routes/users')
const pinsRouter = require('./routes/pins')
const userpinRouter = require('./routes/userpins');
const sessionRouter = require('./routes/session');
const msgRouter = require('./routes/messages')
const { Message } = require('./models')
const wss = new WebSocket.Server({ noServer: true });
const clients = new Map()


app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json())

app.use('/session', sessionRouter);
app.use('/users', userRouter);
app.use('/pins', pinsRouter);
app.use('/messages', msgRouter);
app.use('/userpins', userpinRouter)

app.use((_req, _res, next) => {
    next(createError(404))
})

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    if (err.status === 401) {
        res.set('WWW-Authenticate', 'Bearer');
    }
    res.json({
        message: err.message,
        error: JSON.parse(JSON.stringify(err))
    })
})

app.get('/', (req, res) => {
    res.send('did it')
})

const port = parseInt(process.env.PORT, 10) || 8080;
server.listen(port, _ => console.log(`Listening on port ${port}`))

const configureWSS = async _ => {
    wss.on('connection', (socket, request) => {
        socket.on('message', async message => {
            const msg = JSON.parse(message)
            if (msg.type === 'SEND_USERS') {
                clients.set(socket, msg.data.pinId)
            }
            if (msg.type === 'chatMessage') {
                wss.clients.forEach(client => {
                    if (clients.get(client) === msg.data.pinId) {
                        client.send(message)
                    }
                })
            }
        })
        socket.on('close', async _ => {
            clients.delete(socket)
        })
    })
    server.on('upgrade', function upgrade(req, socket, head) {
        wss.handleUpgrade(req, socket, head, function done(ws) {
            wss.emit('connection', ws, req)
        })
    })
}

configureWSS();
