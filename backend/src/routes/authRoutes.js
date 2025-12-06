import { Router } from "express";
import { logIn, callBack } from "../controllers/authController.js";

const router = Router();

// call controller to redirect ot the auth url
// add middleware later on

router.post("/login", logIn);
router.post("/callback", callBack);

export default router;