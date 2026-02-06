import { Router } from "express";
import {
  getUser, updateUser, changeUserPassword
} from "../controllers/users.controllers.js";
import authenticate from "../middlewares/auth.middlewares.js"

const router = Router();

router.get("/profile", getUser);
router.put("/profile", authenticate, updateUser);
router.put("/password", authenticate, changeUserPassword);

export default router;
