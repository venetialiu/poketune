import { Router } from "express";
import { getMe, getTopArtists } from "../controllers/meController.js";

const router = Router();

// call controller to redirect ot the auth url
// add middleware later on

router.get("/me", getMe);
router.get("/me/top/artists", getTopArtists);

export default router;