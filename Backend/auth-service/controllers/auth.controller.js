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

    return res.status(201).json({
      message: "User registered Succesfully!",
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      createdAtFormatted: new Date(newUser.createdAt).toLocaleString(),
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login Controller
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide the required credentials to login",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or the password!" });
    }

    const ispassValid = await bcryptjs.compare(password, user.password);
    if (!ispassValid) {
      return res.status(400).json({
        message: "Invalid email or the password!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return res.status(200).json({
      message: "Login Succesfull!",
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

// getMe Controller
const getMeController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: "User details fetched succesfully",

      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

export { registerUsercontroller, loginUserController };
