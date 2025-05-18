const SpotifyWebApi = require('spotify-web-api-node');
const redirectURI = require('./redirect_url');
const fs = require('fs-extra');

const spotifyApi = new SpotifyWebApi({ 
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET });

/**
 * <think>
 * Okay, I need to add comprehensive JSDoc documentation to the function `getCode(callBack)`. Let me start by recalling what JSDoc tags are necessary. The user specified using @tags, so I should include @param, @returns, and maybe @example.
 * 
 * First, the function's purpose. The name is `getCode`, which suggests it might retrieve some code, maybe from an API or a database. The parameter is `callBack`, which is a function. So the purpose could be something like "Retrieves code from a remote source and executes a callback function with the result."
 * 
 * Next, parameters. The only parameter is `callBack`, which is a function. I need to document that. The type would be `Function`, and maybe describe what it does. Like, "A callback function to handle the retrieved code. It receives the code as a parameter."
 * 
 * Return value: The function might not return anything directly since it's using a callback. So the return type could be `void` or `undefined`. But I should check if the function actually returns something. Since the user didn't provide the function body, I'll assume it's asynchronous and uses the callback, so the return is void.
 * 
 * Type information: Make sure to specify the type of the callback parameter. Also, if the callback's argument is a string, maybe specify that. But without knowing the exact implementation, I'll have to make assumptions. Let's say the callback receives a string.
 * 
 * Usage example: Provide a simple example. Like, calling `getCode` with a function that logs the code. So something like `getCode((code) => console.log(code));`.
 * 
 * Wait, the user said "1 usage example", so I need to include that in the JSDoc. The example should be in a code block, using the @example tag.
 * 
 * Putting it all together:
 * 
 * /**
 *  * Retrieves code from a remote source and executes a callback function with the result.
 *  * @param {Function} callBack - A callback function to handle the retrieved code. It receives the code as a parameter.
 *  * @returns {void} - This function does not return a value; it uses the provided callback to handle the result.
 *  * @example
 *  * getCode((code) => {
 *  *   console.log('Retrieved code:', code);
 *  * });
 *  */
 * function getCode(callBack) {
 *   // function implementation
 * }
 * 
 * Wait, but the parameter is named `callBack`, but in the example, it's written as `callBack`. Should the parameter name in the JSDoc match? Yes, so the @param should be {Function} callBack.
 * 
 * Also, the return type: if the function doesn't return anything, then @returns {void} is correct. But if it returns a promise or something, that's different. But since the user didn't specify, I'll go with void.
 * 
 * Another thing: the function might be asynchronous. Should I mention that? The JSDoc doesn't have a specific tag for async, but maybe add a note in the description. However, the user didn't ask for that, so maybe not. Just stick to the required tags.
 * 
 * Check if all parameters are documented. Yes, only `callBack` is there. The example shows a function that logs the code, which makes sense.
 * 
 * I think that covers all the requirements. Let me make sure the syntax is correct. The @param tag has the type and name, the @returns, and the @example. The example is properly formatted.
 * </think>
 * 
 * /**
 *  * Retrieves code from a remote source and executes a callback function with the result.
 *  * 
 *  * This function is designed to fetch code (e.g., from an API or database) and pass the retrieved value
 *  * to the provided callback function. It assumes asynchronous behavior typical of network or I/O operations.
 *  * 
 *  * @param {Function} callBack - A callback function to handle the retrieved code. The function receives
 *  *                            a single argument containing the retrieved code.
 *  * @param {string} callBack.code - The retrieved code value passed to the callback.
 *  * @returns {void} - This function does not return a value directly; it uses the provided callback
 *  *                  to deliver the result. If an error occurs, it may throw an exception or handle it
 *  *                  internally depending on implementation details.
 *  * 
 *  * @example
 *  * // Example usage: Retrieve code and log it to the console
 /**
  * <think>
  * Okay, I need to add comprehensive JSDoc documentation to the refreshToken function. Let me start by recalling what JSDoc tags are necessary. The user specified using @tags, so I should include @param, @returns, and maybe @example.
  * 
  * First, the function is called refreshToken and takes a callBack parameter. The purpose of the function is probably to refresh an authentication token, so I'll describe that. I should mention that it's used to obtain a new access token using a refresh token.
  * 
  * For the parameters, the callBack is a function. I need to document that. The type would be function, and maybe specify that it's a callback. I should note what arguments it might receive, like error and new token.
  * 
  * The return value: since it's a callback-based function, it might not return anything directly. But maybe the callback handles the result. So the @returns tag could indicate that it's void, or maybe the callback's parameters are the actual return values. I need to clarify that.
  * 
  * Type information is important. The callBack parameter should have a type, like function. Also, if the callback has specific parameters, I should note that. For example, the callback might take (error, newToken) as arguments.
  * 
  * The usage example should show how to call the function. Maybe something like refreshToken((err, token) => { ... }).
  * 
  * Wait, the user said to include type information where possible. So for the callBack parameter, I can specify it as a function that takes (error: Error | null, newToken: string) and returns void. But in JSDoc, that's written with the parameters inside the function type.
  * 
  * Also, the function might not return anything, so @returns {void} or maybe it returns a promise? But the current function is using a callback, so it's probably not returning a promise. So the return is void.
  * 
  * Putting it all together:
  * 
  * /**
  *  * Refreshes the authentication token using a refresh token.
  *  * @param {function} callBack - The callback function to handle the result.
  *  * @param {Error | null} callBack.error - The error object if an error occurs.
  *  * @param {string} callBack.newToken - The new access token if successful.
  *  * @returns {void}
  *  * @example
  *  * refreshToken((err, token) => {
  *  *   if (err) {
  *  *     console.error('Failed to refresh token:', err);
  *  *   } else {
  *  *     console.log('New token:', token);
  *  *   }
  *  * });
  *  */
  * function refreshToken(callBack) {
  *   // implementation
  * }
  * 
  * Wait, but the parameters for the callback are not correctly formatted. The @param tag for callBack should describe the function's parameters. So maybe:
  * 
  * @param {function} callBack - The callback function to handle the result.
  * @param {Error | null} callBack.error - The error object if an error occurs.
  * @param {string} callBack.newToken - The new access token if successful.
  * 
  * But in JSDoc, when you have a function parameter, you can describe its parameters using the @param tag with the function's name. Alternatively, you can use the function type with parameters. Maybe a better way is to specify the function's parameters directly.
  * 
  * Alternatively, using:
  * 
  * /**
  *  * @param {function} callBack - The callback function to handle the result.
  *  * @param {Error | null} callBack.error - The error object if an error occurs.
  *  * @param {string} callBack.newToken - The new access token if successful.
  *  */
  * 
  * But that might not be correct. The @param tag for callBack should describe the function's parameters. So perhaps:
  * 
  * /**
  *  * @param {function} callBack - The callback function to handle the result.
  *  * @param {Error | null} callBack.error - The error object if an error occurs.
  *  * @param {string} callBack.newToken - The new access token if successful.
  *  * @returns {void}
  *  */
  * 
  * Wait, no. The @param tag is for the parameters of the function. So the callBack parameter is a function. To describe the parameters of that function, you can use the @param tag with the function's name. But in JSDoc, you can't nest @param tags like that. Instead, you can use the function type with parameters. For example:
  * 
  * @param {function(Error, string)} callBack - The callback function to handle the result.
  * 
  * But that's a bit simplified. Alternatively, you can use:
  * 
  * @param {function} callBack - The callback function to handle the result.
  * @param {Error} callBack.error - The error object if an error occurs.
  * @param {string} callBack.newToken - The new access token if successful.
  * 
  * But that's not correct because the callBack is a function, and the parameters of that function are error and newToken. So the correct way is to describe the function's parameters in the @param tag for callBack. So:
  * 
  * @param {function} callBack - The callback function to handle the result.
  * @param
  */
 *  * getCode((code) => {
 *  *   console.log('Retrieved code:', code);
 *  * });
 *  */
 * function getCode(callBack) {
 *   // Function implementation would go here
 * }
 */
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

          const timer = new Date().toString();

          fs.writeFile('./timer.txt', timer, err => {
            if(err) {
              console.error('Error writing timestamp.', err);
              return
            }
            console.log('Time recorded.');

            //Writing refresh token to file
            fs.writeFile('./refreshToken.txt', refresh_Token, err => {
              if (err) {
                console.error('Error writing refresh token.', err);
                return
              }

              console.log('\nSaved Refresh token to refreshToken.txt');

              fs.writeFile('./accessToken.txt', access_Token, err => {
                if (err) {
                  console.error('Error writing access token.', err);
                  return
                }

                console.log('\nSaved Access token to accessToken.txt');
                const output = { Atoken: access_Token , Rtoken: refresh_Token }
                
                return callBack(output);
              });                           
            });            
          });  
      });
      codeGrant.catch((err) => {
        console.log('CODE GRANT ERROR - Failed to obtain tokens.\n', err);
      });
    });    
}

function refreshToken(callBack) {
  fs.readFile('./refreshToken.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error('Error obtaining refresh token.', err)
      return
    }
    spotifyApi.setRefreshToken(data);
    console.log('Refresh token obtained.');

    //spotifyApi.setRefreshToken(' REFRESH TOKEN ');
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken().then(
      function(data) {
        console.log('Access token refreshed successfully.');

        const recordedTime = new Date().toString();

        fs.writeFile('./timer.txt', recordedTime, err => {
          if(err) {
            console.error('Failed to write time.\n', err);
            return
          }
          console.log('Refresh time updated.');
          return callBack(data.body['access_token']);
        });

      },
      function(err) {
        console.log('Failed to refresh access token\n', err);
      }
    );
  });
}

//getCode();
//refreshToken();

module.exports = { getCode , refreshToken }