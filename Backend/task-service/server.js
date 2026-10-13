import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/task.routes.js";
import connectDB from "./config/db.js";

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4002;

// Health check route 
app.get("/task/health", (req, res) => {
  return res.status(200).json({
    success: "true",
    message: "task-service is running succesfully✅",
    port: PORT,
  });
});

// Main routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Task service running on the PORT: ${PORT}`);
});
export default app;
