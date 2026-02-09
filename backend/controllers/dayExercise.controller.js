import DayExercise from "../models/dayExercise.model.js";
import Day from "../models/day.model.js";
import ExerciseTemplate from "../models/exerciseTemplate.model.js";

export const addExerciseToDay = async (req, res, next) => {
  try {
    const { dayId } = req.params;
    const {
      exerciseTemplateId,
      targetSets,
      targetRepRange,
      targetWeight,
      order,
    } = req.body;

    const day = await Day.findById(dayId);
    if (!day) {
      return res.status(404).json({ message: "Day not found" });
    }

    const template = await ExerciseTemplate.findById(exerciseTemplateId);
    if (!template) {
      return res.status(404).json({ message: "Exercise template not found" });
    }

    const dayExercise = await DayExercise.create({
      dayId,
      exerciseTemplateId,
      targetSets,
      targetRepRange,
      targetWeight,
      order,
    });

    res.status(201).json(dayExercise);
  } catch (err) {
    next(err);
  }
};

export const getDayExercises = async (req, res, next) => {
  try {
    const { dayId } = req.params;

    const exercises = await DayExercise.find({ dayId })
      .populate("exerciseTemplateId")
      .sort({ order: 1 });

    res.status(200).json(exercises);
  } catch (err) {
    next(err);
  }
};

export const updateDayExercise = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await DayExercise.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("exerciseTemplateId");

    if (!updated) {
      return res.status(404).json({ message: "Day exercise not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteDayExercise = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await DayExercise.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Day exercise not found" });
    }

    res.status(200).json({ message: "Exercise removed from day" });
  } catch (err) {
    next(err);
  }
};
