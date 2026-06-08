const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
const authMiddleware = require("./src/middleware/authMiddleware");
const taskRoutes = require("./src/routes/taskRoutes");

const roleMiddleware = require("./src/middleware/roleMiddleware");
const Task = require("./src/models/Task");
app.get(
  "/api/v1/admin/tasks",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    const tasks = await Task.find().populate(
      "user",
      "name email"
    );

    res.json(tasks);
  }
);
app.get(
  "/api/v1/protected",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  }
);
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/v1/tasks", taskRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

