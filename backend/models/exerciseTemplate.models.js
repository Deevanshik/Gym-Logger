const exerciseTemplateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true }, // ex: Bench Press
    primaryMuscleGroup: { type: String, required: true }, // ex: Chest
    secondaryMuscles: [String], // ex: [triceps, shoulders]
    cues: [String], // ex: inhale while going up...
  },
  { timestamps: true },
);

exerciseTemplateSchema.index({ userId: 1 });
exerciseTemplateSchema.index({ name: 1 });
exerciseTemplateSchema.index({ primaryMuscleGroup: 1 });

export default mongoose.model("ExerciseTemplate", exerciseTemplateSchema);
