import express from "express";
import axios from "axios";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/register`,
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
