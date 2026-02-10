import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getWorkoutExercises,
  addWorkoutExercise,
  getWorkoutExerciseById,
  deleteWorkoutExercise,
} from "../controllers/workoutExercise.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/workouts/:workoutId/exercises", getWorkoutExercises);
router.post("/workouts/:workoutId/exercises", addWorkoutExercise);

router.get("/workout-exercises/:id", getWorkoutExerciseById);
router.delete("/workout-exercises/:id", deleteWorkoutExercise);

export default router;
