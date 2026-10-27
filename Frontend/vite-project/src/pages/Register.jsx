import React from "react";
import { useState } from "react";

function RegisterUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function validateform(e) {
    e.preventDefault();

    if (name.trim() === "") {
      return "Empty name!";
    }

    if (email.trim().toLowerCase() === "" || !email.includes("@gmail.com")) {
      return "Email field empty or not in valid format";
    }

    if (pass.trim() === "") {
      return "Empty password field";
    }

    if (confirmPass.trim() === "" || confirmPass !== pass) {
      return "Empty or different password than password!";
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
