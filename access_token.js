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
/**
 * <think>
 * Okay, I need to add comprehensive JSDoc documentation to the function getAuthToken. Let me start by recalling what JSDoc tags are necessary. The user specified using @tags, so I should include @param, @returns, and maybe @example.
 * 
 * First, the function is called getAuthToken and takes a callBack parameter. The purpose of the function is probably to retrieve an authentication token, maybe from a server or some storage. I should describe that in the summary.
 * 
 * For the parameters, the callBack is a function. I need to document that. The type would be function, and maybe specify that it's a callback. Also, mention what arguments it receives. Maybe the callback takes an error and the token.
 * 
 * The return value: since it's a callback-based function, maybe it doesn't return anything directly. But JSDoc needs a @returns tag. So perhaps it returns void, or maybe the token? Wait, if it's using a callback, the function might not return the token directly. So the return type is void. But I should check. Alternatively, if the function is asynchronous, maybe it returns a Promise, but the current code doesn't show that. The original function is written as function getAuthToken(callBack), so it's using a callback pattern. So the return is void.
 * 
 * Now, the example. Need to show how to use it. Like, calling getAuthToken with a function that handles the result.
 * 
 * Also, make sure to include type information. For the callback parameter, maybe specify the function's parameters. Like (err: Error | null, token: string | null): void.
 * 
 * Wait, the parameters for the callback: maybe it's (error: Error | null, token: string | null) => void. So in the @param tag for callBack, I can describe it as a function that takes those parameters.
 * 
 * Putting it all together:
 * 
 * /**
 *  * Retrieves an authentication token using a callback-based approach.
 *  * @param {function} callBack - The callback function to handle the result.
 *  * @param {Error | null} callBack.err - An error object if an error occurs, otherwise null.
 *  * @param {string | null} callBack.token - The authentication token if successful, otherwise null.
 *  * @returns {void} 
 *  * @example
 *  * getAuthToken((err, token) => {
 *  *   if (err) {
 *  *     console.error('Failed to get token:', err);
 *  *   } else {
 *  *     console.log('Token retrieved:', token);
 *  *   }
 *  * });
 *  */
 * function getAuthToken(callBack) {
 *   // implementation here
 * }
 * 
 * Wait, but in JSDoc, the @param for the callback should specify the function's parameters. So maybe:
 * 
 * @param {function} callBack - The callback function to handle the result.
 * @param {Error | null} callBack.err - ...
 * @param {string | null} callBack.token - ...
 * 
 * But actually, the callBack parameter is a function, and its parameters are err and token. So the correct way is to document the callback's parameters. So the @param for callBack should describe the function's parameters. So maybe:
 * 
 * /**
 *  * @param {function} callBack - The callback function to handle the result.
 *  * @param {Error | null} callBack.err - ...
 *  * @param {string | null} callBack.token - ...
 *  */
 * 
 * Wait, no. The @param tag is for the parameters of the function. So the callBack parameter is a function, and its parameters are err and token. So in JSDoc, you can describe the function's parameters by using the function's parameters in the @param tag. So maybe:
 * 
 * /**
 *  * @param {function} callBack - The callback function to handle the result.
 *  * @param {Error | null} callBack.err - An error object if an error occurs, otherwise null.
 *  * @param {string | null} callBack.token - The authentication token if successful, otherwise null.
 *  * @returns {void}
 *  */
 * 
 * Wait, but that's not correct. The callBack is a function, and the parameters of that function are err and token. So the correct way is to describe the function's parameters. So the @param for callBack should be a function that takes (err, token) as parameters. So in JSDoc, you can write:
 * 
 * @param {function} callBack - The callback function to handle the result.
 * @param {Error | null} callBack.err - ...
 * @param {string | null} callBack.token - ...
 * 
 * But that's not the right syntax. The @param tag is for the parameters of the function getAuthToken. So the callBack parameter is a function. To describe the parameters of that function, you can use the function's parameters in the description. Alternatively, use the function type with parameters.
 * 
 * So perhaps:
 * 
 * /**
 *  * @param {function} callBack - The callback function to handle the result.
 *  * @param {Error | null} callBack.err - An error object if an error occurs, otherwise null.
 *  *
 */
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


