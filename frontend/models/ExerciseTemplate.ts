import mongoose, { Schema, models } from "mongoose";

const ExerciseTemplateSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    primaryMuscleGroup: {
      type: String,
      required: true,
    },
    secondaryMuscles: {
      type: [String],
      default: [],
    },
    cues: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default models.ExerciseTemplate ||
  mongoose.model("ExerciseTemplate", ExerciseTemplateSchema);
