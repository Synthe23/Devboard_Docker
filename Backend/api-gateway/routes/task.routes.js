import express from "express";
import axios from "axios";

const taskRouter = express.Router();

// Forward the user’s authorization token
const getAuthHeaders = (req) => ({
  Authorization: req.headers.authorization || "",
});

// Create task
taskRouter.post("/createTask", async (req, res) => {
  try {
    const response = await axios.post(
      `
${process.env.TASK_SERVICE_URL}/api/task/createTask,
req.body`,
      {
        headers: getAuthHeaders(req),
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error("Task-Service error:", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});

// Get all tasks
taskRouter.get("/getAllTasks", async (req, res) => {
  try {
    const response = await axios.get(
      `
${process.env.TASK_SERVICE_URL}/api/task/getAllTask`,
      {
        headers: getAuthHeaders(req),
      }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error("Task-Service error:", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});

// Get task by ID
taskRouter.get("/getTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(
      `${process.env.TASK_SERVICE_URL}/api/task/taskById/${id}`,
      {
        headers: getAuthHeaders(req),
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error("Task-Service error:", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});

// Update task by ID
taskRouter.patch("/updateTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.patch(
      `${process.env.TASK_SERVICE_URL}/api/task/updateById/${id}`,
      req.body,
      {
        headers: getAuthHeaders(req),
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error("Task-Service error:", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});

// Delete task by ID
taskRouter.delete("/deleteTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.delete(
      `${process.env.TASK_SERVICE_URL}/api/task/deleteById/${id}`,
      {
        headers: getAuthHeaders(req),
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }

    console.error("Task-Service error:", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});

export default taskRouter;
