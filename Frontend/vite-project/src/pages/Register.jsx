import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  function validateform(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === "") {
      setError("Empty name!");
    }

    if (email.trim().toLowerCase() === "" || !emailRegex.test(email)) {
      setError("Email field empty or not in valid format");
    }

    if (pass.trim() === "") {
      setError("Empty password field");
    }

    if (pass.length < 8) {
      setError("Password length shall be atleast 8 chars long!");
    }

    if (confirmPass.trim() === "" || confirmPass !== pass) {
      setError("Empty or different password than password!");
      return;
    }

    // Regestration request to backend
    try {
      setLoading(true);

      const response = axios.post("/auth/api/register/", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: pass.trim(),
      });

      setSuccess(response.data.message || "Registration succesfull!");

      setName("");
      setEmail("");
      setPass("");
      setConfirmPass("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed! Please try again later!"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form action="" onSubmit={validateform}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter your name..."
        />
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />
        <input
          type="text"
          name="pass"
          id="pass"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          placeholder="Enter your password..."
        />
        <input
          type="text"
          name="confirmPass"
          id="confirmPass"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
          placeholder="Re-enter password..."
        />
        <button>Register!</button>
      </form>
    </div>
  );
}

export default RegisterUser;

// fullname
// email
// password
// confirm password
// register button
// link to the login page
