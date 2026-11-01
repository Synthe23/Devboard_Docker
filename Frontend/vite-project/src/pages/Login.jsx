import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address!");
      return;
    }

    // Validate password
    if (pass === "") {
      setError("Password is required!");
      return;
    }

    try {
      setLoading(true);

      // Send login request through the API Gateway
      const response = await api.post("/api/auth/login", {
        email: email.trim().toLowerCase(),
        password: pass,
      });

      const { token } = response.data;

      if (!token) {
        setError("Login failed: authentication token was not received.");
        return;
      }

      sessionStorage.setItem("token", token);

      setSuccess(response.data.message || "Login successful!");

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed! Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Welcome Back!</h1>
      <p>Login to continue to Devboard.</p>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email Address</label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="pass">Password</label>

          <input
            type="password"
            id="pass"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password..."
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {success && (
          <p role="status" style={{ color: "green" }}>
            {success}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginUser;