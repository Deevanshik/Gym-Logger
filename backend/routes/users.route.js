import { Router } from "express";
import {
  getUser,
  updateUser,
  changeUserPassword,
} from "../controllers/users.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/profile", getUser);
router.put("/profile", authenticate, updateUser);
router.put("/password", authenticate, changeUserPassword);

export default router;
