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

const scopes = ['user-follow-read', 'user-follow-modify', 'user-top-read', 'user-read-recently-played', 'user-read-playback-position', 'user-read-currently-playing', 'playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative', 'user-library-read', 'user-library-modify', 'user-read-private', 'user-read-email'];
const state = 'Scope_Modification';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

/**
 * <think>
 * Okay, I need to add comprehensive JSDoc documentation to the function getAuthCode. Let me start by recalling what JSDoc is. It's a documentation generator for JavaScript, right? So the goal is to write comments that follow the JSDoc syntax with appropriate tags like @param, @returns, etc.
 * 
 * First, the function is called getAuthCode and takes a parameter called callBack. The user mentioned that the function's purpose needs to be described. So I should start with a brief description of what the function does. Maybe something like "Retrieves an authentication code from the server."
 * 
 * Next, the parameters. The function has one parameter, callBack. I need to document that. The @param tag is used for parameters. Since it's a function, I should specify the type. So @param {Function} callBack - The callback function to handle the response.
 * 
 * Then, the return value. The function might return something, but the original code doesn't show a return statement. Wait, maybe the function is asynchronous? If it's using a callback, perhaps it doesn't return a value directly. But the user wants the @returns tag. Hmm. Maybe the function doesn't return anything, so @returns {void} or maybe it's supposed to return a promise? But the original code isn't clear. Since the user hasn't provided the function body, I have to make assumptions. If the function uses a callback, it might not return a value. So I'll note that it doesn't return a value, or maybe the callback handles the result. So @returns {void} or maybe the function is designed to trigger an async operation, and the callback is called with the result. So the return value of the function itself is void.
 * 
 * Also, the user wants type information where possible. So the callBack parameter is a Function type.
 * 
 * Then, the usage example. The user wants one example. So I need to show how to call the function. Like:
 * 
 * getAuthCode(function(response) {
 *   console.log('Auth code received:', response);
 * });
 * 
 * But I need to make sure the example is correct. Also, check if the function is supposed to be called with a callback, which is common in Node.js or older JS code.
 * 
 * Putting it all together, the JSDoc should start with /**, then the description, then the @param, @returns, and @example tags.
 * 
 * Wait, the user said "proper JSDoc syntax with @ tags". So I need to make sure all the tags are correctly formatted. Also, the function is named getAuthCode, and the parameter is callBack. Maybe the parameter name is a typo? Like "callback" instead of "callBack"? But the user wrote "callBack", so I should keep it as is.
 * 
 * Another thing: the function might be part of a larger system. The description should explain what it does. Maybe it's fetching an auth code from an API, and the callback handles the result.
 * 
 * So the complete JSDoc would look like:
 * 
 * /**
 *  * Retrieves an authentication code from the server.
 *  * @param {Function} callBack - The callback function to handle the response.
 *  * @returns {void} - The function does not return a value; the result is passed to the callback.
 *  * @example
 *  * getAuthCode(function(response) {
 *  *   console.log('Auth code received:', response);
 *  * });
 *  */
 * 
 * Wait, but the @returns {void} might not be necessary if the function doesn't return anything. But it's good to include it for clarity. Also, the example shows the callback usage.
 * 
 * I should check if there are any other tags needed. The user didn't mention @throws or @since, but those are optional. The requirements are 1-6, so as long as the 6 points are covered.
 * 
 * Another thing: the parameter name in the @param should match the function's parameter. So if the function is function getAuthCode(callBack), then the @param is {Function} callBack.
 * 
 * I think that's all. Let me structure it properly.
 * </think>
 * 
 * ```javascript
 * /**
 *  * Retrieves an authentication code from the server.
 *  * This function initiates a request to obtain an authentication code, typically used for
 *  * user verification or API access. The result is delivered via the provided callback function.
 *  *
 *  * @param {Function} callBack - The callback function to handle the response from the server.
 *  *                              The callback receives a single argument which is the authentication code.
 *  *                              The function signature should be: function(response) { ... }
 *  *
 *  * @returns {void} - The function does not return a value directly. The result is passed to the callback
 *  *                   function provided as the `callBack` parameter.
 *  *
 *  * @example
 *  * // Example usage of getAuthCode with a callback function
 *  * getAuthCode(function(response) {
 *  *   if (response.success) {
 *  *     console.log('
 */
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