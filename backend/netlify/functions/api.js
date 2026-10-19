const serverless = require("serverless-http");
const app = require("../../server");

let initialized = false;
let initializationPromise = null;

const ensureInitialized = async () => {
  if (initialized) {
    return;
  }

  if (!initializationPromise) {
    initializationPromise = app.initializeDatabase();
  }

  await initializationPromise;
  initialized = true;
};

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  await ensureInitialized();

  return handler(event, context);
};
