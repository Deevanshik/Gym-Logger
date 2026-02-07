import { Router } from "express";
import {
  getSplits,
  createSplit,
  getSplitById,
  updateSplit,
  deleteSplit,
} from "../controllers/splits.controllers.js";

import authenticate from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(authenticate);

router.get("/", getSplits);
router.post("/", createSplit);

router.get("/:id", getSplitById);
router.put("/:id", updateSplit);
router.delete("/:id", deleteSplit);

export default router;
