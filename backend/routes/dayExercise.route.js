import { Router } from "express";
import {
  getDayExercises,
  addExerciseToDay,
  updateDayExercise,
  deleteDayExercise,
} from "../controllers/dayExercise.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/days/:dayId/exercises", getDayExercises);
router.post("/days/:dayId/exercises", addExerciseToDay);
router.put("/day-exercises/:id", updateDayExercise);
router.delete("/day-exercises/:id", deleteDayExercise);

export default router;
