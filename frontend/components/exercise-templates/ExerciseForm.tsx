"use client";

import styles from "@/app/page.module.css";
import "./exercise-form.css";

export const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Forearms",
  "Core",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Full Body",
];

export interface ExerciseFormValues {
  name: string;
  primaryMuscleGroup: string;
  secondaryMuscles: string; // comma-separated string in the form
  cues: string; // newline-separated string in the form
}

interface Props {
  values: ExerciseFormValues;
  onChange: (values: ExerciseFormValues) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitting: boolean;
  error: string;
  submitLabel?: string;
}

export default function ExerciseForm({
  values,
  onChange,
  onSubmit,
  onCancel,
  submitting,
  error,
  submitLabel = "Save",
}: Props) {
  const set =
    (field: keyof ExerciseFormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      onChange({ ...values, [field]: e.target.value });

  return (
    <form onSubmit={onSubmit} className="ef-form">
      {error && <p className="ef-error">{error}</p>}

      <Field label="Exercise Name *">
        <input
          className="ef-input"
          type="text"
          value={values.name}
          onChange={set("name")}
          placeholder="Bench Press"
          required
        />
      </Field>

      <Field label="Primary Muscle Group *">
        <select
          className="ef-input"
          value={values.primaryMuscleGroup}
          onChange={set("primaryMuscleGroup")}
          required
        >
          <option value="">Select Primary Muscle group</option>
          {MUSCLE_GROUPS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Secondary Muscles" hint="Comma-separated">
        <input
          className="ef-input"
          type="text"
          placeholder="front delts, triceps"
          value={values.secondaryMuscles}
          onChange={set("secondaryMuscles")}
        />
      </Field>

      <Field label="Coaching Cues" hint="One cue per line">
        <textarea
          className="ef-input ef-textarea"
          value={values.cues}
          placeholder={`Feet planted, drive through the floor
Retract scapulae, chest up
Control the descent, press explosively`}
          onChange={set("cues")}
          rows={5}
        />
      </Field>

      <div className="ef-actions">
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={submitting}
        >
          {submitting ? "Saving…" : submitLabel}
        </button>
        <button type="button" className={styles.btnGhost} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ef-field">
      <label className="ef-label">
        {label}
        {hint && <span className="ef-hint"> | {hint}</span>}
      </label>
      {children}
    </div>
  );
}
