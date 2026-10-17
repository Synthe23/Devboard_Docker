import express from "express";
import axios from "axios";

const authRouter = express.Router();

// Register
authRouter.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/api/register`,
      req.body
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Auth-Service error: ", error.message);

    return res.status(502).json({
      success: false,
      message: "Auth-Service unavailable!",
    });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/auth/api/login`,
      req.body
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.message) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Auth-Service error: ", error.message);

    return res.status(502).json({
      success: false,
      message: "Auth-Service unavailable!",
    });
  }
});

// Current user
authRouter.get("/me", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/auth/api/me`,
      {
        headers: {
          Authorization: req.headers.authorization || "",
        },
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (error.message) {
      return res.status(error.response.status).json(error.response.data);
    }
    console.log("Auth-service error: ", error.message);
  }
  return res.status(502).json({
    success: false,
    message: "Auth-Service unavailable!",
  });
});

export default authRouter;
