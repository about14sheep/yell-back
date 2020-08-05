const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('ws');
const http = require('http');
const logger = require('morgan')
const cors = require('cors');

const userRouter = require('./routes/users')
const pinsRouter = require('./routes/pins')
const userpinRouter = require('./routes/userpins');
const sessionRouter = require('./routes/session');

const app = express();
const server = http.createServer(app)


app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json())

app.use('/session', sessionRouter)
app.use(userRouter)
app.use('/pins', pinsRouter)
app.use(userpinRouter)

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




const configureWSS = _ => {
    const wss = new Server({ noServer: true });
    wss.on('connection', (socket, request) => {
        socket.on('message', message => {
            wss.clients.forEach(client => {
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

configureWSS();
