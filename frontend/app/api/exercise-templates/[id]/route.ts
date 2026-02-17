import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ExerciseTemplate from "@/models/ExerciseTemplate";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Params = {
  params: {
    id: string;
  };
};

/* GET by ID */
export async function GET(_: Request, { params }: Params) {
  await connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const template = await ExerciseTemplate.findOne({
    _id: params.id,
    userId: session.user.id,
  });

  if (!template) {
    return NextResponse.json(
      { message: "Exercise template not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(template, { status: 200 });
}

/* PUT (update) */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await context.params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const template = await ExerciseTemplate.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    body,
    { new: true, runValidators: true },
  );

  if (!template) {
    return NextResponse.json(
      { message: "Exercise template not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(template, { status: 200 });
}

/* DELETE */
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await context.params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const template = await ExerciseTemplate.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  if (!template) {
    return NextResponse.json(
      { message: "Exercise template not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Exercise template deleted successfully" },
    { status: 200 },
  );
}
