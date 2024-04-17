import { configDotenv } from "dotenv";
import express from "express";
import userRouter from "./src/routes/userRoutes.js";

const app = express();

app.use(express.json());
configDotenv();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
