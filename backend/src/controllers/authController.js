import querystring from 'querystring';
import crypto from 'crypto';
import sessions from "../store/sessionStore.js";

const stateKey = 'spotify_auth_state';

function generateRandomString(length) {
  return crypto.randomBytes(20).toString('hex').slice(0, length);
}

export const logIn = (req, res) => {
  const authUrl = process.env.AUTH_URL;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const scope = 'user-read-email user-read-private user-top-read';

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
    const code = req.query.code || null;
    const state = req.query.state || null;
    const userUrl = process.env.USER_REDIRECT_URI;

    // if code is not valid or has error --> respond with 400
    if ((code === null) || (state !== req.cookies?.[stateKey])) {
        console.log("Login failed.")
        res.clearCookie(stateKey);
        return res.redirect(`${process.env.FRONTEND_URL}/auth?error=state_code`);
       
    }

    // clear stateKey from cookie
    res.clearCookie(stateKey);
    
    // ----- login success -----
    // get access token:
    try {

        // build req body
        const body = new URLSearchParams({
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: "authorization_code",
        });

        // post body to TOKEN_URL 
        const tokenResponse = await fetch(process.env.TOKEN_URL, {
            method: "POST",
            headers: {
                Authorization: "Basic " + Buffer.from(
                process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
                "content-type": "application/x-www-form-urlencoded",
            },
            body,
        })
        
        // extract access token, refresh token, expires in from res
        const tokenData = await tokenResponse.json();
        const access_token = tokenData.access_token;
        const refresh_token = tokenData.refresh_token;
        const expires_in = tokenData.expires_in;

        // return redirect call user/genre ?
        const params = querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            expires_in: expires_in,
        });

        // get or create sessionId --> replace with JWT token potentially
        const sessionId = crypto.randomBytes(16).toString("hex");

        // store tokens in db (for now stored in local store/sessionStore.js)
        sessions[sessionId] = {
            access_token: access_token,
            refresh_token: refresh_token,
            expires_at: Date.now() + expires_in*1000, 
        };

        // store sessionId in cookies
        res.cookie("session_id", sessionId);

        return res.redirect(`${process.env.FRONTEND_URL}/show`);

    } catch(err) {
        console.error("Token fetch error:", err)
        return res.redirect(`${process.env.FRONTEND_URL}/auth?error=token`);
    }
}

