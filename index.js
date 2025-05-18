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


/**
 * <think>
 * Okay, I need to add comprehensive JSDoc documentation to the function requestCommand(). Let me start by recalling what JSDoc is. JSDoc is a documentation generator for JavaScript, and it uses special comments with tags like @param, @returns, etc. 
 * 
 * First, the function is called requestCommand(). The user wants proper JSDoc syntax with @ tags. So I need to make sure the comments are correctly formatted. 
 * 
 * The requirements are: describe the function's purpose, document all parameters, document the return value, include type information, and add a usage example. 
 * 
 * Wait, the function is named requestCommand(), but I don't see any parameters in the code provided. The user might have just given the function name. So maybe the function doesn't take any parameters? Or maybe there's more code? But the user only provided the function declaration. 
 * 
 * So, assuming that the function doesn't have parameters. But I should check. If there are no parameters, then the @param tags aren't needed. But the user said to document all parameters. So if there are none, maybe I should note that. 
 * 
 * But maybe the function actually has parameters that aren't shown here. But since the user only provided the function name, I have to work with that. 
 * 
 * The purpose of the function: what does requestCommand() do? Since it's called requestCommand, maybe it's requesting a command from the user or some system. But without more context, I have to make an educated guess. 
 * 
 * So the function's purpose could be to prompt the user for a command, or to send a request for a command, or maybe to handle command requests. 
 * 
 * For the return value, if the function returns something, I need to specify the type. If it's a string, number, boolean, or an object. But again, without knowing the actual implementation, I have to make an assumption. Maybe it returns a string representing the command, or a boolean indicating success. 
 * 
 * But since the user wants type information, I should include that. 
 * 
 * Now, the usage example. The user wants one example. So I need to show how to call the function. 
 * 
 * Putting it all together. Let me draft the JSDoc:
 * 
 * /**
 *  * Requests a command from the user or system.
 *  * @returns {string} The command requested.
 *  */
 * function requestCommand() {
 *   // implementation
 * }
 * 
 * But maybe the function doesn't return anything. Wait, the user said to document the return value. So if the function returns a value, I need to specify the type. If it's void, then @returns {void}. 
 * 
 * But without knowing the actual code, I have to make assumptions. Let's assume that the function returns a string. 
 * 
 * Also, the parameters: if there are none, then no @param tags. But the user said to document all parameters. So if there are none, maybe I can state that. 
 * 
 * Wait, the user's example might have parameters. But the user only provided the function name. So maybe the function is supposed to have parameters, but they're not shown here. But the user might have intended that. 
 * 
 * Alternatively, maybe the function is part of a larger codebase where parameters are defined elsewhere. But since I don't have that context, I have to proceed with the given information. 
 * 
 * So, the function requestCommand() has no parameters. Therefore, the JSDoc would not have @param tags. 
 * 
 * But the user's requirement says to document all parameters. So if there are none, perhaps I should mention that. But JSDoc doesn't require that. So maybe just omit the @param tag. 
 * 
 * Now, the return value. Let's say it returns a string. 
 * 
 * So the JSDoc would be:
 * 
 * /**
 *  * Requests a command from the user or system.
 *  * @returns {string} The command requested.
 *  */
 * function requestCommand() {
 *   // code
 * }
 * 
 * But maybe the function is supposed to take parameters. For example, maybe it's supposed to take a prompt message. But since the user hasn't provided that, perhaps the function is as is. 
 * 
 /**
  * <think>
  * Okay, I need to add comprehensive JSDoc documentation to the function getPlaylists. Let me start by recalling what JSDoc is. It's a documentation generator for JavaScript, right? So the goal is to write comments that follow the JSDoc syntax with appropriate tags.
  * 
  * First, the function is called getPlaylists and takes two parameters: user_id and callBack. The user_id is probably a string or number, and callBack is a function. The function's purpose is to retrieve playlists for a user, maybe from an API or a database.
  * 
  * The requirements are: proper JSDoc syntax with @ tags, describe the purpose, document all parameters with @param, document return value with @returns, include type info, and add a usage example.
  * 
  * Let me start with the function definition. The JSDoc should be a block comment above the function. So I'll start with /** and then the tags.
  * 
  * For the purpose, I'll write a brief description. Maybe something like "Retrieves playlists for a specific user."
  * 
  * Then, the @param tags. Each parameter needs a description and type. user_id: maybe a string or number. callBack: a function. Wait, the parameter name is "callBack" with a capital B. Should I keep that? Probably, since it's the parameter name. But maybe the user intended it to be "callback" with a lowercase 'b'? But the function is written as callBack, so I should stick with that.
  * 
  * So for @param {string|number} user_id - Description: The unique identifier of the user whose playlists are being retrieved.
  * 
  * Then @param {function} callBack - Description: The callback function to handle the result. Maybe specify what the callback does, like "Function to handle the result, typically with (error, playlists) parameters."
  * 
  * For the return value, the function might return an array of playlists or null if there's an error. But since it's using a callback, maybe the function doesn't return anything directly. Wait, the function might be using a callback pattern, so the return value is undefined, but the callback is where the data is handled. Hmm, but the user might expect the function to return a promise or something else. But the original function is written with a callback, so maybe it's a traditional callback-based function. So the @returns might be void, but the callback is where the data is passed. However, the user might want to document that the function doesn't return anything, but the callback is called with the result.
  /**
   * <think>
   * Okay, I need to add comprehensive JSDoc documentation to the function getPlaylist. Let me start by recalling the requirements. The user wants proper JSDoc syntax with @ tags, a description of the function's purpose, documentation for all parameters, return value, type information, and a usage example.
   * 
   * First, the function is called getPlaylist and takes three parameters: list_name, user_id, and callBack. Wait, the parameters are written with commas, but in JavaScript, the function definition would have them as parameters. So the function is defined as function getPlaylist(list_name, user_id, callBack). 
   * 
   * Now, the JSDoc should start with /** followed by the description. The purpose of the function is probably to retrieve a playlist for a user. So I'll write a brief description like "Retrieves a playlist for a user based on the provided list name and user ID."
   * 
   * Next, each parameter needs to be documented with @param. Let's check the parameters: list_name, user_id, callBack. For list_name, the type is likely a string. User_id could be a number or string, but since it's an ID, maybe a number. But sometimes IDs are strings, so maybe I should check. However, the user didn't specify, so I'll go with string as a safe bet. The callBack is a function, so @param {function} callBack.
   * 
   * Wait, the parameters are named list_name, user_id, and callBack. The JSDoc should have the parameter names as they are. So for each @param, I need to specify the type and the description. For example:
   * 
   * @param {string} list_name - The name of the playlist to retrieve.
   * @param {string} user_id - The unique identifier for the user.
   * @param {function} callBack - The callback function to handle the result.
   * 
   * Then, the return value. The function probably returns some data, maybe an object or null. But since it's using a callback, maybe the function doesn't return anything directly but calls the callback. Wait, the function might be using a callback pattern, so the return value might be undefined, but the callback is where the result is handled. However, the JSDoc should still document the return value. If the function doesn't return anything, then @returns {void} or maybe the callback is the way the result is passed. But the user wants the return value documented. Hmm. Maybe the function returns a promise or something else? But the original code doesn't show that. Since the function is using a callback, perhaps it's a traditional callback-based function, so the return value is undefined. But I should check. Alternatively, maybe the function returns the playlist data, but that's unclear. Since the user hasn't provided the function body, I have to make assumptions. Let me assume that the function uses the callback to pass the result, so the return value is undefined. So @returns {void} or maybe the playlist data. Alternatively, if the function is synchronous, it might return the data, but with a callback, it's more likely asynchronous. But without knowing, I'll have to make an educated guess. Maybe the function returns a Promise, but again, not sure. Since the user hasn't provided the implementation, I'll document the return as {void} since the callback is used. Alternatively, if the function is designed to return the playlist data, then @returns {Object} or similar. But without knowing, perhaps the safest is to say that the function does not return a value, but the callback is called with the result. So @returns {void}.
   * 
   * Wait, but in JSDoc, if the function doesn't return anything, you can use @returns {void}. However, if the function is designed to return a value, even if it's using a callback, maybe the return is the playlist. But this is ambiguous. Maybe the user expects that the function returns the playlist data, and the callback is for asynchronous handling. But without more info, I'll have to make a choice. Let me check the parameters again. The third parameter is called callBack, which is a function. So it's likely that this is an asynchronous function, and the callback is called with the result. So the function itself doesn't return anything, hence @returns {void}.
   * 
   * Now, the usage example. The user wants one example. So something like:
   * 
   * // Example usage:
   * getPlaylist('myFavorites', '12345', function(playlist) {
   *     console.log(playlist);
   * });
   /**
    * <think>
    * Okay, I need to add comprehensive JSDoc documentation to the function getMe. Let me start by recalling what JSDoc tags are necessary. The user specified using @tags, so I should include @param, @returns, and maybe @example.
    * 
    * First, the function is called getMe and takes a callBack parameter. The purpose of the function isn't clear from the name, but I'll have to describe it. Maybe it's fetching user data? Since the parameter is a callback, perhaps it's an asynchronous function that retrieves some data and then calls the callback with the result.
    * 
    * For the parameters, the callBack is a function. I should note that it's a callback and what it expects. Maybe it's a function that takes an error and data. But since the user didn't specify, I'll have to make an educated guess. Let me check the requirements again: document all parameters with @param. So I need to describe the callBack parameter. Maybe it's a function that is called once the operation is complete. So I'll say it's a callback function that takes an error and a result.
    * 
    * The return value: since the function is likely asynchronous, maybe it returns nothing, but the callback handles the result. So the return type could be void. But I should check if the function returns anything. The original code is just function getMe( callBack ), so maybe it doesn't return anything, but the callback is used to handle the result. So @returns {void} or maybe @returns {Promise<void>} if it's using promises, but the original code doesn't show that. Since the parameter is a callback, it's probably using a traditional callback pattern, so the function doesn't return a value.
    * 
    * Now, the usage example. The user wants one example. So I'll show how to call getMe with a callback function. For example, getMe((err, data) => { ... }).
    * 
    * Wait, but the function name is getMe. Maybe it's retrieving the current user's information. So the purpose could be "Retrieves the current user's information from the server." Then the parameters: the callBack is a function that is called with the result. So the @param tag for callBack would be @param {function} callBack - The callback function to handle the result.
    * 
    * But I should specify the parameters more precisely. For example, the callback might take two arguments: an error and the data. So the @param should note that. Also, the return value is void because the function itself doesn't return anything; it's the callback that handles the result.
    /**
     * <think>
     * Okay, I need to add comprehensive JSDoc documentation to the function getUser. Let me start by recalling the requirements. The user wants proper JSDoc syntax with @ tags, a description of the function's purpose, documentation for all parameters, return value, type information, and a usage example.
     * 
     * First, the function is called getUser and takes two parameters: user_id and callBack. Wait, the parameter names are user_id and callBack. I should check if the function is using the correct parameter names. But the user provided the function definition as function getUser(user_id, callBack), so I'll stick with that.
     * 
     * The purpose of the function: probably retrieves user data based on the user_id. So the description should mention that it fetches user information from a database or an API.
     * 
     * For the parameters, user_id is likely a number or string. The callBack is a function, probably a callback that handles the result. I need to specify their types. So @param {number|string} user_id - The unique identifier for the user. Then @param {function} callBack - The callback function to handle the result.
     * 
     * The return value: since it's a callback-based function, maybe it doesn't return anything directly. But JSDoc requires @returns. Maybe it returns void, or perhaps the callback is called with the user data. So the return type could be void, but I should check. Alternatively, if the function is asynchronous, maybe it returns a Promise, but the current code doesn't show that. Since the function is using a callback, it's likely synchronous or uses the callback pattern. So @returns {void} or maybe the function doesn't return anything, so void.
     * 
     * Wait, in JavaScript, if a function doesn't return anything, the return type is void. But if the callback is called with the user data, the function itself doesn't return that data. So the @returns would be void.
     * 
     * Now, the usage example. The user wants one example. So something like getUser(123, function(user) { console.log(user); }); But I need to make sure the example is correct. Also, the parameters should match the types. So user_id could be a number or string, and the callback is a function.
     * 
     /**
      * <think>
      * Okay, I need to add comprehensive JSDoc documentation to the function generatePlaylist. Let me start by recalling what JSDoc tags are necessary. The user specified using @tags, so I should include @param, @returns, and maybe @example.
      * 
      * First, the function is called generatePlaylist and takes two parameters: inputs and callBack. Wait, the second parameter is named callBack, which might be a typo for callback. But I should stick to the original name unless instructed otherwise. So I'll keep it as callBack.
      * 
      * The purpose of the function should be described. What does generatePlaylist do? Since the parameters are inputs and a callback, maybe it's generating a playlist based on some inputs and then calling the callback with the result. I'll need to infer that from the function's name and parameters.
      * 
      * For the parameters: inputs – what type is it? The user says to include type information where possible. If it's an array, maybe Array<string> or something else. But without more context, I'll have to make an assumption. Maybe it's an object or an array. Let me check the example. The user wants a usage example, so maybe the inputs could be an array of song titles, and the callback is a function that handles the result.
      * 
      * The return value: the function might return a playlist, which could be an array of song objects or a string. But since there's a callback, maybe the function doesn't return anything directly but instead calls the callback. Wait, in JavaScript, if a function has a callback, it's often asynchronous, but the function might not return a promise. So the return value could be void, but the callback is used to pass the result.
      * 
      * Wait, the user says to document the return value with @returns. So even if the function doesn't return anything, I should note that. But maybe the function returns a promise? Or maybe the callback is called with the result. Let me think. If the function is synchronous, it might return the playlist, but if it's asynchronous, it might not. But without knowing the implementation, I have to make assumptions.
      * 
      * Let me structure the JSDoc. Start with /**, then the description. Then @param for each parameter. For inputs, maybe it's an array of strings. The callBack is a function. Then @returns, which could be void if the callback is used, or the playlist if it's synchronous.
      * 
      * Wait, the function is named generatePlaylist, which suggests it creates a playlist. So maybe it returns the generated playlist. But if there's a callback, perhaps it's designed to be used with the callback, maybe in an asynchronous way. But the user hasn't specified, so I'll have to make an educated guess.
      * 
      * Let me check the parameters again. The first parameter is inputs, which could be an array of song titles or some configuration. The second is callBack, which is a function. So the function might take inputs, process them, and then call the callback with the generated playlist.
      * 
      * In that case, the function might not return anything (void), and the callback is used to pass the result. So the @returns would be void. But maybe the function returns a promise if it's asynchronous. However, without knowing, I'll assume it's synchronous and returns the playlist. Or maybe it's asynchronous and the callback is called with the result, so the function returns nothing.
      * 
      * Alternatively, maybe the function is designed to be called with a callback, and the callback is invoked with the generated playlist. So the function's return value is not used, and the callback is the way to get the result. In that case, the @returns would be void.
      * 
      * But I need to make sure. Let me think of a common pattern. For example, a function that generates a playlist might take some inputs, process them, and then call the callback with the result. So the function itself doesn't return anything, but the callback is called with the playlist. So the @returns would be void.
      * 
      * But maybe the function also returns the playlist. It's a bit ambiguous. Since the user hasn't provided the function body, I have to make assumptions. Let me proceed with the most common scenario where the callback is used to pass the result, so the function returns void.
      * 
      * Now, for the parameters: inputs. Let's say it's an array of strings, like song titles. So @param {Array<string>} inputs - The input data used to generate the playlist.
      * 
      * The callBack is a function. So @param {Function} callBack - The callback function to handle the generated playlist.
      * 
      * For the return value: @returns {void} - The function does not return a value; the result is passed to the callback.
      * 
      * But maybe the function returns the playlist. If that's the case, then @returns {Array<string>} - The generated playlist.
      * 
      * But without knowing, I need to make a choice. Let me check
      */
     * Putting it all together, the JSDoc should start with /**, then the description, then @param tags for each parameter, @returns, and @example.
     * 
     * Wait, the user specified "Add comprehensive JSDoc documentation to: function getUser(user_id, callBack)". So the function is named getUser, parameters are user_id and callBack. Need to make sure the parameter names in the JSDoc match exactly.
     * 
     * Also, the callback function's parameters: the example might need to show how the callback is used. But in the JSDoc, the @param for callBack should describe what it does. For example, the callback might take a user object or an error.
     * 
     * But the original function doesn't have a description of what the callback does. So maybe I should add that. For example, the callback is called with the user data or an error. But since the user hasn't provided that info, I have to make assumptions. Maybe the callback is called with the user object as its first argument.
     * 
     * So, in the JSDoc for the callback parameter, I can write: @param {function} callBack - The callback function to handle the result. The callback function receives the user data as its first argument and an error as the second (if any).
     * 
     * But the original function's parameters don't have that info. However, the user wants comprehensive documentation, so I should include that. But how? Maybe the JSDoc for the callBack parameter can describe its parameters. So:
     * 
     * @param {function} callBack - The callback function to handle the result. The callback function receives two arguments: the first is the user data (if successful), and the second is an error (if occurred).
     * 
     * But in JSDoc, you can specify the parameters of the callback function. So maybe:
     * 
     * @param {function} callBack - The callback function to handle the result. The callback function receives two arguments: {Object} user - The user data, and {Error} error - The error object if an error occurred.
     * 
     * But how to format that in JSDoc? Using @param inside the @param for callBack. Wait, the @param tag is for the function's parameters. So for the callBack parameter, which is a function, I can describe its parameters. So:
     * 
     * @param {function} callBack - The callback function to handle the result. The callback function receives two arguments: {Object} user - The user data, and {Error} error - The error object if an error occurred.
     * 
     * But in JSDoc, you can use the @param tag inside the description. Wait, no. The @param tag is for the parameters of the function. So for the callBack parameter, which is a function, the
     */
    * 
    * Putting it all together:
    * 
    * /**
    *  * Retrieves the current user's information from the server.
    *  * @param {function} callBack - The callback function to handle the result.
    *  * @param {Error} callBack.err - An error object if an error occurs, otherwise null.
    *  * @param {Object} callBack.data - The user data if successful.
    *  * @returns {void}
    *  */
    * function getMe( callBack ) { ... }
    * 
    * Wait, but in JSDoc, you can't have nested parameters like that. The @param for callBack would be a function, and then you can describe the parameters of the callback function using @param inside the function's JSDoc. Wait, no, JSDoc doesn't support that directly. So maybe I need to describe the callback's parameters in the @param tag for the callBack parameter.
    * 
    * Alternatively, use the @callback tag. But the user might not want that. Let me check. The user wants to document all parameters with @param. So for the callBack parameter, I can describe it as a function that takes (err, data) as parameters. So in the @param tag, I can write:
    * 
    * @param {function} callBack - The callback function to handle the result. The callback function receives two arguments: an error object (if any) and the user data.
    * 
    * But to be more precise, maybe use the @param tag inside the function's JSDoc. Wait, no. The @param tag is for the parameters of the function itself. So the callBack is a parameter of getMe, and its type is a function. Then, to describe the parameters of the callback function, I can use the @param tag inside the function's JSDoc, but that's not standard. Alternatively, I can describe the callback's parameters in the description.
    * 
    * Alternatively, use the @callback tag. But the user might not want that. Let me think. The user's requirement is to document all parameters with @param. So for the callBack parameter, I need to describe it as a function, and perhaps mention that it's called with (err, data). So in the @param description, I can write that.
    * 
    * So the JSDoc would look like:
    * 
    * /**
    *  * Retrieves the current user's information from the server.
    *  * @param {function} callBack - The callback function to handle the result
    */
   * 
   * But I need to make sure the parameters are correctly named. The first parameter is list_name, so in the example, it's 'myFavorites', user_id is '12345', and the callback is a function.
   * 
   * Putting it all together:
   * 
   * /**
   *  * Retrieves a playlist for a user based on the provided list name and user ID.
   *  * @param {
   */
  * 
  * Wait, the original function is written as function getPlaylists( user_id , callBack ), so it's a function that takes a user_id and a callback. So the function itself doesn't return anything; the callback is called with the result. So the @returns would be void, but maybe the callback's parameters are important. However, JSDoc's @returns is for the function's return value, not the callback's. So in this case, the function returns nothing, so @returns {void}.
  * 
  * But maybe the function is part of a library that returns a promise? But the original code doesn't show that. So I'll assume it's a callback-based function.
  * 
  * Now, the usage example. The user wants one example. So something like:
  * 
  * // Example usage:
  * getPlaylists('user123', (error, playlists) => {
  *   if (error) {
  *     console.error('Error fetching playlists:', error);
  *   } else {
  *     console.log('Playlists:', playlists);
  *   }
  * });
  * 
  * But I need to make sure the example is correct. Also, the parameters should match the function's parameters. So user_id is 'user123' and callBack is the function.
  * 
  * Now, putting it all together. Let me structure the JSDoc:
  * 
  * /**
  *  * Retrieves playlists for a specific user.
  *  * @param {string|number} user_id - The unique identifier of the user whose playlists are being retrieved.
  *  * @param {function} callBack - The callback function to handle the result. The callback is called with two arguments: (error, playlists).
  *  * @returns {void}
  *  */
  * function getPlaylists( user_id , callBack ) { ... }
  * 
  * Wait, but the callback's parameters are not specified in the JSDoc. Should I document that? The @param for callBack could have a description that mentions the parameters. For example:
  * 
  * @param {function} callBack - The callback function to handle the result. The callback is called with two arguments: (error, playlists). The error is null if no error occurred, and playlists is an array of playlist objects.
  * 
  * But in JSDoc, you can't specify the parameters of the callback in the @param tag. So maybe the @param tag for callBack would have a description that explains what the callback does. Alternatively, you can use the @callback tag if the callback is a named function, but in this case,
  */
 * Alternatively, maybe the function is part of a class or has parameters that are not shown. But given the information, I have to proceed. 
 * 
 * Another possibility: the function might be asynchronous. So maybe it returns a Promise. But again, without knowing, I have to make an assumption. 
 * 
 * For the usage example, something like:
 /**
  * <think>
  * Okay, I need to add comprehensive JSDoc documentation to the function sortTracks. Let me start by recalling what JSDoc requires. The user specified using proper syntax with @ tags, describing the purpose, documenting parameters, return value, type information, and an example.
  * 
  * First, the function is called sortTracks and takes a parameter called inputs. The purpose of the function is to sort tracks, but I need to be specific. Maybe it's sorting an array of track objects based on some criteria. Since the user didn't provide the function body, I'll have to make assumptions. Common sorting criteria could be by title, duration, or artist. I'll note that in the description.
  * 
  * For the parameters, the inputs are probably an array of track objects. Each track might have properties like title, duration, artist. I should document each parameter with @param, specifying the type. So @param {Array} inputs - the array of track objects to sort.
  * 
  * The return value should be the sorted array. So @returns {Array} The sorted array of track objects.
  * 
  * Type information is important. I'll use {Array} for the inputs and return. Maybe the tracks are objects with specific properties. I can add a @typedef or describe the structure in the parameter description. But since the user didn't mention a typedef, maybe just describe it in the @param comment.
  * 
  * Now, the usage example. I'll create a sample input and show how the function is called. For example, an array of tracks with title and duration, then calling sortTracks and logging the result.
  * 
  * Wait, the user wants 1 usage example. So I'll include that in the JSDoc as a @example tag.
  * 
  * Let me check if I missed anything. The function name is correct. Parameters are documented. Return value. Types. Example. Also, make sure the JSDoc syntax is correct with /** ... */ and the tags properly formatted.
  * 
  * I should also mention the sorting criteria in the description. Maybe the function sorts by title alphabetically. Or perhaps it's customizable. But without knowing the actual code, I'll assume a default sort, like by title. Alternatively, maybe the function uses a specific property. Let me state that in the description.
  * 
  * Putting it all together:
  * 
  * /** 
  *  * Sorts an array of track objects based on a specified criterion.
  *  * @param {Array} inputs - The array of track objects to be sorted. Each track should have properties like title, duration, etc.
  *  * @returns {Array} The sorted array of track objects.
  *  * @example
  *  * const tracks = [
  *  *   { title: 'B', duration: 200 },
  *  *   { title: 'A', duration: 150 }
  *  * ];
  *  * const sorted = sortTracks(tracks);
  *  * console.log(sorted); // [ { title: 'A', ... }, { title: 'B', ... } ]
  *  */
  * function sortTracks(inputs) { ... }
  * 
  * Wait, but the user might expect more specific types. Maybe the tracks are of a certain structure. If I can't know, I can describe the properties in the parameter description. Also, maybe the function sorts by title by default. So the description should mention that.
  * 
  * I think that's a solid start. Let me make sure all the requirements are met: proper syntax, purpose, parameters, return, types, example. Yes. I'll format the JSDoc accordingly.
  * </think>
  * 
  * ```javascript
  * /**
  *  * Sorts an array of track objects based on a specified criterion.
  *  * 
  *  * This function organizes track data by applying a sorting algorithm. The default sorting
  *  * criterion is alphabetical order by track title. Additional criteria (e.g., duration, artist)
  *  * can be implemented by modifying the comparison logic within the function.
  *  * 
  *  * @param {Array.<Object>} inputs - The array of track objects to be sorted. Each track object
  *  * should contain at least a `title` property for default sorting. Additional properties like
  *  * `duration` (number) or `artist` (string) may be used for alternative sorting criteria.
  *  * 
  *  * @returns {Array.<Object>} A new array containing the sorted track objects. The original
  *  * array remains unmodified.
  *  * 
  *  * @example
  *  * const tracks = [
  *  *   { title: 'Bohemian Rhapsody', duration: 354, artist: 'Queen' },
  *  *   { title: 'Imagine', duration: 230, artist: 'John Lennon' },
  *  *   { title: 'Stairway to Heaven', duration: 482, artist: 'Led Zeppelin' }
  *  * ];
  *  * 
  *  * const sortedTracks = sortTracks(tracks);
  *  * console.log(sortedTracks);
  *  * // Output: [
  *  * //   { title: 'Bohemian Rhapsody', ... },
  *  * //   { title: 'Imagine', ... },
  *  * //
  */
 * 
 * const command = requestCommand();
 * console.log(command);
 * 
 * But the user wants one example. 
 * 
 * So putting it all together, the JSDoc would be:
 * 
 * /**
 *  * Requests a command from the user or system.
 *  * @returns {string} The command requested.
 *  */
 * function requestCommand() {
 *   // implementation
 * }
 * 
 * But maybe the function is supposed to have parameters. Let me think again. The user might have intended that the function has parameters, but they
 */
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