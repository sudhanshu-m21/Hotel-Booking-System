// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import clerkWebhooks from "./controllers/clerkWebhooks.js";
// connectDB();
// const app = express();
// app.use(cors());

// app.use(express.json());
// app.use(clerkMiddleware());

// app.use("/api/clerk", clerkWebhooks);

// app.get("/", (req, res) => res.send("API is Working"));
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());

app.post(
  "/api/clerk/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());

app.get("/", (req, res) => res.send("API is Working"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
