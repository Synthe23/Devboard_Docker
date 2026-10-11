import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.routes.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

// Health Check route
app.get("/auth/health", (req, res) => {
  res.status(200).json({
    service: "auth-service is running succesfully👨🏼‍💻",
    status: "UP ✅",
    port: PORT, 
  });
});

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
