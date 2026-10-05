import dotenv from "dotenv";
dotenv.config();

import connectdb from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 7000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
