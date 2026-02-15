import Link from "next/link";
import styles from "./page.module.css";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className={styles.homeRoot}>
      <main className={styles.homeMain}>
        <section className={styles.hero}>
          <span className={styles.heroEyebrow}>— Gym Logger —</span>
          <h1>
            Track Your Training.
            <span>Get Stronger.</span>
          </h1>
          <p>
            A focused gym logger built for lifters who care about long-term
            consistency.
          </p>
          <div className={styles.heroCta}>
            <Link href="/dashboard" className={styles.btnPrimary}>
              Start Logging
            </Link>
            <Link href="/dashboard" className={styles.btnGhost}>
              Dashboard
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Features</span>
            <h2 className={styles.sectionTitle}>Built for the Basics</h2>
          </div>

          <div className={styles.cardGrid}>
            <Card number="01" title="Workout Tracking" />
            <Card number="02" title="Progress Over Time" />
            <Card number="03" title="Secure Data" />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Process</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSub}>Three steps. No fluff.</p>
          </div>

          <div className={styles.cardGrid}>
            <Card number="01" title="Create Split" />
            <Card number="02" title="Log Workout" />
            <Card number="03" title="Review Progress" />
          </div>
        </section>

        <section className={styles.philosophy}>
          <div className={styles.philosophyInner}>
            <h3>Built for Serious Consistency</h3>
            <p>No noise. Just training, structure, and progress.</p>
          </div>
        </section>
      </main>

      <footer className={styles.homeFooter}>
        <div className={styles.footerInner}>
          <div>
            <div className={styles.footerBrand}>
              Gym<span>Logger</span>
            </div>
            <div className={styles.footerTagline}>
              Simple training logs for consistent lifters
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureNumber}>{index}</div>
      <h3>{title}</h3>
    </div>
  );
}

function Step({ step, text }: { step: number; text: string }) {
  return (
    <div className={styles.stepItem}>
      <div className={styles.stepNum}>{String(step).padStart(2, "0")}</div>
      <p>{text}</p>
    </div>
  );
}
