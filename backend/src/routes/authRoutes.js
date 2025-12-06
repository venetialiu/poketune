import { Router } from "express";
import { logIn, callBack } from "../controllers/authController.js";

const router = Router();

// call controller to redirect ot the auth url
// add middleware later on

router.get("/login", logIn);
router.get("/callback", callBack);

export default router;