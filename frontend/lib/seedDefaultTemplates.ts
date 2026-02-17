import { connectDB } from "@/lib/db";
import ExerciseTemplate from "@/models/ExerciseTemplate";
import { DEFAULT_TEMPLATES } from "@/lib/defaultTemplates";

export async function seedDefaultTemplates(userId: string): Promise<void> {
  await connectDB();

  const existing = await ExerciseTemplate.countDocuments({ userId });

  if (existing > 0) return;

  await ExerciseTemplate.insertMany(
    DEFAULT_TEMPLATES.map((template) => ({
      ...template,
      userId,
    })),
  );
}
