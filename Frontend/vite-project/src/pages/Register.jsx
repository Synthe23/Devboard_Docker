import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function validateform(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === "") {
      setError("Name is required!");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address!");
      return;
    }

    if (pass.trim() === "") {
      setError("Password is required!");
      return;
    }

    if (pass.length < 8) {
      setError("Password must be at least 8 characters long!");
      return;
    }

    if (confirmPass === "" || confirmPass !== pass) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: pass,
      });

      setSuccess(response.data.message || "Registration successful!");

      setName("");
      setEmail("");
      setPass("");
      setConfirmPass("");

      // Give the user a moment to read the success message.
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed! Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create an account</h1>

      <form onSubmit={validateform}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
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
            name="pass"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password..."
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPass">Confirm Password</label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Re-enter your password..."
            autoComplete="new-password"
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterUser;
