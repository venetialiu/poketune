// what this for??
var stateKey = 'spotify_auth_state';

// redirect to the auth url (links to Spotify's page)
export const logIn = async(req, res) => {

    // get auth Url from .env
    const authUrl = process.env.AUTH_URL;
    const client_id = provess.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    res.redirect(authUrl +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
        }));

}

export const callBack = async(req, res) => {
    // if code is not valid or has error --> respond with 400

    // login success
    // get access token:

    // build req body

    // post body to TOKEN_URL 
    
    // extract access token, refresh token, expires in from res

    // store the data

}