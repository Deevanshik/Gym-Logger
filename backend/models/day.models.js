const daySchema = new mongoose.Schema(
  {
    splitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Split",
      required: true,
    },
    name: { type: String, required: true }, // ex - Push, Pull, Legs
    order: { type: Number },
  },
  { timestamps: true },
);

daySchema.index({ splitId: 1 });
daySchema.index({ splitId: 1, order: 1 });

export default mongoose.model("Day", daySchema);
