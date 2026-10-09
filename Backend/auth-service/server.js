import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = 3001;

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "auth-service 👨🏼‍💻",
    status: "UP ✅",
    port: 4001,
  });
});

app.listen(PORT, () => console.log("Server is running on the PORT 3000"));
