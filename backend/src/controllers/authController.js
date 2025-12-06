import querystring from 'querystring';
import crypto from 'crypto';

const stateKey = 'spotify_auth_state';

function generateRandomString(length) {
  return crypto.randomBytes(20).toString('hex').slice(0, length);
}

export const logIn = (req, res) => {
  const authUrl = process.env.AUTH_URL;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = 'user-read-email user-top-read';

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const params = querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(`${authUrl}${params}`);
};


export const callBack = async(req, res) => {
    // if code is not valid or has error --> respond with 400

    // login success
    // get access token:

    // build req body

    // post body to TOKEN_URL 
    
    // extract access token, refresh token, expires in from res

    // store the data

    // return redirect call user/genre ?

}