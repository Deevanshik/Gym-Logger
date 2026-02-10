import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getWorkoutSets,
  createWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSet,
} from "../controllers/workoutSet.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/workout-exercises/:exerciseId/sets", getWorkoutSets);
router.post("/workout-exercises/:exerciseId/sets", createWorkoutSet);

router.put("/workout-sets/:id", updateWorkoutSet);
router.delete("/workout-sets/:id", deleteWorkoutSet);

export default router;
