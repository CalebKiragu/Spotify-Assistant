require('dotenv').config();

const prettyjson = require('prettyjson');
const express = require('express');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs-extra');

const options = {
    noColor: true
};

//Request Authorization
function getAuthToken(callBack) {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID ,
        clientSecret: process.env.CLIENT_SECRET,
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

/* TEST CODE */

/*getAuthToken((accessToken) => {
    fs.writeFile('/home/hactivist/Projects/Spotify-Assistant/accessToken.txt', accessToken, err => {
        if(err) {
            console.log('Failed to record access token.', err)
            return
        }
        //resolve('Access Token refreshed. Proceeding to Main Menu.\n')
        console.log('Access token saved.');
    }); 
})*/

module.exports = { getAuthToken };



