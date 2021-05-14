require('dotenv').config();

const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');

const options = {
    noColor: true,
    spaces: '\t'
};

const SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-top-read', 'user-read-private', 'user-read-email'];
const state = 'Test003';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

function getAuthCode(callBack) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/hooks/redirectURL', (req, res) => {
   
        res.send('Redirect Successful.')
        console.log('Redirect Successful.')

        return callBack(req.query['code']);              
    });

    const server = app.listen(5000, () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log(`Authenticating...` );
        console.log('Follow the URL below to authenticate Spotify Assistant');  

        // Create the authorization URL
        const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
        console.log('\n', authorizeURL, '\n');
    });
}

module.exports = { getAuthCode };
