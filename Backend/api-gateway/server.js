import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// Health check route to check the health of the application
app.get("/gateway/health", (req, res) => {
    return res.status(200).json({
        success: true,
        service: "API-Gateway",
        status: "Running✅",
        timestamp: new Date().toLocaleTimeString()
    });
});

app.listen(PORT, () => {
    console.log(`Gateway running on PORT: ${PORT}`);
})

export default app;