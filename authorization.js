const SpotifyWebApi = require('spotify-web-api-node');
const redirectURI = require('./redirect_url');
const fs = require('fs-extra');

const spotifyApi = new SpotifyWebApi({ 
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET });

function getCode(callBack) {
    let access_Token, refresh_Token;

    redirectURI.getAuthCode((code) => {
      // Retrieve an access token and a refresh token
      const codeGrant = spotifyApi.authorizationCodeGrant(code);
      codeGrant.then((data) => {
          console.log('\nThe access token is:\n' + data.body['access_token']);
          console.log('expires in:\n' + data.body['expires_in']);
          
          console.log('\nThe refresh token is:\n' + data.body['refresh_token']);
      
          // Set the access token on the API object to use it in later calls
          // spotifyApi.setAccessToken(data.body['access_token']);
          // spotifyApi.setRefreshToken(data.body['refresh_token']);

          access_Token = data.body['access_token'];
          refresh_Token =  data.body['refresh_token'];

          const timer = new Date();

          fs.writeFile('/home/hactivist/Projects/Spotify-Assistant/timer.txt', timer, err => {
            if(err) {
              console.error('Error writing timestamp.', err);
              return
            }
            console.log('Time recorded.');

            //Writing refresh token to file
            fs.writeFile('/home/hactivist/Projects/Spotify-Assistant/refreshToken.txt', refresh_Token, err => {
              if (err) {
                console.error('Error writing refresh token.', err);
                return
              }

              console.log('\nSaved refresh token to refreshToken.txt');
              return callBack({ access_Token , refresh_Token });              
            });            
          });  
      });
      codeGrant.catch((err) => {
        console.log('CODE GRANT ERROR - Failed to obtain tokens.\n', err);
      });
    });    
}

function refreshToken(callBack) {
  fs.readFile('/home/hactivist/Projects/Spotify-Assistant/refreshToken.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    spotifyApi.setRefreshToken(data);
    console.log('Refresh token obtained successfully.');

    //spotifyApi.setRefreshToken(' REFRESH TOKEN ');
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken().then(
      function(data) {
        console.log('Access token refreshed successfully.');
        // Save the access token so that it's used in future calls
        //spotifyApi.setAccessToken(data.body['access_token']);

        return callBack(data.body['access_token']);
      },
      function(err) {
        console.log('Could not refresh access token', err);
      }
    );
  });
}

//getCode();
//refreshToken();

module.exports = { getCode , refreshToken }
