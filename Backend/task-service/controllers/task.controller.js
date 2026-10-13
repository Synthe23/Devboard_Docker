import express from "express";
import Task from "../models/task.model.js";

// Create a new task
 async function createTaskController(req, res) {
  try {
    const { title, description, status, priority } = req.body;

    const userId = req.user.userId;

    // 1. Receive data from req body
    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        message: "Please enter all the required fields!",
      });
    }

    // 2. Create a new task
    const task = new Task({ userId, title, description, status, priority });

    // 3. Save the task
    const savedTask = await task.save();

    // 4. Return the created task
    return res.status(201).json({
      success: true,
      message: "Task created successfully!",
      savedTask,
    });
  } catch (error) {
    // console.error("Error creating task: ", error.message);
    // if (error.name === "ValidationError") {
    //   return res.status(400).json({
    //     message: "Mongoose validation error!",
    //   });
    // }
    return res.status(500).json({
      message: "Server error!",
      error: error.message
    });
  }
}

// Get all tasks
 async function getAllTaskController(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully!",
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
 async function getTaskByIdController(req, res) {
  try {
    const { id } = req.params;

    // FIX: Pass 'id' directly instead of an object '{ id }'
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        // Changed from 400 to 404 (Not Found)
        message: "Task not found with the provided ID!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Query Successful!",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Update the task by ID
 async function updateTaskByIdController(req, res) {
  try {
    const { id } = req.params;

    // FIX: Destructure values from req.body so they are defined
    const { title, description, status, priority } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No task found with this ID!",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

// Find a task by id and delete
async function deleteTaskByIdController(req, res) {
  try {
    const { id } = req.params;

    // FIX: Pass 'id' directly instead of an object '{ id }'
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: `No task with this ID: ${id}`,
      });
    }

    // FIX: Pass 'id' directly instead of an object '{ id }'
    const deletedTask = await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted Successfully!",
      deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
}

export {
  createTaskController,
  getAllTaskController,
  updateTaskByIdController,
  getTaskByIdController,
  deleteTaskByIdController
}