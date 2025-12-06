import { Router } from "express";
import { getGenre } from "../controllers/userController.js";

const router = Router();

// call controller to redirect ot the auth url
// add middleware later on

router.get("/genre", getGenre);