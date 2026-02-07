const workoutSetSchema = new mongoose.Schema(
  {
    workoutExerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutExercise",
      required: true,
    },
    setNumber: { type: Number, required: true },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
    completed: { type: Boolean, default: true },
  },
  { timestamps: true },
);

workoutSetSchema.index({ workoutExerciseId: 1 });
workoutSetSchema.index({ workoutExerciseId: 1, setNumber: 1 });

export default mongoose.model("WorkoutSet", workoutSetSchema);
