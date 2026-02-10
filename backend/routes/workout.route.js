import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getWorkoutCalendar,
} from "../controllers/workout.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.get("/calendar/:year/:month", getWorkoutCalendar);
router.get("/:id", getWorkoutById);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
