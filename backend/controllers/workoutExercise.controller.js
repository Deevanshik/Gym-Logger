import Workout from "../models/workout.model.js";
import WorkoutExercise from "../models/workoutExercise.model.js";
import WorkoutSet from "../models/workoutSet.model.js";

export const getWorkoutExercises = async (req, res, next) => {
  try {
    const { workoutId } = req.params;

    const workout = await Workout.findOne({
      _id: workoutId,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const exercises = await WorkoutExercise.find({ workoutId })
      .populate("exerciseTemplateId");

    const result = await Promise.all(
      exercises.map(async (ex) => {
        const sets = await WorkoutSet.find({
          workoutExerciseId: ex._id,
        }).sort({ setNumber: 1 });

        return { ...ex.toObject(), sets };
      })
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const addWorkoutExercise = async (req, res, next) => {
  try {
    const { workoutId } = req.params;
    const { exerciseTemplateId, plannedSets, plannedRepRange } = req.body;

    const workout = await Workout.findOne({
      _id: workoutId,
      userId: req.user.id,
      completed: false,
    });

    if (!workout) {
      return res.status(400).json({
        message: "Workout not found or already completed",
      });
    }

    const workoutExercise = await WorkoutExercise.create({
      workoutId,
      exerciseTemplateId,
      plannedSets,
      plannedRepRange,
    });
    if (plannedSets && plannedSets > 0) {
      const sets = Array.from({ length: plannedSets }).map((_, i) => ({
        workoutExerciseId: workoutExercise._id,
        setNumber: i + 1,
        weight: 0,
        reps: 0,
        completed: false,
      }));

      await WorkoutSet.insertMany(sets);
    }

    const populated = await WorkoutExercise.findById(
      workoutExercise._id
    ).populate("exerciseTemplateId");

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

export const getWorkoutExerciseById = async (req, res, next) => {
  try {
    const exercise = await WorkoutExercise.findById(req.params.id)
      .populate("exerciseTemplateId");

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

    res.json({ ...exercise.toObject(), sets });
  } catch (err) {
    next(err);
  }
};

export const deleteWorkoutExercise = async (req, res, next) => {
  try {
    const exercise = await WorkoutExercise.findById(req.params.id);

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

    await WorkoutSet.deleteMany({
      workoutExerciseId: exercise._id,
    });

    await WorkoutExercise.findByIdAndDelete(exercise._id);

    res.json({ message: "Exercise removed successfully" });
  } catch (err) {
    next(err);
  }
};

