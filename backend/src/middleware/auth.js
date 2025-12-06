import sessions from "../store/sessionStore.js";
import { refreshTokens } from "../controllers/refreshController.js";

/* 
Checks:
1. if sessionId exists
2. if token has expired -> if expire -> refresh token
*/ 

const auth = async (req, res, next) => {
    
    try{
        const sessionId = req.cookies.session_id;
        const session = sessions[sessionId]

        if (!sessionId || !sessions[sessionId]) {
            return res.status(401).json({ ok: false, error: "not logged in" });
        }

        if (Date.now() > session.expires_at) {
            try {
                await refreshTokens(session);
            } catch (error) {
                return res.status(401).json({ ok: false, error: "token refresh failed" });
            }
        }

        // attach session to req for controller
        req.session = session;

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