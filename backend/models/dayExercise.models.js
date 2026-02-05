const dayExerciseSchema = new mongoose.Schema(
  {
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: "Day", required: true },
    exerciseTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseTemplate",
      required: true,
    },
    targetSets: { type: Number, required: true },
    targetRepRange: { type: String, required: true }, // ex: "8-12"
    targetWeight: { type: Number }, // ex: 45 kg
    order: { type: Number },
  },
  { timestamps: true },
);

dayExerciseSchema.index({ dayId: 1 });
dayExerciseSchema.index({ exerciseTemplateId: 1 });

export default mongoose.model("DayExercise", dayExerciseSchema);
