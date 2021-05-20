require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
const getToken = require('./access_token');
const prettyjson = require('prettyjson');
const chalk = require('chalk');
//const fs = require('fs-extra');
const fs = require('fs');

const getAuth = require('./authorization');
const { RSA_PSS_SALTLEN_MAX_SIGN } = require('constants');

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

console.log('\n\n------------Welcome to Spotify Assistant v1.0.0------------');

const promise = new Promise((resolve, reject) => {    

    fs.readFile('./timer.txt', 'utf8' , (errTimer, dataTimer) => {
        if (errTimer) {
            console.error(errTimer)
            reject('Internal error occured.');
            return
        }

        if(dataTimer) {            
            const elapsed = new Date() - Date.parse(dataTimer);            
            const elapsedSec = elapsed/1000 ;          
    
            if(elapsedSec > 3599) {
                getAuth.refreshToken((access_token) => {
                    spotifyApi.setAccessToken(access_token);

                    fs.writeFile('./accessToken.txt', access_token, err => {
                        if(err) {
                            console.log('Failed to record access token.', err)
                            return
                        }
                        resolve('Token refreshed. Proceeding to Main Menu.\n')
                    });                   
                });
            } else {
                fs.readFile('./accessToken.txt', 'utf8', (err, data) => {
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

    // getAuth.getCode(
    //     (output) => {
    //         if(output.Atoken) {
    //             spotifyApi.setAccessToken(output.Atoken);
    //             console.log('Access token obtained.');                
    //         } else {
    //             console.error('Failed to get access token.');
    //             return
    //         }
    //         if(output.Rtoken) {
    //             spotifyApi.setRefreshToken(output.Rtoken);
    //             console.log('Refresh token obtained.');                
    //         } else {
    //             console.error('Failed to get refresh token.');
    //             return
    //         }

    //         if( spotifyApi.getAccessToken() && spotifyApi.getRefreshToken() ) {
    //             resolve('Authentication Successful.');  
    //         } else {
    //             reject('Authentication Failed.');
    //         }                                
    //     }
    // );

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
    readline.question('\tMAIN MENU \n-mp => my playlists [\'User ID\'] \n-sp => search playlist [\'Playlist Name\', \'User ID\']\n-me => my account [\'Your Spotify Username\']\n-bv => bring the vibe playlist [\'Friend 1\', \'Friend 2\', \'Friend 3\', \'Friend 4\', \'Friend 5\']\n\n', inputCommand => {
        readline.close();

        const cmd = inputCommand.substring(0, 3);
        switch (cmd) {
            case '-mp':
                if(inputCommand.length > 4) {
                    const user_id = inputCommand.substring(4, inputCommand.length);
                    getPlaylists(user_id, () => {
                        requestCommand();
                    });
                } else {
                    const user_id = null;
                    getPlaylists(user_id, () => {
                        requestCommand();
                    });
                }                
                break;
            case '-sp':
                let inputsPL = [];
                const input_params = inputCommand.substring(4, inputCommand.length);
                inputsPL = input_params.split(",");
                getPlaylist( inputsPL[0] , inputsPL[1] , () => {
                    requestCommand();
                });                                           
                break;
            case '-me':
                if(inputCommand.length > 4) {
                    const user_name = inputCommand.substring(4, inputCommand.length);
                    getUser(user_name, () => {
                        requestCommand();
                    });
                } else {
                    getMe(() => {
                        requestCommand();
                    });
                }       
                break;   
            case '-bv':
                let inputs = [];
                const input_parameters = inputCommand.substring(4, inputCommand.length);
                inputs = input_parameters.split(",");
                //console.log('INPUT PARAMETERS -',input_parameters);
                //console.log('INPUTS -',inputs);
                if(inputs.length < 2) {
                    console.error('Please enter at least 2 parameters.')
                } else {
                    console.log('Bringing the vibe...');
                    generatePlaylist(inputs, () => {
                        requestCommand();
                    });                    
                }                
                break;
            default:
                console.error(cmd+' is not a recognized command.');
                requestCommand();
                break;
        }     
    });
}

function getPlaylists( user_id , callBack ) {
    // Get a user's playlists
    const get_playlists = spotifyApi.getUserPlaylists(user_id);
    get_playlists.then((data) => {
        const items = data.body.items
        console.log(`\nYour playlists:\n`);
        console.log(items);

        return callBack();
    });
    get_playlists.catch((err) => {
        console.error('\nUnable to get playlists.\n', err);

        return callBack();
    });

    
}

function getPlaylist( list_name , user_id , callBack) {
    //const get_playlist = spotifyApi.getUserPlaylists('rnracjpa96xv3940tcul36fpj');
    const get_playlist = spotifyApi.getUserPlaylists(user_id);
    get_playlist.then((data) => {
        if(data.body == undefined) {
            console.error('\nPlaylist '+list_name+' not found.\nPlease check name and try again');
            //requestCommand();
            return callBack();
        } else {
            const items = data.body.items
            console.log('\nRetrieved playlist \''+list_name+'\':');
            console.log(items.find(item => {
                return item.name == list_name;
            }));
            //requestCommand();
            return callBack();
        }        
    });
    get_playlist.catch((err) => {
        console.error('\nFailed to get playlist.', err);
        //requestCommand();
        return callBack();
    })    
}

//Gets information about authenticated user
function getMe( callBack ) {
    // Get the authenticated user
    const get_me = spotifyApi.getMe();
    get_me.then(data => {
        console.log('Information about authenticated user:\n', data.body);    
        //requestCommand();    
        return callBack();
    });
    get_me.catch(err => {
        console.log('Failed to get info.\n', err);
        //requestCommand();
        return callBack();
    });    
}

function getUser(user_id, callBack) {
    // Get a user
    const get_user = spotifyApi.getUser(user_id);
    get_user.then((data) => {
        console.log(`\nFound user ${user_id}:\n`, data.body);
        //requestCommand();
        return callBack();
    });
    get_user.catch((err) => {
        console.log('\nFailed to get info.\n', err);
        //requestCommand();
        return callBack();
    });
   
}

function generatePlaylist(inputs, callBack) {
    /*
    const friend1 = inputs[0];
    let friend2, friend3, friend4, friend5;

    if(inputs[2] != undefined) {
        friend2 = inputs[1];
    }
    if(inputs[3] != undefined) {
        friend3 = inputs[2];
    }
    if(inputs[4] != undefined) {
        friend4 = inputs[3];
    }
    if(inputs[5] != undefined) {
        friend5 = inputs[4];
    }
    
    console.log('\nFriend 1 - ',friend1,'\nFriend 2 - ',friend2,'\nFriend 3 - ',friend3,'\nFriend 4 - ',friend4,'\nFriend 5 - ',friend5);

    // Get a User’s Top Tracks
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
    */



    // Add tracks to a playlist
    /*
    // Add tracks to a specific position in a playlist
    spotifyApi.addTracksToPlaylist('PLAYLIST_ID', ["spotify:track:TRACK_ID", "spotify:track:TRACK_ID"],
    {
        position : 5
    })
    .then(function(data) {
        console.log('Added tracks to playlist!');
    }, function(err) {
        console.log('Something went wrong!', err);
    });
    */



    //Get ID of the authenticated user
    let user_id;
    const get_me = spotifyApi.getMe();    
    get_me.then(data => {   
        user_id = data.body.id

        // After obtaining authenticated user's 'user_id', check if 'Bring the vibe' playlist exists in User playlists, if not, Create the playlist.   

        const get_playlists = spotifyApi.getUserPlaylists(user_id);
        get_playlists.then((data) => {
            const items = data.body.items
            let existing;            

            //Retrieve the playlist ID from the vibeID.txt file
            fs.readFile('/home/hactivist/Projects/Spotify-Assistant/vibeID.txt', 'utf8' , (errID, vibe_id) => {
                if(errID) {
                    console.error('Error reading vibe ID./n', errID)
                    return
                }                
                //If playlist ID is retrieved with a valid ID, use it, if null, use the playlist name to find the playlist.
                if(vibe_id) {
                    existing = items.find(item => {
                        return item.id == vibe_id;
                    });
                } else {
                    existing = items.find(item => {
                        return item.name == `Bring the vibe`;
                    });
                }
                //If the playlist exists, re-mix it
                if(existing) {
                    console.log(`Found \'Bring the vibe\' playlist.\n`, existing);
                    //return

                    console.log('\nRemix feature coming soon!\n');
                    //remix(inputs);


                } else {
                    // `Bring the vibe` doesn't exist in the authenticated user's playlists, therefore create it.
                    spotifyApi.createPlaylist('Bring the vibe', { 'description': 'WARNING: This playlist is art.', 'public': true }).then((data) => {                        
                        console.log('Created \'Bring the vibe\' playlist.\n', data.body);
                        const vibeID = data.body.id
    
                        fs.writeFile('/home/hactivist/Projects/Spotify-Assistant/vibeID.txt', vibeID, err => {
                            if (err) {
                                console.log('Error writing vibe ID.\n', err)
                                return
                            }
                            console.log('Vibe ID recorded.\n');

                            //At this point, we have successfully created the playlist, now add tracks to it.
                        

                            spotifyApi.addTracksToPlaylist( vibeID , track_list)
                            .then((data) => {
                                console.log('Your playlist is ready.\n\nHappy listening \t:) \n');
                                return callBack();
                            }, (err) => {
                                console.log('Internal error occured.\n', err);
                                return callBack();
                            });

                        });    
                    }, (err) => {
                        console.log('Internal error occured. Failed to create playlist.\n', err);
                        return callBack();
                    });  
                }
            });
        });
        get_playlists.catch((err) => {
            console.error('Internal error occured. Failed to get user playlists.\n', err);
            //requestCommand();
            return callBack();
        });
 
    });
    get_me.catch(err => {
        console.log('Internal error occured. Failed to get user ID.\n', err);
        //requestCommand();
        return callBack();
    }); 

    
}

function sortTracks(inputs) {
    let track_list = [];    

}