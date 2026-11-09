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
    <div className="min-h-screen flex items-center justify-center bg-[#080d18] px-4 py-10 font-mono relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-150px] left-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-[-150px] right-[-100px] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-[#111827]/90 border border-slate-700/60 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-400">D.</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-3">
            Join Devboard
          </p>

          <h1 className="text-3xl font-bold text-white mb-3">Create Account</h1>

          <p className="text-sm text-slate-400">
            Create your account and start managing your tasks.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={validateform} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-600 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-slate-300 mb-2"
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-600 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="pass" className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="pass"
              id="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-600 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10"
            />

            <p className="text-xs text-slate-500 mt-2">
              Minimum 8 characters required.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPass"
              className="block text-sm text-slate-300 mb-2"
            >
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPass"
              id="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm placeholder:text-slate-600 outline-none transition duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              role="status"
              className="text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3"
            >
              {success}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account ->"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-600 tracking-wider">
            DEVBOARD // BUILT FOR DEVELOPERS
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
