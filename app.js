const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const userRouter = require('./routes/user')
const pinsRouter = require('./routes/pins')

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use(pinsRouter)

app.get('/', (req, res) => {
    res.send('did it')
})

const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, _ => console.log(`Listening on port ${port}`))