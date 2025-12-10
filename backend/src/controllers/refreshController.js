import sessions from "../store/sessionStore.js";

export async function refreshTokens(session) {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: session.refresh_token,
  });

  const tokenResponse = await fetch(process.env.TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const tokenData = await tokenResponse.json();

  // IMPORTANT: Spotify sometimes only returns a new access_token,
  // not always a new refresh_token
  const newAccess = tokenData.access_token;
  const newRefresh = tokenData.refresh_token || session.refresh_token;
  const expiresIn  = tokenData.expires_in;

  return {
    access_token: newAccess,
    refresh_token: newRefresh,
    expires_at: Date.now() + expiresIn * 1000,
  };
}
