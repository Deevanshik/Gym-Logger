import Workout from "../models/workout.model.js";
import DayExercise from "../models/dayExercise.model.js";
import WorkoutExercise from "../models/workoutExercise.model.js";
import WorkoutSet from "../models/workoutSet.model.js";

export const getWorkouts = async (req, res, next) => {
  try {
    const { startDate, endDate, completed, limit = 20, skip = 0 } = req.query;

    const query = { userId: req.user.id };

    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const workouts = await Workout.find(query)
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .populate("splitId dayId");

    const total = await Workout.countDocuments(query);

    res.json({
      total,
      limit: Number(limit),
      skip: Number(skip),
      data: workouts,
    });
  } catch (err) {
    next(err);
  }
};

export const createWorkout = async (req, res, next) => {
  try {
    const { splitId, dayId, date } = req.body;

    const workout = await Workout.create({
      userId: req.user.id,
      splitId,
      dayId,
      date: date ? new Date(date) : Date.now(),
    });

    const dayExercises = await DayExercise.find({ dayId });

    const workoutExercises = dayExercises.map((ex) => ({
      workoutId: workout._id,
      exerciseTemplateId: ex.exerciseTemplateId,
      plannedSets: ex.targetSets,
      plannedRepRange: ex.targetRepRange,
    }));

    await WorkoutExercise.insertMany(workoutExercises);

    const populatedWorkout = await Workout.findById(workout._id).populate(
      "splitId dayId",
    );

    res.status(201).json(populatedWorkout);
  } catch (err) {
    next(err);
  }
};

export const getWorkoutById = async (req, res, next) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("splitId dayId");

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const exercises = await WorkoutExercise.find({
      workoutId: workout._id,
    }).populate("exerciseTemplateId");

    const exercisesWithSets = await Promise.all(
      exercises.map(async (ex) => {
        const sets = await WorkoutSet.find({ workoutExerciseId: ex._id });
        return { ...ex.toObject(), sets };
      }),
    );

    res.json({
      workout,
      exercises: exercisesWithSets,
    });
  } catch (err) {
    next(err);
  }
};

export const updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        completed: req.body.completed,
        date: req.body.date ? new Date(req.body.date) : Date.now(),
      },
      { new: true },
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json(workout);
  } catch (err) {
    next(err);
  }
};

export const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    const exercises = await WorkoutExercise.find({
      workoutId: workout._id,
    });

    const exerciseIds = exercises.map((e) => e._id);

    await WorkoutSet.deleteMany({
      workoutExerciseId: { $in: exerciseIds },
    });

    await WorkoutExercise.deleteMany({ workoutId: workout._id });

    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const getWorkoutCalendar = async (req, res, next) => {
  try {
    const { year, month } = req.params;

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const workouts = await Workout.find({
      userId: req.user.id,
      completed: true,
      date: { $gte: start, $lte: end },
    });

    const grouped = workouts.reduce((acc, w) => {
      const key = w.date.toISOString().split("T")[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push({
        id: w._id,
        splitId: w.splitId,
        dayId: w.dayId,
      });
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    next(err);
  }
};
