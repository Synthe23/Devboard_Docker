import express from "express";
import { registerUsercontroller } from "../controllers/auth.controller.js";

const router = express.Router();

// REGISTER Controller
router.post("/api/register", registerUsercontroller);

// LOGIN Controller
// router.post("/api/login", loginUserController);

// GET-ME Controller
// router.post("/api/me", getMeController);

export default router;
