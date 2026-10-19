require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB, sequelize } = require("./src/config/db");

require("./src/models/User");
require("./src/models/Scan");

const routes = require("./src/routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  "http://localhost:5173,http://localhost:4173,https://securescan-web-security-scanner.netlify.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin is not allowed by SecureScan CORS policy")
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
);
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Welcome to SecureScan API",
  });
});

app.use(errorHandler);

let initializationPromise;

async function initializeDatabase() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await connectDB();
      await sequelize.sync();
      console.log("SecureScan database is ready");
    })().catch((error) => {
      initializationPromise = undefined;
      throw error;
    });
  }

  return initializationPromise;
}

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`SecureScan Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("SecureScan startup failed:", error.message);
    process.exitCode = 1;
  }
}

// Start a standalone server only when running this file directly.
// Netlify imports the app and initializes the database through the function.
if (require.main === module) {
  startServer();
}

app.initializeDatabase = initializeDatabase;

module.exports = app;