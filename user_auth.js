const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: 'd579cfded6df4bb5982d76125025133e',
    clientSecret: '2c73c538026c4d1d9a82842736a0d575',
    redirectUri: 'https://b6c72807cbf7.ngrok.io/hooks/redirectURL'
});

const token = spotifyApi.clientCredentialsGrant();

token.then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log(spotifyApi.getAccessToken());
});

token.catch(error => console.log('Something went wrong when retrieving an access token', error));



