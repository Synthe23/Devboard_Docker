import express from "express";
import {
  createTaskController,
  getAllTaskController,
  getTaskByIdController,
  updateTaskByIdController,
  deleteTaskByIdController
} from "../controllers/task.controller.js";
import authMiddleware from "../../auth-service/middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Create task route
router.post("/task/createTask", createTaskController);

// Get all the task route
router.get("/task/getAllTask", authMiddleware, getAllTaskController);

// Get the task by ID
router.get("/task/taskById/:id", authMiddleware, getTaskByIdController);

// Update the task by ID
router.patch("/task/updateById/:id", updateTaskByIdController);

// Delete task by ID
router.delete("/task/deleteById/:id", deleteTaskByIdController);

export default router;
