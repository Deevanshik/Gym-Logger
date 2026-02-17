"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/page.module.css";
import ExerciseForm, {
  ExerciseFormValues,
} from "@/components/exercise-templates/ExerciseForm";

const blank: ExerciseFormValues = {
  name: "",
  primaryMuscleGroup: "",
  secondaryMuscles: "",
  cues: "",
};

export default function CreateExercisePage() {
  const router = useRouter();
  const [form, setForm] = useState<ExerciseFormValues>(blank);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.primaryMuscleGroup) {
      setError("Name and primary muscle group are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/exercise-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          primaryMuscleGroup: form.primaryMuscleGroup,
          secondaryMuscles: form.secondaryMuscles
            .split(",").map((s) => s.trim()).filter(Boolean),
          cues: form.cues
            .split("\n").map((s) => s.trim()).filter(Boolean),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create template.");
      }

      router.push("/exercise-templates");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.homeRoot}>
      <main className={styles.homeMain}>

        <section className={styles.hero}>
          <span className={styles.heroEyebrow}>
            Training <span className="text-[#e8e8e8]">Library</span>
          </span>
          <div className={styles.heroCta}>
            <Link href="/exercise-templates" className={styles.btnGhost}>
              ← Back to List
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>New Entry</p>
            <h2 className={styles.sectionTitle}>Create Template</h2>
          </div>

          <ExerciseForm
            values={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/exercise-templates")}
            submitting={submitting}
            error={error}
            submitLabel="Create"
          />
        </section>

      </main>
    </div>
  );
}