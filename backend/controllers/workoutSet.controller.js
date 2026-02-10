import Workout from "../models/workout.model.js";
import WorkoutExercise from "../models/workoutExercise.model.js";
import WorkoutSet from "../models/workoutSet.model.js";

export const getWorkoutSets = async (req, res, next) => {
  try {
    const exercise = await WorkoutExercise.findById(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const workout = await Workout.findOne({
      _id: exercise.workoutId,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const sets = await WorkoutSet.find({
      workoutExerciseId: exercise._id,
    }).sort({ setNumber: 1 });

    res.json(sets);
  } catch (err) {
    next(err);
  }
};

export const createWorkoutSet = async (req, res, next) => {
  try {
    const exercise = await WorkoutExercise.findById(req.params.exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    const workout = await Workout.findOne({
      _id: exercise.workoutId,
      userId: req.user.id,
      completed: false,
    });

    if (!workout) {
      return res.status(400).json({
        message: "Workout not found or already completed",
      });
    }

    const set = await WorkoutSet.create({
      workoutExerciseId: exercise._id,
      ...req.body,
    });

    res.status(201).json(set);
  } catch (err) {
    next(err);
  }
};

export const updateWorkoutSet = async (req, res, next) => {
  try {
    const set = await WorkoutSet.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    const exercise = await WorkoutExercise.findById(set.workoutExerciseId);
    const workout = await Workout.findOne({
      _id: exercise.workoutId,
      userId: req.user.id,
      completed: false,
    });

    if (!workout) {
      return res.status(400).json({
        message: "Workout not found or already completed",
      });
    }

    Object.assign(set, req.body);
    await set.save();

    res.json(set);
  } catch (err) {
    next(err);
  }
};

export const deleteWorkoutSet = async (req, res, next) => {
  try {
    const set = await WorkoutSet.findById(req.params.id);
    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    const exercise = await WorkoutExercise.findById(set.workoutExerciseId);
    const workout = await Workout.findOne({
      _id: exercise.workoutId,
      userId: req.user.id,
      completed: false,
    });

    if (!workout) {
      return res.status(400).json({
        message: "Workout not found or already completed",
      });
    }

    await WorkoutSet.findByIdAndDelete(set._id);

    res.json({ message: "Set deleted successfully" });
  } catch (err) {
    next(err);
  }
};
