import { Router } from "express";
import {
  getExerciseTemplates,
  createExerciseTemplate,
  getExerciseTemplateById,
  updateExerciseTemplate,
  deleteExerciseTemplate,
} from "../controllers/exerciseTemplate.controllers.js";

import authenticate from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(authenticate);

router.get("/", getExerciseTemplates);
router.post("/", createExerciseTemplate);

router.get("/:id", getExerciseTemplateById);
router.put("/:id", updateExerciseTemplate);
router.delete("/:id", deleteExerciseTemplate);

export default router;
