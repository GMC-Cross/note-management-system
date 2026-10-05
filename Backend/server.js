import express from "express";
import cors from "cors";
import profileRouter from "./src/routes/profileRouter.js";
import privateRouter from "./src/routes/privateRouter.js";
import noteRouter from "./src/routes/noteRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/profile", profileRouter);
app.use("/api/private", privateRouter);
app.use("/api/note", noteRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
