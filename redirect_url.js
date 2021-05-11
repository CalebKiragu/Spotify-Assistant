const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');

const options = {
    noColor: true,
    spaces: '\t'
};

// create an express app and configure it with bodyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create our webhook endpoint to receive redirected data from Spotify
app.post('/hooks/redirectURL', (req, res) => {
    console.log('-----------Received Re-directed Data-----------');
	
    //format and dump the recieved data in the terminal    
    console.log(prettyjson.render(req.body, options)); 
    console.log('-----------------------');

    //RUN CHECKS TO ENSURE DATA IS VALID THEN RESPOND APPROPRIATELY
    /*
    let message = {
    "ResponseCode": "0",
    "ResponseDesc": "Success"
    };
	
    // respond with a success message
    res.json(message);
    */

    fs.writeFile('./redirect.json', req.body, {'flag':'a+'}, (err) => {
        console.log(err);
    });

});

const server = app.listen(5000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Re-direct URL server listening on port ${port}` );
});