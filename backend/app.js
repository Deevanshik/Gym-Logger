import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import exerciseTemplateRoutes from "./routes/exerciseTemplate.route.js";
import splitsRoutes from "./routes/splits.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercise-templates", exerciseTemplateRoutes);
app.use("/api/splits", splitsRoutes);

export default app;
