import sessions from "../store/sessionStore.js";

export const getMeGenres = async(req, res) => {
    /*
    req: session
    
    {
        access_token: access_token,
        refresh_token: refresh_token,
        expires_at: Date.now() + expires_in*1000, 
    };
    */
    const access_token = req.session.access_token
    try {
        // get user info
        // get genres user listens to from users' top artist
        const artistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })
        console.log(artistsResponse);
        if (!artistsResponse.ok) {
            throw new Error('spotify error');
        }

        console.log("Top artists fetch success.");
        

        const artistsData = await artistsResponse.json();
        const artistGenres = artistsData.items.flatMap(artist => artist.genres);

        console.log("Genre fetch success: ", artistGenres);

        const sessionId = req.cookies.session_id;
        const session = sessions[sessionId]
        session.genres = artistGenres
        
        return res.status(200).json({ok:true, genres: artistGenres});

    } catch (error) {
        console.error("Top artists fetch failed.");
        res.status(500).json({ok:false, error: "Server error."});

    }
   
}
