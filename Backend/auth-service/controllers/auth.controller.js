import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// Register Controller
const registerUsercontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide the name, email and the password!",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already present please login!",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "45m",
    });

    return res.status(201).json(
      {
        message: "User registered Succesfully!",
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        createdAtFormatted: new Date(newUser.createdAt).toLocaleString(),
        token
      },
      
    );
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export {registerUsercontroller};
