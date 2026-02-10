import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import exerciseTemplateRoutes from "./routes/exerciseTemplate.route.js";
import splitsRoutes from "./routes/splits.route.js";
import dayRoutes from "./routes/day.route.js";
import dayExerciseRoutes from "./routes/dayExercise.route.js";
import workoutRoutes from "./routes/workout.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercise-templates", exerciseTemplateRoutes);
app.use("/api/splits", splitsRoutes);
app.use("/api", dayRoutes);
app.use("/api", dayExerciseRoutes);
app.use("/api/workouts", workoutRoutes);

export default app;
