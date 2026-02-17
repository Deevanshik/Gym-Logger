export interface DefaultTemplate {
  name: string;
  primaryMuscleGroup: string;
  secondaryMuscles: string[];
  cues: string[];
}

export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  // ── Push ──────────────────────────────────────────────────────────
  {
    name: "Barbell Bench Press",
    primaryMuscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Shoulders"],
    cues: [
      "Retract and depress scapula",
      "Drive feet into the floor",
      "Bar touches lower chest",
      "Elbows at ~75° from torso",
    ],
  },
  {
    name: "Overhead Press",
    primaryMuscleGroup: "Shoulders",
    secondaryMuscles: ["Triceps", "Core"],
    cues: [
      "Brace core and squeeze glutes",
      "Bar path straight up over mid-foot",
      "Shrug at the top for full ROM",
    ],
  },
  {
    name: "Tricep Pushdown",
    primaryMuscleGroup: "Triceps",
    secondaryMuscles: [],
    cues: [
      "Keep elbows pinned to sides",
      "Full extension at the bottom",
      "Squeeze at lockout",
    ],
  },

  // ── Pull ──────────────────────────────────────────────────────────
  {
    name: "Pull Up",
    primaryMuscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Core"],
    cues: [
      "Dead hang at the bottom",
      "Pull elbows down toward hips",
      "Chin clearly over the bar",
    ],
  },
  {
    name: "Barbell Row",
    primaryMuscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Rear Deltoids"],
    cues: [
      "Hinge to ~45° torso angle",
      "Pull bar to lower sternum",
      "Squeeze shoulder blades at top",
    ],
  },
  {
    name: "Dumbbell Curl",
    primaryMuscleGroup: "Biceps",
    secondaryMuscles: ["Forearms"],
    cues: [
      "Keep upper arm stationary",
      "Supinate wrist at the top",
      "Lower under control — no swinging",
    ],
  },

  // ── Legs ──────────────────────────────────────────────────────────
  {
    name: "Barbell Back Squat",
    primaryMuscleGroup: "Quadriceps",
    secondaryMuscles: ["Glutes", "Hamstrings", "Core"],
    cues: [
      "Bar on mid-trap shelf",
      "Break at hips and knees simultaneously",
      "Knees track over toes",
      "Hip crease below knee at bottom",
    ],
  },
  {
    name: "Romanian Deadlift",
    primaryMuscleGroup: "Hamstrings",
    secondaryMuscles: ["Glutes", "Back"],
    cues: [
      "Soft bend in knees throughout",
      "Push hips back — not down",
      "Bar stays close to legs",
      "Feel the hamstring stretch before reversing",
    ],
  },
  {
    name: "Hip Thrust",
    primaryMuscleGroup: "Glutes",
    secondaryMuscles: ["Hamstrings"],
    cues: [
      "Bench at mid-scapula",
      "Chin tucked to chest",
      "Full hip extension at top",
      "Drive through the whole foot",
    ],
  },
  {
    name: "Standing Calf Raise",
    primaryMuscleGroup: "Calves",
    secondaryMuscles: [],
    cues: [
      "Full stretch at the bottom",
      "Pause and squeeze at the top",
      "Slow eccentric — 3 seconds down",
    ],
  },

  // ── Core ──────────────────────────────────────────────────────────
  {
    name: "Plank",
    primaryMuscleGroup: "Core",
    secondaryMuscles: ["Shoulders"],
    cues: [
      "Neutral spine — no hips sagging",
      "Squeeze glutes and quads",
      "Breathe steadily throughout",
    ],
  },
];