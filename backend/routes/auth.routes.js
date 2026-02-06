import { Router } from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
  logoutUser,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

export default router;
