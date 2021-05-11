require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');
const getToken = require('./access_token');
const prettyjson = require('prettyjson');
const chalk = require('chalk');

const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const options = {
    noColor: true
};

const spotifyApi = new SpotifyWebApi();

console.log('------------Welcome to Spotify Assistant v1.0.0------------');

const promise = new Promise((resolve, reject) => {    
    getToken.getAuthToken(
        (authToken) => {        
            if (authToken) { 
                spotifyApi.setAccessToken(authToken);
                resolve('Authentication Successful');
            } else {                   
                reject('Failed to get AuthToken.');
            }            
        }       
    )
});

promise.then((message) => {
    console.log(message);
    requestCommand();
}).catch(err => {
	console.log(err);
})

function requestCommand() {
    readline.question('-pl => get playlists\n-me => get own info\n', inputCommand => {
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
        console.log('Information about authenticated user: ', data.body);        
    });
    get_me.catch(err => {
        console.log('Failed to get info.');
        //requestCommand();
    });
}

function getUser(user_name) {
    // Get a user
    const get_user = spotifyApi.getUser(user_name);
    get_user.then((data) => {
        console.log('Some information about this user: ', data.body);
    });
    get_user.catch((err) => {
        console.log('Failed to get info.', err);
    });
}
