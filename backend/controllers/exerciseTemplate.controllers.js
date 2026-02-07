import ExerciseTemplate from "../models/exerciseTemplate.models.js";

export const getExerciseTemplates = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const templates = await ExerciseTemplate.find({ userId });
    console.log(templates);

    res.status(200).json(templates);
  } catch (error) {
    next(error);
  }
};

export const createExerciseTemplate = async (req, res, next) => {
  try {
    const { name, primaryMuscleGroup, secondaryMuscles, cues } = req.body;

    if (!name || !primaryMuscleGroup) {
      return res.status(400).json({
        message: "Name and primary muscle group are required",
      });
    }

    const template = await ExerciseTemplate.create({
      userId: req.user.id,
      name,
      primaryMuscleGroup,
      secondaryMuscles: secondaryMuscles || [],
      cues: cues || [],
    });

    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
};

export const getExerciseTemplateById = async (req, res, next) => {
  try {
    const template = await ExerciseTemplate.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!template) {
      return res.status(404).json({ message: "Exercise template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    next(error);
  }
};

export const updateExerciseTemplate = async (req, res, next) => {
  try {
    const template = await ExerciseTemplate.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ message: "Exercise template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    next(error);
  }
};

export const deleteExerciseTemplate = async (req, res, next) => {
  try {
    const template = await ExerciseTemplate.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!template) {
      return res.status(404).json({ message: "Exercise template not found" });
    }

    res.status(200).json({ message: "Exercise template deleted successfully" });
  } catch (error) {
    next(error);
  }
};
