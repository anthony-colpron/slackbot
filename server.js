const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://anton:password1@ds141932.mlab.com:41932/slackbot";


app.use(bodyParser.json());

let dbo = '';

MongoClient.connect(url, (err,db)=>{
    if (err) throw err;

    dbo = db.db("slackbot")

})




app.post('/test', (req, res) => {

    // slack validate connection
   // res.send(req.body.challenge);
   

  let payload = req.body;
    res.sendStatus(200);

   

    dbo.collection("events").insertOne(payload, (err, result)=>{
      
      if (err) throw err;
      console.log("event stored to database")

    })

    if (payload.event.type === "app_mention") {
        console.log('RECEIVED EVENT:');
        console.log(payload);


        fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer xoxb-426320088134-428368238130-mOzBKQmAasWgqE022eziMfcO',
            },
            body: JSON.stringify({text: 'Hello!', channel: payload.event.channel})
        })
        .then(response => response.text())
        .then(response => {
         let parsedBody = JSON.parse(response);

        console.log('RECEIVED RESPONSE:');
        console.log(parsedBody);

        })

    }

    

})

app.listen(4000, () => {console.log('Server listening on port 4000')});