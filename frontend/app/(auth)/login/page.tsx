"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    // Access token comes here
    const data = await res.json();
    localStorage.setItem("accessToken", data.accessToken);

    window.location.href = "/dashboard";
  };

  return (
    <div>
      <h1>Login</h1>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
