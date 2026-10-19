
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const sslEnabled = process.env.DB_SSL === "true";
const caPath = process.env.DB_SSL_CA || "./ca.pem";

const dialectOptions = {};

if (sslEnabled) {
  let ca;

  if (process.env.DB_SSL_CA_CONTENT) {
    // Use the certificate stored privately in the hosting environment.
    ca = process.env.DB_SSL_CA_CONTENT.replace(/\\n/g, "\n");
  } else {
    // Local development fallback.
    const resolvedCaPath = path.resolve(__dirname, "../..", caPath);
    ca = fs.readFileSync(resolvedCaPath, "utf8");
  }

  dialectOptions.ssl = {
    ca,
    rejectUnauthorized: true,
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    dialectOptions,
    pool: {
      max: 2,
      min: 0,
      acquire: 20000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB };
