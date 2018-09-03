const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/test', (req, res) => {



    res.send(req.body.challenge);

})

app.listen(4000, () => {console.log('Server listening on port 4000')});