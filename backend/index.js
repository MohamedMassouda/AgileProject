import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import categoryRouter from "./src/routes/categoryRoutes.js";
import eventRouter from "./src/routes/eventRoutes.js";
import officeMemberRouter from "./src/routes/officeRoutes.js";
import sponsorRouter from "./src/routes/sponsorRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import newsRouter from "./src/routes/newsRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
configDotenv();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/events", eventRouter);
app.use("/office-members", officeMemberRouter);
app.use("/sponsors", sponsorRouter);
app.use("/news", newsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
