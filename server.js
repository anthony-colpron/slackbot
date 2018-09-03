const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.json());

app.post('/test', (req, res) => {


    let payload = req.body;
    res.sendStatus(200);

    console.log(payload.event.item.channel);

    if (payload.event.type === "app_mention") {
        
        fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer xoxb-426320088134-428368238130-mOzBKQmAasWgqE022eziMfcO',
            },
            body: JSON.stringify({text: 'Hello!', channel: 'test'})
        })
        .then(response => response.text())
        .then(response => {
            let parsedBody = JSON.parse(response);

            console.log(parsedBody);

        })

    }

    

})

app.listen(4000, () => {console.log('Server listening on port 4000')});