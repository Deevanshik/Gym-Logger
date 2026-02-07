import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";
import exerciseTemplateRoutes from "./routes/exerciseTemplate.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercise-templates", exerciseTemplateRoutes);

export default app;
