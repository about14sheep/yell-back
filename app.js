const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRouter = require('./routes/user')
const pinsRouter = require('./routes/pins')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter)
app.use(pinsRouter)
app.get('/', (req, res) => {
    console.log('page got')
    res.send('did it')
})

const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, _ => console.log(`Listening on port ${port}`))