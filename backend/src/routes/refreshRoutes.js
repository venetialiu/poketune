import { Router } from "express";
import { getRefresh } from "../controllers/refreshController.js";

const router = Router();

// call controller to redirect ot the auth url
// add middleware later on

router.get("/", getRefresh);

export default router;