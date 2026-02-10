import mongoose from "mongoose";

const workoutExerciseSchema = new mongoose.Schema(
  {
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
    exerciseTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseTemplate",
      required: true,
    },
    plannedSets: Number,
    plannedRepRange: String,
  },
  { timestamps: true },
);

workoutExerciseSchema.index({ workoutId: 1 });
workoutExerciseSchema.index({ exerciseTemplateId: 1 });

export default mongoose.model("WorkoutExercise", workoutExerciseSchema);
