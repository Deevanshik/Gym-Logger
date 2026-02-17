import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ExerciseTemplate from "@/models/ExerciseTemplate";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const templates = await ExerciseTemplate.find({
    userId: session.user.id,
  });

  return NextResponse.json(templates, { status: 200 });
}

export async function POST(req: Request) {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, primaryMuscleGroup, secondaryMuscles, cues } =
    await req.json();

  if (!name || !primaryMuscleGroup) {
    return NextResponse.json(
      { message: "Name and primary muscle group are required" },
      { status: 400 }
    );
  }

  const template = await ExerciseTemplate.create({
    userId: session.user.id,
    name,
    primaryMuscleGroup,
    secondaryMuscles: secondaryMuscles || [],
    cues: cues || [],
  });

  return NextResponse.json(template, { status: 201 });
}
