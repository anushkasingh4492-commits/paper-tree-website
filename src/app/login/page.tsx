"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = (formData.get("email") || "").toString();
    const password = (formData.get("password") || "").toString();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Successful sign-in → go to /dashboard, which redirects to the user's institute.
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Institute Login</h2>
        <p className="sub">
          Sign in to access your institute&rsquo;s private assessment dashboard.
        </p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="login-actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
        <div className="login-demo">
          <p>
            <b>Demo credentials (Vigyaan Academy):</b><br />
            admin@vigyaan.ac.in / admin123<br />
            student@vigyaan.ac.in / student123
          </p>
          <p>
            <b>Demo credentials (Infinity Classes):</b><br />
            admin@infinity.classes.in / admin123<br />
            student@infinity.classes.in / student123
          </p>
          <p style={{ marginTop: 14, fontSize: 12 }}>
            Institute without an account? Email{" "}
            <a href="mailto:info@papertreestudio.in">info@papertreestudio.in</a>
            to request access.
          </p>
        </div>
      </div>
    </div>
  );
}
