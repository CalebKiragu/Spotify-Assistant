require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
const getToken = require('./access_token');
const prettyjson = require('prettyjson');
const chalk = require('chalk');
const fs = require('fs-extra');

const getAuth = require('./authorization');

const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const options = {
    noColor: true
};

const spotifyApi = new SpotifyWebApi({ 
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET });

console.log('------------Welcome to Spotify Assistant v1.0.0------------');

const promise = new Promise((resolve, reject) => {    

    fs.readFile('/home/hactivist/Projects/Spotify-Assistant/timer.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        if(data) {            
            const elapsed = new Date() - Date.parse(data);            
            const elapsedSec = elapsed/1000 ;          
    
            if(elapsedSec > 3599) {
                getAuth.refreshToken((access_token) => {
                    spotifyApi.setAccessToken(access_token);

                    fs.writeFile('/home/hactivist/Projects/Spotify-Assistant/accessToken.txt', access_token, err => {
                        if(err) {
                            console.log('Failed to record access token.', err)
                            return
                        }
                        resolve('Token refreshed. Proceeding to Main Menu.\n')
                    });                   
                });
            } else {
                fs.readFile('/home/hactivist/Projects/Spotify-Assistant/accessToken.txt', 'utf8', (err, data) => {
                    if(err) {
                        console.error('Failed to read access token.', err);
                        return
                    }
                    spotifyApi.setAccessToken(data);
                    resolve('Token obtained. Proceeding to Main Menu.');
                });
            }
        }
    });

    /* The below function is to be used on first instance of the application. */

    /*getAuth.getCode(
        ({ refresh_token , access_token }) => {
            if(access_token) {
                spotifyApi.setAccessToken(access_token);
                console.log('Access token obtained.');                
            } else {
                console.error('Failed to get access token.');
                return
            }
            if(refresh_token) {
                spotifyApi.setRefreshToken(refresh_token);
                console.log('Refresh token obtained.');                
            } else {
                console.error('Failed to get refresh token.');
                return
            }

            if( spotifyApi.getAccessToken() && spotifyApi.getRefreshToken() ) {
                resolve('Authentication Successful.');  
            } else {
                reject('Authentication Failed.');
            }                                
        }
    );*/

    /*getToken.getAuthToken(
        (authToken) => {        
            if (authToken) { 
                spotifyApi.setAccessToken(authToken);
                resolve('Authentication Successful');
            } else {                   
                reject('Failed to get AuthToken.');
            }            
        }       
    )*/

});

promise.then((message) => {
    console.log(message);
    requestCommand();
}).catch(err => {
	console.log(err);
})


function requestCommand() {
    readline.question('\tMAIN MENU\n-pl => get playlists [\'Name of playlist\' - optional parameter.]\n-me => get own info [\'Your Spotify Username\' - optional parameter.]\n-bv => bring the vibe playlist [\'Your Spotify Username\', \'Friend 1\', \'Friend 2\', \'Friend 3\', \'Friend 4\', \'Friend 5\']\n\n', inputCommand => {
        readline.close();

        const cmd = inputCommand.substring(0, 3);
        switch (cmd) {
            case '-pl':
                if(inputCommand.length > 4) {
                    const list_name = inputCommand.substring(4, inputCommand.length);
                    getPlaylist(list_name);
                } else {
                    getPlaylists(); 
                }                                   
                break;
            case '-me':
                if(inputCommand.length > 4) {
                    const user_name = inputCommand.substring(4, inputCommand.length);
                    getUser(user_name);
                } else {
                    getMe();
                }       
                break;   
            case '-bv':
                let inputs = [];
                const input_parameters = inputCommand.substring(4, inputCommand.length);
                inputs = input_parameters.split(", ");
                console.log('INPUT PARAMETERS -',input_parameters);
                console.log('INPUTS -',inputs);
                if(inputs.length < 2) {
                    console.error('Please enter at least 2 parameters.')
                } else {
                    console.log('Bringing the vibe...');
                    generatePlaylist(inputs);                    
                }                
                break;
            default:
                console.error(cmd+' is not a recognized command.');
                requestCommand();
                break;
        }     
    });
}

function getPlaylists() {
    // Get a user's playlists    
    const get_playlists = spotifyApi.getUserPlaylists('rnracjpa96xv3940tcul36fpj');
    get_playlists.then((data) => {
        const items = data.body.items
        console.log('Retrieved playlists: ');
        console.log(items);
        //requestCommand();
    });
    get_playlists.catch((err) => {
        console.error('Unable to get playlists', err);
        //requestCommand();
    });
}

function getPlaylist(list_name) {
    const get_playlist = spotifyApi.getUserPlaylists('rnracjpa96xv3940tcul36fpj');
    get_playlist.then((data) => {
        if(data.body == undefined) {
            console.error('Playlist '+list_name+' not found.\nPlease check name and try again');
            //requestCommand();
        } else {
            const items = data.body.items
            console.log('Retrieved playlist \''+list_name+'\':');
            console.log(items.find(item => {
                return item.name == list_name;
            }));
            //requestCommand();
        }        
    });
    get_playlist.catch((err) => {
        console.error('Failed to get playlist.', err);
        //requestCommand();
    })
}

//BUGGY
function getMe() {
    // Get the authenticated user
    const get_me = spotifyApi.getMe();
    get_me.then(data => {
        console.log('Information about authenticated user:\n', data.body);        
    });
    get_me.catch(err => {
        console.log('Failed to get info.\n', err);
        //requestCommand();
    });
}

function getUser(user_name) {
    // Get a user
    const get_user = spotifyApi.getUser(user_name);
    get_user.then((data) => {
        console.log('Some information about this user:\n', data.body);
    });
    get_user.catch((err) => {
        console.log('Failed to get info.\n', err);
    });
}

function generatePlaylist(inputs) {
    const user_name = inputs[0];
    const friend1 = inputs[1];
    let friend2, friend3, friend4, friend5;

    if(inputs[2] != undefined) {
        friend2 = inputs[2];
    }
    if(inputs[3] != undefined) {
        friend3 = inputs[3];
    }
    if(inputs[4] != undefined) {
        friend4 = inputs[4];
    }
    if(inputs[5] != undefined) {
        friend5 = inputs[5];
    }
    
    console.log('Username - ',user_name,'\nFriend 1 - ',friend1,'\nFriend 2 - ',friend2,'\nFriend 3 - ',friend3,'\nFriend 4 - ',friend4,'\nFriend 5 - ',friend5);

    /* Get a User’s Top Tracks*/
    const top_tracks = spotifyApi.getMyTopTracks();
    top_tracks.then((data) => {
        let result = data.body;
        console.log('Result:\n',result,'\n');
        let topTracks = data.body.items;
        console.log('\nYour top tracks:\n',topTracks);
    });
    top_tracks.catch((err) => {
        console.log('Something went wrong!', err);
    });

}