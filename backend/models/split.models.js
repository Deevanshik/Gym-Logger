const splitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true }, // ex - bro split, push pull legs
  },
  { timestamps: true },
);

splitSchema.index({ userId: 1 });

export default mongoose.model("Split", splitSchema);
