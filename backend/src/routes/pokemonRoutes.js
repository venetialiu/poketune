import { Router } from "express";
import { getPokemon } from "../controllers/pokemonController.js";

const router = Router();

router.get('/', getPokemon);

export default router;