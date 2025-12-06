import { Router } from "express";
import { getMe } from "../controllers/meController.js";

const router = Router();

// get user & user artist info
router.get("/", getMe);

export default router;