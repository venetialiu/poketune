import { Router } from "express";
import { getMeGenres } from "../controllers/meController.js";

const router = Router();

// get user & user artist info
router.get("/genres", getMeGenres);
router.get("/profile", getMeGenres);

export default router;