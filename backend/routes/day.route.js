import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getDaysBySplit,
  createDay,
  getDayById,
  updateDay,
  deleteDay,
} from "../controllers/day.controller.js";

const router = express.Router();

router.use(authMiddleware);

// days under split
router.get("/splits/:splitId/days", getDaysBySplit);
router.post("/splits/:splitId/days", createDay);

// single day
router.get("/days/:id", getDayById);
router.put("/days/:id", updateDay);
router.delete("/days/:id", deleteDay);

export default router;
