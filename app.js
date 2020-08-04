const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('ws');
const http = require('http');
const cors = require('cors');

const userRouter = require('./routes/user')
const pinsRouter = require('./routes/pins')
const userpinRouter = require('./routes/userpins');


const app = express();
const server = http.createServer(app)
const wss = new Server({
    server,
    path: '/pins/:id',
    clientTracking: true,
});
wss.on('connection', socket => {
    console.log('got client')

    socket.on('message', message => {
        wss.clients.forEach(client => {
            client.send(message)
        })
    })
})
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use(pinsRouter)
app.use(userpinRouter)

app.get('/', (req, res) => {
    res.send('did it')
})

const port = parseInt(process.env.PORT, 10) || 8080;
server.listen(port, _ => console.log(`Listening on port ${port}`))


