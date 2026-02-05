const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    splitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Split",
      required: true,
    },
    dayId: { type: mongoose.Schema.Types.ObjectId, ref: "Day", required: true },
    date: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

workoutSchema.index({ userId: 1, date: -1 });
workoutSchema.index({ userId: 1, completed: 1 });
workoutSchema.index({ dayId: 1 });

export default mongoose.model("Workout", workoutSchema);
