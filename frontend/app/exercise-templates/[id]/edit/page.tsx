"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/page.module.css";
import ExerciseForm, {
  ExerciseFormValues,
} from "@/components/exercise-templates/ExerciseForm";
import "./edit.css";

interface ExerciseTemplate {
  _id: string;
  name: string;
  primaryMuscleGroup: string;
  secondaryMuscles: string[];
  cues: string[];
}

export default function EditExercisePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [template, setTemplate] = useState<ExerciseTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [form, setForm] = useState<ExerciseFormValues>({
    name: "",
    primaryMuscleGroup: "",
    secondaryMuscles: "",
    cues: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  /* Fetch the single template */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/exercise-templates/${id}`);
        if (!res.ok) throw new Error("Exercise not found.");
        const t: ExerciseTemplate = await res.json();
        setTemplate(t);
        setForm({
          name: t.name,
          primaryMuscleGroup: t.primaryMuscleGroup,
          secondaryMuscles: t.secondaryMuscles.join(", "),
          cues: t.cues.join("\n"),
        });
      } catch (e: any) {
        setFetchError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* Update */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.name.trim() || !form.primaryMuscleGroup) {
      setFormError("Name and primary muscle group are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/exercise-templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          primaryMuscleGroup: form.primaryMuscleGroup,
          secondaryMuscles: form.secondaryMuscles
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          cues: form.cues
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to update template.");
      }

      router.push("/exercise-templates");
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* Delete */
  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/exercise-templates/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete template.");
      router.push("/exercise-templates");
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render ── */
  if (loading)
    return (
      <PageShell>
        <p className="ee-muted">Loading…</p>
      </PageShell>
    );
  if (fetchError)
    return (
      <PageShell>
        <p className="ee-error">{fetchError}</p>
      </PageShell>
    );

  return (
    <PageShell title={template?.name}>
      <ExerciseForm
        values={form}
        onChange={setForm}
        onSubmit={handleUpdate}
        onCancel={() => router.push("/exercise-templates")}
        submitting={submitting}
        error={formError}
        submitLabel="Save Changes"
      />

      {/* ── Danger zone ── */}
      <div className="ee-danger-zone">
        <p className="ee-danger-label">Danger Zone</p>

        {!deleteConfirm ? (
          <button
            className="ee-btn-delete"
            onClick={() => setDeleteConfirm(true)}
            disabled={submitting}
          >
            Delete Exercise
          </button>
        ) : (
          <div className="ee-confirm">
            <p className="ee-confirm-text">
              Are you sure? This action cannot be undone.
            </p>
            <div className="ee-confirm-actions">
              <button
                className="ee-btn-delete"
                onClick={handleDelete}
                disabled={submitting}
              >
                {submitting ? "Deleting…" : "Yes, Delete"}
              </button>
              <button
                className="ee-btn-cancel"
                onClick={() => setDeleteConfirm(false)}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

/* Shared page shell so the hero/nav is consistent */
function PageShell({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
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
            <p className={styles.sectionLabel}>Edit Entry</p>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
