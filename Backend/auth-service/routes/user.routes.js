import express from "express";
import {
  registerUsercontroller,
  loginUserController,
  getMeController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// REGISTER Controller
router.post("/api/register", registerUsercontroller);

// LOGIN Controller
router.post("/api/login", authMiddleware, loginUserController);

// GET-ME Controller
router.get("/api/me", authMiddleware, getMeController);

export default router;
