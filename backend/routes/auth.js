import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router()

// Register a new user
router.post("/register", register);

// Login for a user
router.post("/login", login);

export default router