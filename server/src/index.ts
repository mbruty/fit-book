import { config } from "dotenv";
import { connect } from "mongoose";
import router from "./routes/router";
import authMiddleware from "./auth/authMiddleware";
import * as cookieParser from "cookie-parser";
const express = require("express");
const morgan = require('morgan')
config();

interface Asdf {
  asd: string;
}

async function startServer() {
  await connect(process.env.mongo_conn_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  app.use(cookieParser()); // Cookiez
  app.use(express.json()); // Json Parser
  app.use(authMiddleware); // Our own auth middleware
  app.use(morgan('dev')) // Logging
  app.use("/api", router); // API router
  const port = process.env.PORT || 80;
  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(
    `🚀 Server blasting off at http://localhost:${port}/api`
  );
}

startServer();
