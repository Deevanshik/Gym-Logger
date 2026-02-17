"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import styles from "./auth-client.module.css";

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Google authentication failed",
      );
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const { error } = await authClient.signIn.email({
          email,
          password,
          rememberMe: true,
        });
        if (error) return setError(error.message as string);
      } else {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (error) return setError(error.message as string);
      }
      router.push("/dashboard");
    } catch {
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authRoot}>
      <div className={styles.authCard}>
        <button onClick={() => router.push("/")} className={styles.backBtn}>
          ← Back
        </button>

        <div className={styles.authHeading}>
          <h1>
            {isSignIn ? (
              <>
                <span>SIGN</span> IN
              </>
            ) : (
              <>
                <span>JOIN</span> NOW
              </>
            )}
          </h1>
          <p>
            {isSignIn
              ? "Welcome back. Let's get to work."
              : "Build your record. Start tracking."}
          </p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className={styles.googleBtn}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <form onSubmit={handleEmailAuth}>
          <div className={styles.formFields}>
            {!isSignIn && (
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? "Redirecting..." : isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          className={styles.toggleBtn}
          onClick={() => {
            setIsSignIn(!isSignIn);
            setError("");
            setName("");
          }}
        >
          {isSignIn ? "No account? Sign up" : "Already a member? Sign in"}
        </button>
      </div>
    </div>
  );
}
