import express from "express";
import axios from "axios";

const taskRouter = express.Router();

// Create task
taskRouter.post("/createTask", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.TASK_SERVICE_URL}/task/createTask`,
      req.body
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Task-Service error: ", error.message);
  }
  return res.status(502).json({
    success: false,
    message: "Task-Service unavailable!",
  });
});

// Get all the tasks
taskRouter.get("/getAllTasks", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.TASK_SERVICE_URL}/task/getAllTask`,
      {
        headers: {
          Authorization: req.headers.authorization || "",
        },
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Task-Service error: ", error.message);
  }
  return res.status(502).json({
    success: true,
    message: "Task-Service unavailable!",
  });
});

// Get the task by the ID
taskRouter.get("/getTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${process.env.TASK_SERVICE_URL}/task/getTaskById/:id`,
      {
        params: { id: id },
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.message);
    }
    console.log("Task-Service error: ", error.message);
  }
  return res.status(502).json({
    success: true,
    message: "Task-Service unavailable!",
  });
});

// Update the task by ID
taskRouter.patch("/updateTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.patch(
      `${process.env.TASK_SERVICE_URL}/task/updateById/:id`,
      {
        params: { id: id },
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Task-Service error: ", error.message);
  }
  return res.status(502).json({
    success: true,
    message: "Task-Service unavailable!",
  });
});

// Delete task by ID
taskRouter.delete("/deleteTaskById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(
      `${process.env.TASK_SERVICE_URL}/task/deleteById/:id`,
      id
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Task-Service error: ", error.message);
    return res.status(502).json({
      success: false,
      message: "Task-Service unavailable!",
    });
  }
});
