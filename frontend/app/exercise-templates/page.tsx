"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import "./exercise-templates.css";

interface ExerciseTemplate {
  _id: string;
  name: string;
  primaryMuscleGroup: string;
  secondaryMuscles: string[];
  cues: string[];
}

export default function ExerciseTemplatesPage() {
  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("/api/exercise-templates");
        if (!res.ok) throw new Error("Failed to load exercise templates.");
        setTemplates(await res.json());
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.primaryMuscleGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.homeRoot}>
      <main className={styles.homeMain}>

        {/* ── Hero ── */}
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
            <Link href="/exercise-templates/create" className={styles.btnPrimary}>
              + New Template
            </Link>
            <Link href="/dashboard" className={styles.btnGhost}>
              Dashboard
            </Link>
          </div>
        </section>

        {/* ── List ── */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Your Library</p>
            <h2 className={styles.sectionTitle}>All Exercises</h2>
            <p className={styles.sectionSub}>{templates.length} templates saved</p>
          </div>

          <input
            className="et-search"
            type="text"
            placeholder="Search by name or muscle group…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading && <p className="et-muted">Loading templates…</p>}
          {error   && <p className="et-error">{error}</p>}

          {!loading && !error && filtered.length === 0 && (
            <div className="et-empty">
              <p className="et-empty-title">No exercises yet</p>
              <p className="et-muted">
                Hit <strong>+ New Template</strong> to add your first exercise.
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className={styles.cardGrid}>
              {filtered.map((t, i) => (
                <Link
                  key={t._id}
                  href={`/exercise-templates/${t._id}/edit`}
                  className={`${styles.card} et-card`}
                >
                  <div className={styles.cardNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.cardTitle}>{t.name}</div>
                  <span className="et-tag">{t.primaryMuscleGroup}</span>

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
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}