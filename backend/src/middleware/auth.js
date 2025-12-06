import { sessions } from "../store/sessionStore.js";

/*
Example shape of req for reference:



*/


const auth = async (req, res, next) => {

    const sessionId = req.cookies.session_id;
    const session = sessions[sessionId]

    if (!sessionId || !sessions[sessionId]) {
        return res.status(401).json({ error: "not logged in" });
    }

    if (Date.now() > session.expires_at) {
        await refreshTokens(session);
    }


    try {

        // pass it down to next
        return next();

    } catch (error) {
        console.log("Auth error:", error);
        return res.status(401).json({
            ok: false,
            error: "Invalid user",
        });
    }

};

export default auth;