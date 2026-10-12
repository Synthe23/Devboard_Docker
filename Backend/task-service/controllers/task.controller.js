import express from "express";
import Task from "../models/task.model.js";

// Create a new task controller
export async function createTaskController(req, res) {
  try {
    const { title, description, status, priority } = req.body;

    // 1. Receive data from req body
    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        message: "Please enter all the required fields!",
      });
    }
    // 2. Create a new task
    const task = new Task({
      title,
      description,
      status,
      priority,
    });

    // 3. Save the task
    const savedTask = await task.save();

    // 4. Return the created task
    return res.status(201).json({
      success: true,
      message: "Task created succesfully!",
      savedTask,
    });
  } catch (error) {
    console.error("Error creating task: ", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Mongoose validation error!",
      });
    }

    return res.status(500).json({
      message: "Server error!",
    });
  }
}

// Get all the task controller
export async function getAllTaskController(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched succesfully!",
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Get a task by id
export async function getTaskByIdController(req, res) {
  
}

export { createTaskController, getAllTaskController, getTaskByIdController };
