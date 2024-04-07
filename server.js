import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import connect from "./database/conn.js";
import router from "./router/route.js";
import job from "./cron/cron.js";

const app = express();
const port = process.env.PORT || 8080;

// Load environment variables
config();

// Connect to the database
connect()
  .then(() => {
    console.log("Database connected successfully");
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    // Terminate the process if database connection fails
    process.exit(1);
  });

job.start()

// Middleware
app.use(morgan("tiny")); // Logging middleware
app.use(cors({ origin: "https://react-friends-dy03.onrender.com" })); // CORS middleware
app.use(express.json()); // Body parser middleware

// Routes
app.get("/", (req, res) => {
  res.json("Get Request");
});

app.use("/api", router); // Use router for API routes

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});