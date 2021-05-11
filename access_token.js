const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const options = {
    noColor: true
};

//Request Authorization
function getAuthToken(callBack) {
    const spotifyApi = new SpotifyWebApi({
        clientId: 'd579cfded6df4bb5982d76125025133e',
        clientSecret: '2c73c538026c4d1d9a82842736a0d575',
        redirectUri: 'https://b6c72807cbf7.ngrok.io/hooks/redirectURL'
    });
    
    const token = spotifyApi.clientCredentialsGrant();    
    token.then(data => {
        //return callBack(data.body['access_token']); 
        //console.log(spotifyApi.getAccessToken());
        return callBack(data.body['access_token']); 
    });
    token.catch(error => console.log('Authentication Failed.', error));   
}

module.exports = { getAuthToken };



