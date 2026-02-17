"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import "./exercise-templates.css";
import Link from "next/link";

interface ExerciseTemplate {
  _id: string;
  name: string;
  primaryMuscleGroup: string;
  secondaryMuscles: string[];
  cues: string[];
}

type View = "list" | "create" | "detail";

const MUSCLE_GROUPS = [
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

const blankForm = {
  name: "",
  primaryMuscleGroup: "",
  secondaryMuscles: "",
  cues: "",
};

export default function ExerciseTemplatesPage() {
  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<ExerciseTemplate | null>(null);

  const [form, setForm] = useState(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /*  Fetch all  */
  const fetchTemplates = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/exercise-templates");
      if (!res.ok) throw new Error("Failed to load exercise templates.");
      const data = await res.json();
      setTemplates(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  /* Create */
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.primaryMuscleGroup) {
      setFormError("Name and primary muscle group are required.");
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
            ? form.secondaryMuscles
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          cues: form.cues
            ? form.cues
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to create template.");
      }
      setForm(blankForm);
      await fetchTemplates();
      setView("list");
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* Update */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setFormError("");
    if (!form.name.trim() || !form.primaryMuscleGroup) {
      setFormError("Name and primary muscle group are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/exercise-templates/${selected._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          primaryMuscleGroup: form.primaryMuscleGroup,
          secondaryMuscles: form.secondaryMuscles
            ? form.secondaryMuscles
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
          cues: form.cues
            ? form.cues
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            : [],
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Failed to update template.");
      }
      const updated = await res.json();
      setSelected(updated);
      setEditMode(false);
      await fetchTemplates();
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* Delete */
  const handleDelete = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/exercise-templates/${selected._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete template.");
      setSelected(null);
      setDeleteConfirm(false);
      setView("list");
      await fetchTemplates();
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Open detail ── */
  const openDetail = (t: ExerciseTemplate) => {
    setSelected(t);
    setEditMode(false);
    setDeleteConfirm(false);
    setFormError("");
    setForm({
      name: t.name,
      primaryMuscleGroup: t.primaryMuscleGroup,
      secondaryMuscles: t.secondaryMuscles.join(", "),
      cues: t.cues.join("\n"),
    });
    setView("detail");
  };

  /* ── Open create ── */
  const openCreate = () => {
    setForm(blankForm);
    setFormError("");
    setView("create");
  };

  /* ── Filtered list ── */
  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.primaryMuscleGroup.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={styles.homeRoot}>
      <main className={styles.homeMain}>
        <section className={styles.hero}>
          <span className={styles.heroEyebrow}>
            Training <span className="text-[#e8e8e8]">Library</span>
          </span>
          <p>
            Build and manage your personal movement library. Track muscle
            targets, coaching cues, and create reusable templates for any
            program.
          </p>
          <div className={styles.heroCta}>
            {view === "list" && (
              <button className={styles.btnPrimary} onClick={openCreate}>
                + New Template
              </button>
            )}
            {view !== "list" && (
              <button
                className={styles.btnGhost}
                onClick={() => setView("list")}
              >
                ← Back to List
              </button>
            )}
            {view === "list" && (
              <Link
              href={"/dashboard"}
                className={styles.btnGhost}
              >
                Dashboard
              </Link>
            )}
          </div>
        </section>

        {view === "list" && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>Your Library</p>
              <h2 className={styles.sectionTitle}>All Exercises</h2>
              <p className={styles.sectionSub}>
                {templates.length} templates saved
              </p>
            </div>

            {/* Search */}
            <div className="et-search-row">
              <input
                className="et-search-input"
                type="text"
                placeholder="Search by name or muscle group…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {loading && <p className="et-muted">Loading templates…</p>}
            {error && <p className="et-error-text">{error}</p>}

            {!loading && !error && filtered.length === 0 && (
              <div className="et-empty-state">
                <p className="et-empty-title">No exercises yet</p>
                <p className="et-muted">
                  Hit <strong>+ New Template</strong> to add your first
                  exercise.
                </p>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className={styles.cardGrid}>
                {filtered.map((t, i) => (
                  <div
                    key={t._id}
                    className={`${styles.card} et-clickable-card`}
                    onClick={() => openDetail(t)}
                  >
                    <div className={styles.cardNumber}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.cardTitle}>{t.name}</div>

                    <div className="et-muscle-tag">{t.primaryMuscleGroup}</div>

                    {t.secondaryMuscles.length > 0 && (
                      <p className={styles.cardText}>
                        + {t.secondaryMuscles.join(", ")}
                      </p>
                    )}

                    {t.cues.length > 0 && (
                      <p className={`${styles.cardText} et-cue-count`}>
                        {t.cues.length} cue{t.cues.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {(view === "create" || view === "detail") && (
          <section className={styles.section}>
            {view === "create" && (
              <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>New Entry</p>
                <h2 className={styles.sectionTitle}>Create Template</h2>
              </div>
            )}

            <form
              onSubmit={view === "create" ? handleCreate : handleUpdate}
              className="et-form"
            >
              {formError && <p className="et-error-text">{formError}</p>}

              <FormField label="Exercise Name *">
                <input
                  className="et-input"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </FormField>

              <FormField label="Primary Muscle Group *">
                <select
                  className="et-input"
                  value={form.primaryMuscleGroup}
                  onChange={(e) =>
                    setForm({ ...form, primaryMuscleGroup: e.target.value })
                  }
                  required
                >
                  <option value="">Select a muscle group</option>
                  {MUSCLE_GROUPS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Secondary Muscles" hint="Comma-separated">
                <input
                  className="et-input"
                  type="text"
                  value={form.secondaryMuscles}
                  onChange={(e) =>
                    setForm({ ...form, secondaryMuscles: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Coaching Cues" hint="One cue per line">
                <textarea
                  className="et-input et-textarea"
                  value={form.cues}
                  onChange={(e) => setForm({ ...form, cues: e.target.value })}
                  rows={5}
                />
              </FormField>

              <div className="et-form-actions">
                <button
                  type="submit"
                  className={styles.btnPrimary}
                  disabled={submitting}
                >
                  {submitting ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={() =>
                    view === "create" ? setView("list") : setEditMode(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );

  function FormField({
    label,
    hint,
    children,
  }: {
    label: string;
    hint?: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="et-field">
        <label className="et-label">
          {label}
          {hint && <span className="et-hint"> — {hint}</span>}
        </label>
        {children}
      </div>
    );
  }
}
