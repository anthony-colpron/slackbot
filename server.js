const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/test', (req, res) => {


    let payload = req.body;
    res.sendStatus(200);

    if (payload.event.type === "app_mention") {
        
        fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer xoxb-426320088134-428368238130-mOzBKQmAasWgqE022eziMfcO',
            },
            body: JSON.stringify({text: 'Hello!', channel: payload.event.item.channel})
        })
        .then(response => {
            console.log(response);
        })

    }

    

})

app.listen(4000, () => {console.log('Server listening on port 4000')});